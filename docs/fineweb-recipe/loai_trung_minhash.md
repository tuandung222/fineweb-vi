---
sidebar_position: 3
sidebar_label: 'Loại trùng MinHash'
---

# Loại bỏ trùng lặp MinHash

Deduplication[^dedup_note] là một trong những bước quan trọng nhất khi xây dựng tập dữ liệu web quy mô lớn cho pretraining LLM. Mục tiêu là xác định và loại bỏ các nội dung dư thừa hoặc lặp lại ra khỏi tập dữ liệu.

### Tại sao cần deduplication?

Web chứa rất nhiều trang tổng hợp nội dung, mirror, trang có cùng template, hay các bản sao rải rác trên nhiều domain. Đôi khi chính crawler cũng tạo ra trùng lặp khi các link khác nhau cùng trỏ về một trang.

Loại bỏ các bản trùng lặp có tác động trực tiếp đến hiệu suất mô hình: nó giảm hiện tượng ghi nhớ (memorization) dữ liệu pretraining, từ đó giúp mô hình tổng quát hóa tốt hơn. Ngoài ra, deduplication còn có thể hiểu là tăng hiệu quả huấn luyện: với cùng số token, mô hình được tiếp xúc với nhiều dữ liệu đa dạng hơn.

Có nhiều cách xác định dữ liệu trùng lặp. Các phương pháp phổ biến thường dùng kỹ thuật hashing để tăng tốc độ, hoặc xây dựng cấu trúc dữ liệu hiệu quả như suffix array để lập chỉ mục. Về hướng tiếp cận, có fuzzy deduplication[^fuzzy_note] — dùng độ tương đồng để đánh dấu các tài liệu là trùng lặp — và exact deduplication[^exact_note] — kiểm tra sự khớp hoàn toàn giữa các tài liệu (hoặc dòng, đoạn, v.v.)[^semantic_note].

### Các tham số deduplication của chúng tôi

Kế thừa từ RefinedWeb[^refinedweb], chúng tôi áp dụng MinHash — kỹ thuật fuzzy deduplication dựa trên hashing, có thể mở rộng hiệu quả trên nhiều node CPU. MinHash cho phép tinh chỉnh ngưỡng tương đồng (thông qua số lượng và kích thước các bucket) cũng như độ dài các đoạn con được xem xét (thông qua kích thước n-gram). Chúng tôi thu thập các cụm 5-gram[^ngrams_note] của mỗi tài liệu và tính minhash bằng 112 hàm băm, chia thành 14 bucket, mỗi bucket chứa 8 hàm băm — nhắm lọc các tài liệu có độ tương đồng ít nhất 75%. Hai tài liệu có cùng 8 giá trị minhash trong bất kỳ bucket nào sẽ bị coi là bản trùng lặp của nhau.

Cụ thể, với hai tài liệu có độ tương đồng ($s$) lần lượt là 0.7, 0.75, 0.8 và 0.85, xác suất chúng được xác định là trùng lặp lần lượt là 56%, 77%, 92% và 98.8% (theo công thức $1-(1-s^8)^{14}$). Biểu đồ bên dưới so sánh xác suất khớp giữa cấu hình 112 hàm băm của chúng tôi và cấu hình 9000 hàm băm của RefinedWeb (chia thành 450 bucket, mỗi bucket 20 hàm băm — đòi hỏi nhiều tài nguyên tính toán hơn đáng kể):

![So sánh tham số MinHash](https://huggingfacefw-blogpost-fineweb-v1.static.hf.space/assets/images/minhash_params.png)

Mặc dù số hàm băm lớn trong RefinedWeb tạo ra đường ranh giới cắt dốc và rõ nét hơn (giúp nhận diện chính xác hơn các tài liệu gần ngưỡng), chúng tôi cho rằng việc tiết kiệm tài nguyên tính toán và lưu trữ là đánh đổi hợp lý.

Cũng cần lưu ý rằng deduplication nội bộ tài liệu (intra-document)[^intra_note] đã được xử lý bởi repetition filter — bộ lọc loại bỏ các tài liệu có quá nhiều dòng hoặc đoạn văn lặp lại.

[^dedup_note]: Loại bỏ trùng lặp (deduplication).
[^fuzzy_note]: Fuzzy deduplication.
[^exact_note]: Exact deduplication.
[^semantic_note]: Lưu ý rằng ngay cả khi thảo luận về fuzzy deduplication, chúng tôi chỉ dùng các phương pháp so khớp ký tự/từ ngữ, tức là văn bản bề mặt. Một khái niệm phức tạp hơn là semantic deduplication: so sánh/loại bỏ các văn bản đề cập cùng một khái niệm nhưng dùng từ đồng nghĩa hoặc cách diễn đạt khác. Chúng tôi không thảo luận về chủ đề này ở đây, nhưng lưu ý rằng nó có thể rất quan trọng trong lĩnh vực tạo dữ liệu tổng hợp quy mô lớn (xem bài viết [Cosmopedia](https://huggingface.co/blog/cosmopedia)).
[^refinedweb]: Penedo et al. (2023). RefinedWeb.
[^ngrams_note]: Đơn vị "từ" được tính trong hàm xử lý MinHash bằng một word tokenizer đặc thù cho từng ngôn ngữ.
[^intra_note]: Intra-document deduplication.
