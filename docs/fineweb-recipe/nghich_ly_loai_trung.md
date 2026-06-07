---
sidebar_position: 4
sidebar_label: 'Nghịch lý Loại trùng'
---

# Nghịch lý Loại trùng

### Càng loại trùng nhiều càng tốt, đúng không?

Ban đầu, chúng tôi hoạt động dưới giả định rằng *càng loại bỏ trùng lặp nhiều thì càng tốt*, nên hướng tiếp cận đầu tiên là gộp toàn bộ tập dữ liệu (hơn 90 đợt crawl) lại và tiến hành loại trùng chéo chung như một tập dữ liệu lớn duy nhất bằng MinHash.

Chúng tôi thực hiện việc này theo phương pháp lặp (iterative): bắt đầu từ đợt crawl gần nhất (lúc đó là `2023-50`) và thực hiện ngược thời gian cho đến đợt crawl cũ nhất. Chúng tôi loại trùng cho từng đợt crawl không chỉ trong nội bộ chính nó, mà còn loại bỏ bất kỳ tài liệu nào khớp với các tài liệu trong các đợt crawl đã được xử lý trước đó (tức là loại trùng chéo giữa các đợt crawl - cross-dump deduplication)[^cross_dump_note].

Ví dụ, đối với đợt crawl gần đây thứ hai (lúc đó là `2023-40`), chúng tôi đã loại trùng nó với đợt crawl gần nhất bên cạnh việc loại trùng nội bộ. Kết quả là, đợt crawl càng cũ thì số lượng các đợt crawl đối chiếu để loại trùng càng nhiều, và lượng dữ liệu bị loại bỏ khỏi nó càng lớn (thực tế, ở các đợt crawl cũ nhất, bước loại trùng đã xóa bỏ hơn 90% lượng dữ liệu sau khi lọc cơ bản).

Việc loại trùng tập dữ liệu theo cách này tạo ra một tập dữ liệu gồm 4 nghìn tỷ token. Tuy nhiên, một điều khá bất ngờ là khi huấn luyện trên một tập con mẫu ngẫu nhiên gồm 350 tỷ token, các mô hình thử nghiệm loại trừ (ablation models) của chúng tôi hầu như không cho thấy sự cải thiện nào so với mô hình huấn luyện trên dữ liệu chưa loại trùng, và đạt điểm số thấp hơn nhiều so với tập dữ liệu tiền nhiệm RefinedWeb trên tổ hợp các bài toán đánh giá của chúng tôi:

![Hiệu suất tệ của việc loại trùng tất cả đợt crawl](https://huggingfacefw-blogpost-fineweb-v1.static.hf.space/assets/images/dedup_all_dumps_bad.png)

Kết quả này đã thách thức giả định của chúng tôi rằng việc loại trùng nhiều hơn chắc chắn sẽ mang lại điểm số đánh giá cao hơn. Vì vậy, chúng tôi quyết định xem xét kỹ hơn một trong những đợt crawl cũ nhất, cụ thể là đợt `2013-48`:

* Trước khi loại trùng, đợt crawl này có khoảng 490 tỷ token.
* Sau quá trình MinHash lặp của chúng tôi, chỉ còn lại khoảng 31 tỷ token (94% dữ liệu đã bị loại bỏ).

Để làm thí nghiệm, chúng tôi đã thử huấn luyện hai mô hình trên 28 tỷ token được lấy mẫu từ các phần dữ liệu sau của đợt crawl `2013-48`:

* Phần dữ liệu được giữ lại sau khi loại trùng hoàn toàn, khoảng 31 tỷ token (*dữ liệu giữ lại ban đầu - originally kept data*).
* 171 tỷ token thu được bằng cách loại trùng riêng lẻ (không xét đến các đợt crawl khác) từ khoảng 460 tỷ token đã bị loại bỏ khỏi đợt crawl này trong quá trình loại trùng chéo lặp đi lặp lại (*dữ liệu bị loại bỏ ban đầu - originally removed data*)[^overlap_note].

![Hiệu suất của dữ liệu bị loại bỏ](https://huggingfacefw-blogpost-fineweb-v1.static.hf.space/assets/images/removed_data_cross_dedup.png)

Các kết quả này cho thấy đối với đợt crawl cũ này khi xét riêng lẻ, phần dữ liệu được giữ lại (chiếm 10% dữ liệu gốc) thực chất lại *tệ hơn* so với 90% dữ liệu mà chúng tôi đã loại bỏ[^independent_note]. Điều này cũng được xác nhận qua kiểm tra trực quan: *dữ liệu giữ lại ban đầu* chứa nhiều quảng cáo, danh sách từ khóa và văn bản định dạng lỗi hơn nhiều so với *dữ liệu bị loại bỏ ban đầu*.

### Lùi lại một bước: Loại trùng riêng lẻ cho từng đợt crawl

Chúng tôi quyết định thử nghiệm một hướng tiếp cận khác: loại trùng bằng MinHash cho từng đợt crawl một cách riêng lẻ (độc lập với các đợt crawl khác). Hướng đi này giúp thu được một tập dữ liệu quy mô 20 nghìn tỷ token.

Khi huấn luyện trên một mẫu ngẫu nhiên từ tập dữ liệu này, chúng tôi thấy rằng hiệu suất của nó hiện tại đã ngang bằng với RefinedWeb:

![Hiệu suất của loại trùng độc lập tốt hơn](https://huggingfacefw-blogpost-fineweb-v1.static.hf.space/assets/images/cross_ind_unfiltered_comparison.png)

Chúng tôi đưa ra giả thuyết rằng sự cải thiện chính thu được từ loại trùng là do loại bỏ các cụm trùng lặp rất lớn xuất hiện trong mọi đợt crawl (bạn có thể tìm thấy một số ví dụ về các cụm này trong bài viết về RefinedWeb, mỗi cụm chứa *hàng trăm nghìn* tài liệu) và việc loại trùng sâu hơn đối với các cụm có tần suất trùng lặp thấp (dưới khoảng 100 lần, tương ứng với số lượng đợt crawl) trên thực tế lại gây hại cho hiệu suất: dữ liệu không tìm thấy bản trùng lặp nào ở các đợt crawl khác thực chất có thể có chất lượng kém hơn hoặc lệch xa khỏi phân phối chuẩn (out-of-distribution) (như đã được minh chứng bởi kết quả trên dữ liệu đợt `2013-48`).

Mặc dù bạn có thể thấy một số cải thiện hiệu suất khi loại trùng một vài đợt crawl cùng nhau, nhưng ở quy mô của toàn bộ tập dữ liệu (tất cả các đợt crawl), tác dụng phụ từ việc vô tình tăng tần suất của dữ liệu chất lượng kém (upsampling of lower quality data) có vẻ có sức ảnh hưởng lớn hơn.

Một khả năng cần xem xét là khi chất lượng của bộ lọc được cải thiện, hiệu ứng phụ này có thể không còn phổ biến nữa, vì các bộ lọc có thể loại bỏ bớt phần dữ liệu chất lượng thấp này. Chúng tôi cũng đã thử nghiệm áp dụng các phương pháp loại trùng khác nhau, thường là "nhẹ" hơn, trên các đợt crawl đã được loại trùng riêng lẻ. Bạn có thể đọc thêm về các thử nghiệm đó ở phần dưới.

### Ghi chú về việc đo lường tác động của loại bỏ trùng lặp

Do đặc thù của việc loại trùng, tác động của nó không phải lúc nào cũng rõ rệt trong một lát cắt dữ liệu nhỏ (chẳng hạn như mức 28 tỷ token mà chúng tôi sử dụng cho các thử nghiệm loại trừ của bộ lọc). Hơn nữa, chúng ta cần cân nhắc việc tồn tại những tác động đặc thù khi tiến hành loại trùng trên toàn bộ các đợt crawl của CommonCrawl, vì một số URL hoặc trang web được thu thập lại từ đợt crawl này sang đợt crawl khác.

Để hình dung tác động của việc tăng quy mô số lượng token huấn luyện lên việc đo lường hiệu quả loại trùng, chúng tôi đã xem xét một kịch bản lý thuyết sau (rất cực đoan và không thực tế so với mức độ trùng lặp thực tế ghi nhận được):

* Có 100 đợt crawl CommonCrawl (gần đúng với thực tế).
* Mỗi đợt crawl đã được loại trùng nội bộ một cách hoàn hảo (mỗi tài liệu là duy nhất trong đợt crawl đó).
* Các đợt crawl là bản sao hoàn hảo của nhau (mức độ trùng lặp chéo tối đa giữa các đợt crawl, thực chất là kịch bản tồi tệ nhất).
* Mỗi đợt crawl có 200 tỷ token (tổng cộng là 20 nghìn tỷ, tương đương kích thước thu được từ việc loại trùng riêng lẻ ở trên).
* Mỗi đợt crawl được cấu thành từ các tài liệu có độ dài 1,000 token (200 triệu tài liệu mỗi đợt crawl).

Sau đó, chúng tôi mô phỏng việc lấy mẫu đồng đều các tài liệu từ toàn bộ tập dữ liệu 20 nghìn tỷ token này để thu được các tập con có kích thước 1B, 10B, 100B, 350B và 1T token. Trong biểu đồ dưới đây, bạn có thể thấy tần suất mỗi tài liệu bị lặp lại:

![Mô phỏng trùng lặp](https://huggingfacefw-blogpost-fineweb-v1.static.hf.space/assets/images/duplicates_simul.png)

Với tập con 1B token, hầu như tất cả các tài liệu đều là duy nhất (`#duplicates=1`), bất chấp thực tế là trên toàn bộ tập dữ liệu, mỗi tài liệu được lặp lại 100 lần (một lần cho mỗi đợt crawl). Chúng tôi bắt đầu thấy một số thay đổi ở quy mô 100B token (chiếm 0.5% tổng tập dữ liệu), với lượng lớn tài liệu bị lặp lại 2 lần, và một số ít lặp từ 4-8 lần. Ở quy mô lớn hơn là 1T token (chiếm 5% tổng tập dữ liệu), phần lớn tài liệu lặp lại đến 8 lần, và một số lặp lại đến 16 lần.

Chúng tôi đã thực hiện các đánh giá hiệu suất cho dữ liệu đã loại trùng ở quy mô 350B token. Theo kịch bản lý thuyết này, tập dữ liệu đó sẽ được tạo thành từ một phần đáng kể các tài liệu bị lặp lại tới 8 lần. Mô phỏng này minh họa cho những khó khăn nội tại trong việc đo lường tác động của loại trùng lên quá trình huấn luyện LLM sau khi các cụm trùng lặp lớn nhất đã được loại bỏ.

[^cross_dump_note]: Loại trùng lặp chéo giữa các đợt crawl (cross-dump deduplication).
[^overlap_note]: Mặc dù có thể có các tài liệu trong *dữ liệu giữ lại ban đầu* tương tự như các tài liệu trong *dữ liệu bị loại bỏ ban đầu*, chúng tôi ước lượng phần giao nhau này là rất nhỏ (khoảng 4 tỷ token).
[^independent_note]: Lưu ý rằng các mô hình thử nghiệm loại trừ này chỉ được huấn luyện trên dữ liệu từ riêng đợt crawl này, nên nó được xem xét độc lập với tất cả các đợt crawl khác.
