---
sidebar_position: 3
sidebar_label: 'Loại trùng MinHash'
---

# Loại bỏ trùng lặp MinHash

Loại bỏ trùng lặp (deduplication)[^dedup_note] là một trong những bước quan trọng nhất khi xây dựng các tập dữ liệu web quy mô lớn cho quá trình tiền huấn luyện (pretraining) mô hình ngôn ngữ lớn (LLM). Các phương pháp loại bỏ trùng lặp cố gắng xác định và loại bỏ dữ liệu dư thừa hoặc lặp lại khỏi tập dữ liệu.

### Tại sao cần loại bỏ trùng lặp?

Môi trường mạng chứa rất nhiều trang web tổng hợp nội dung (aggregators), trang nhân bản (mirrors), các trang có cùng mẫu định dạng (templated pages), hay các nội dung trùng lặp khác phân bố trên các tên miền và trang web khác nhau. Đôi khi, chính trình thu thập dữ liệu (crawler) cũng tạo ra các bản trùng lặp này khi các liên kết khác nhau trỏ về cùng một trang.

Việc loại bỏ các bản trùng lặp này liên quan trực tiếp đến sự cải thiện hiệu suất mô hình và giảm thiểu hiện tượng ghi nhớ (memorization) dữ liệu tiền huấn luyện, từ đó giúp mô hình tổng quát hóa (generalization) tốt hơn. Thêm vào đó, việc nâng cao hiệu suất nhờ loại trùng có thể được xem như tăng hiệu quả huấn luyện: bằng cách loại bỏ nội dung trùng lặp, mô hình có thể đạt cùng một mức hiệu suất nhưng cần ít lượt lặp huấn luyện hơn – hoặc tương đương, với cùng một số lượng token huấn luyện, mô hình sẽ được tiếp xúc với lượng dữ liệu đa dạng hơn.

Có nhiều cách khác nhau để xác định và định nghĩa thế nào là dữ liệu trùng lặp. Các phương pháp phổ biến thường dựa trên kỹ thuật băm (hashing) để tăng tốc độ xử lý, hoặc xây dựng các cấu trúc dữ liệu hiệu quả để lập chỉ mục dữ liệu (chẳng hạn như mảng hậu tố - suffix arrays). Các phương pháp cũng có thể là loại trùng mờ (fuzzy deduplication)[^fuzzy_note], sử dụng một số thước đo độ tương đồng để đánh dấu các tài liệu là trùng lặp, hoặc loại trùng khớp chính xác (exact deduplication)[^exact_note] bằng cách kiểm tra sự trùng khớp hoàn toàn giữa hai tài liệu (hoặc các dòng, đoạn văn, hay bất kỳ cấp độ phân mảnh nào khác)[^semantic_note].

### Các siêu tham số loại trùng của chúng tôi

Kế thừa từ RefinedWeb[^refinedweb], chúng tôi quyết định áp dụng MinHash, một kỹ thuật loại trùng mờ dựa trên hàm băm có khả năng mở rộng hiệu quả trên nhiều nút (node) CPU, cho phép tinh chỉnh các ngưỡng tương đồng (bằng cách kiểm soát số lượng và kích thước các bucket) cũng như độ dài của các phân đoạn con được xem xét (bằng cách kiểm soát kích thước n-gram). Chúng tôi đã chọn thu thập các cụm 5 từ (5-grams)[^ngrams_note] của mỗi tài liệu và tính toán các minhash bằng cách sử dụng tổng cộng 112 hàm băm, chia thành 14 bucket, mỗi bucket chứa 8 hàm băm — nhằm mục tiêu lọc ra các tài liệu có độ tương đồng ít nhất là 75%. Các tài liệu có cùng 8 giá trị minhash trong bất kỳ bucket nào sẽ được coi là bản trùng lặp của nhau.

Điều này nghĩa là đối với hai tài liệu có độ tương đồng ($s$) lần lượt là 0.7, 0.75, 0.8 và 0.85, xác suất chúng được xác định là trùng lặp sẽ tương ứng là 56%, 77%, 92% và 98.8% (tính theo công thức $1-(1-s^8)^{14}$). Xem biểu đồ dưới đây để so sánh xác suất khớp giữa cấu hình 112 hàm băm của chúng tôi và cấu hình của RefinedWeb với 9000 hàm băm chia thành 450 bucket, mỗi bucket chứa 20 hàm băm (đòi hỏi lượng tài nguyên tính toán lớn hơn đáng kể do mỗi hàm băm riêng lẻ phải được tính toán, lưu trữ và so sánh với hàm băm của các tài liệu khác):

![So sánh tham số MinHash](https://huggingfacefw-blogpost-fineweb-v1.static.hf.space/assets/images/minhash_params.png)

Mặc dù số lượng lớn các hàm băm trong RefinedWeb tạo ra một đường ranh giới cắt (cut-off) dốc và rõ ràng hơn (giúp nhận diện chính xác hơn các tài liệu có độ tương đồng thực tế gần ngưỡng), chúng tôi tin rằng việc tiết kiệm tài nguyên tính toán và lưu trữ là một sự đánh đổi hợp lý.

Cũng cần lưu ý rằng việc loại trùng lặp trong cùng tài liệu (intra-document deduplication)[^intra_note] đã được xử lý sẵn bởi bộ lọc lặp (repetition filter) của chúng tôi, bộ lọc này sẽ loại bỏ các tài liệu có quá nhiều dòng hoặc đoạn văn lặp đi lặp lại.

[^dedup_note]: Loại bỏ trùng lặp / loại trùng (deduplication).
[^fuzzy_note]: Loại trùng mờ (fuzzy deduplication).
[^exact_note]: Loại trùng khớp chính xác (exact deduplication).
[^semantic_note]: Lưu ý rằng ở đây, ngay cả khi thảo luận về loại trùng mờ, chúng tôi chỉ sử dụng các phương pháp hoạt động trên việc so khớp ký tự/từ ngữ, tức là văn bản bề mặt. Một khái niệm phức tạp hơn là loại trùng ngữ nghĩa (semantic deduplication): so sánh/loại bỏ các văn bản liên quan đến cùng một khái niệm nhưng sử dụng từ đồng nghĩa hoặc cách diễn đạt khác. Chúng tôi không thảo luận về chủ đề đó ở đây, nhưng lưu ý rằng chúng có thể rất quan trọng trong lĩnh vực tạo dữ liệu tổng hợp quy mô lớn (ví dụ như bài viết công bố [Cosmopedia](https://huggingface.co/blog/cosmopedia) về chủ đề này).
[^refinedweb]: Penedo et al. (2023). RefinedWeb.
[^ngrams_note]: Đơn vị của chúng tôi là "từ", được tính toán trong hàm xử lý MinHash bằng một bộ phân tách từ (word tokenizer) đặc thù cho từng ngôn ngữ.
[^intra_note]: Loại trùng lặp trong cùng tài liệu (intra-document deduplication).
