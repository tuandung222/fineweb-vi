---
sidebar_position: 4
sidebar_label: 'Nghịch lý Loại trùng'
---

# Nghịch lý Loại trùng

### Càng loại trùng nhiều càng tốt, đúng không?

Ban đầu, chúng tôi hoạt động theo giả định *càng deduplication nhiều thì càng tốt*. Hướng tiếp cận đầu tiên là gộp toàn bộ tập dữ liệu (hơn 90 đợt crawl) lại và deduplication chéo chung như một tập dữ liệu lớn duy nhất bằng MinHash.

Chúng tôi thực hiện theo phương pháp lặp: bắt đầu từ đợt crawl gần nhất (lúc đó là `2023-50`) và lùi dần về đợt cũ nhất. Mỗi đợt crawl được deduplication không chỉ trong nội bộ, mà còn loại bỏ bất kỳ tài liệu nào khớp với các đợt crawl đã xử lý trước (cross-dump deduplication)[^cross_dump_note].

Ví dụ, đợt crawl gần thứ hai (`2023-40`) được deduplication với cả đợt gần nhất lẫn nội bộ. Hệ quả là đợt càng cũ thì số đợt đối chiếu càng nhiều, và lượng dữ liệu bị loại càng lớn (thực tế, với các đợt crawl cũ nhất, bước deduplication đã xóa hơn 90% dữ liệu sau base filtering).

Phương pháp này tạo ra tập dữ liệu 4 nghìn tỷ token. Tuy nhiên, kết quả khá bất ngờ: khi huấn luyện trên subset ngẫu nhiên 350 tỷ token, các ablation model hầu như không cho thấy cải thiện nào so với mô hình huấn luyện trên dữ liệu chưa deduplication, và đạt điểm số thấp hơn nhiều so với RefinedWeb:

![Hiệu suất tệ của việc deduplication tất cả đợt crawl](https://huggingfacefw-blogpost-fineweb-v1.static.hf.space/assets/images/dedup_all_dumps_bad.png)

Kết quả này thách thức giả định rằng deduplication nhiều hơn thì điểm đánh giá sẽ cao hơn. Chúng tôi quyết định xem xét kỹ hơn một trong những đợt crawl cũ nhất, cụ thể là `2013-48`:

* Trước khi deduplication, đợt crawl này có khoảng 490 tỷ token.
* Sau iterative MinHash, chỉ còn khoảng 31 tỷ token (94% dữ liệu đã bị loại bỏ).

Để kiểm tra, chúng tôi huấn luyện hai mô hình trên 28 tỷ token được lấy mẫu từ hai phần của đợt crawl `2013-48`:

* Phần dữ liệu được giữ lại sau deduplication hoàn toàn, khoảng 31 tỷ token (*originally kept data*).
* 171 tỷ token thu được bằng cách deduplication riêng lẻ (không xét đến các đợt crawl khác) từ khoảng 460 tỷ token đã bị loại bỏ trong quá trình cross deduplication (*originally removed data*)[^overlap_note].

![Hiệu suất của dữ liệu bị loại bỏ](https://huggingfacefw-blogpost-fineweb-v1.static.hf.space/assets/images/removed_data_cross_dedup.png)

Kết quả cho thấy đối với đợt crawl cũ này, phần dữ liệu được giữ lại (10% dữ liệu gốc) thực chất *tệ hơn* so với 90% dữ liệu bị loại bỏ[^independent_note]. Điều này được xác nhận qua kiểm tra trực quan: *originally kept data* chứa nhiều quảng cáo, danh sách từ khóa và văn bản định dạng lỗi hơn nhiều so với *originally removed data*.

### Lùi lại một bước: Deduplication riêng lẻ cho từng đợt crawl

Chúng tôi quyết định thử một hướng khác: deduplication MinHash cho từng đợt crawl một cách độc lập. Cách này giúp thu được tập dữ liệu 20 nghìn tỷ token.

Khi huấn luyện trên sample ngẫu nhiên từ tập này, hiệu suất đã ngang bằng với RefinedWeb:

![Hiệu suất của deduplication độc lập tốt hơn](https://huggingfacefw-blogpost-fineweb-v1.static.hf.space/assets/images/cross_ind_unfiltered_comparison.png)

Chúng tôi đưa ra giả thuyết rằng lợi ích chính của deduplication đến từ việc loại bỏ các cụm trùng lặp rất lớn xuất hiện trong mọi đợt crawl (có thể tìm thấy một số ví dụ trong bài viết về RefinedWeb, mỗi cụm chứa *hàng trăm nghìn* tài liệu). Việc deduplication sâu hơn đối với các cụm có tần suất trùng lặp thấp (dưới khoảng 100 lần, tương ứng số đợt crawl) thực tế lại gây hại: dữ liệu không tìm thấy bản trùng lặp ở các đợt khác có thể có chất lượng kém hơn hoặc lệch khỏi phân phối chuẩn (như đã thấy với đợt `2013-48`).

Mặc dù có thể thấy cải thiện khi deduplication một vài đợt crawl cùng nhau, nhưng ở quy mô toàn bộ tập dữ liệu, tác dụng phụ từ việc vô tình tăng tần suất của dữ liệu chất lượng thấp có vẻ chiếm ưu thế.

Một điều cần xem xét là khi bộ lọc được cải thiện, hiệu ứng phụ này có thể không còn phổ biến nữa. Chúng tôi cũng đã thử nghiệm các phương pháp deduplication khác, thường “nhẹ” hơn, trên các đợt crawl đã được deduplication riêng lẻ — chi tiết ở phần dưới.

### Ghi chú về đo lường tác động của deduplication

Do đặc thù của deduplication, tác động của nó không phải lúc nào cũng rõ rệt trong một lát cắt dữ liệu nhỏ (như 28 tỷ token dùng cho ablation bộ lọc). Ngoài ra, cần cân nhắc các tác động đặc thù khi deduplication trên toàn bộ CommonCrawl, vì một số URL hoặc trang web được crawl lại từ đợt này sang đợt khác.

Để hình dung tác động của việc tăng quy mô số token huấn luyện lên việc đo lường hiệu quả deduplication, chúng tôi xem xét kịch bản lý thuyết sau (đây là kịch bản cực đoan và không thực tế so với mức độ trùng lặp thực tế):

* Có 100 đợt crawl CommonCrawl (gần đúng với thực tế).
* Mỗi đợt đã được deduplication nội bộ hoàn hảo (mỗi tài liệu là duy nhất trong đợt đó).
* Các đợt crawl là bản sao hoàn hảo của nhau (mức độ cross-crawl trùng lặp tối đa — kịch bản tồi tệ nhất).
* Mỗi đợt có 200 tỷ token (tổng cộng 20 nghìn tỷ, tương đương kích thước thu được từ independent deduplication).
* Mỗi đợt gồm các tài liệu có độ dài 1.000 token (200 triệu tài liệu mỗi đợt).

Sau đó chúng tôi mô phỏng lấy mẫu đồng đều từ toàn bộ 20 nghìn tỷ token để thu các subset 1B, 10B, 100B, 350B và 1T token. Biểu đồ bên dưới cho thấy tần suất mỗi tài liệu bị lặp lại:

![Mô phỏng trùng lặp](https://huggingfacefw-blogpost-fineweb-v1.static.hf.space/assets/images/duplicates_simul.png)

Với tập con 1B token, hầu như tất cả các tài liệu đều là duy nhất (`#duplicates=1`), bất chấp thực tế là trên toàn bộ tập dữ liệu, mỗi tài liệu được lặp lại 100 lần (một lần cho mỗi đợt crawl). Chúng tôi bắt đầu thấy một số thay đổi ở quy mô 100B token (chiếm 0.5% tổng tập dữ liệu), với lượng lớn tài liệu bị lặp lại 2 lần, và một số ít lặp từ 4-8 lần. Ở quy mô lớn hơn là 1T token (chiếm 5% tổng tập dữ liệu), phần lớn tài liệu lặp lại đến 8 lần, và một số lặp lại đến 16 lần.

Chúng tôi đã thực hiện các đánh giá hiệu suất cho dữ liệu đã loại trùng ở quy mô 350B token. Theo kịch bản lý thuyết này, tập dữ liệu đó sẽ được tạo thành từ một phần đáng kể các tài liệu bị lặp lại tới 8 lần. Mô phỏng này minh họa cho những khó khăn nội tại trong việc đo lường tác động của loại trùng lên quá trình huấn luyện LLM sau khi các cụm trùng lặp lớn nhất đã được loại bỏ.

[^cross_dump_note]: Loại trùng lặp chéo giữa các đợt crawl (cross-dump deduplication).
[^overlap_note]: Mặc dù có thể có các tài liệu trong *dữ liệu giữ lại ban đầu* tương tự như các tài liệu trong *dữ liệu bị loại bỏ ban đầu*, chúng tôi ước lượng phần giao nhau này là rất nhỏ (khoảng 4 tỷ token).
[^independent_note]: Lưu ý rằng các mô hình thử nghiệm loại trừ này chỉ được huấn luyện trên dữ liệu từ riêng đợt crawl này, nên nó được xem xét độc lập với tất cả các đợt crawl khác.
