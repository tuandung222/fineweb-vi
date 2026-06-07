---
sidebar_position: 2
sidebar_label: 'Bộ lọc Cơ bản'
---

# Bộ lọc Cơ bản

Lọc dữ liệu là một phần quan trọng trong quy trình thu thập và lọc dữ liệu (data curation)[^curation_note]. Quá trình này bao gồm việc loại bỏ một phần dữ liệu (có thể là các từ, dòng, hoặc thậm chí toàn bộ tài liệu) làm giảm hiệu suất của mô hình, do đó bị coi là có "chất lượng thấp hơn" trong quy trình xây dựng tập dữ liệu dựa trên đánh giá hiệu suất (evaluation-driven) của chúng tôi.

Để làm cơ sở cho bộ lọc của mình, chúng tôi đã sử dụng một phần thiết lập từ RefinedWeb[^refinedweb]. Cụ thể, chúng tôi đã:

* **Lọc URL:** Áp dụng lọc URL sử dụng một danh sách chặn (blocklist)[^blocklist] để loại bỏ nội dung người lớn.
* **Phân loại ngôn ngữ:** Sử dụng mô hình phân loại ngôn ngữ fastText[^fasttext] để chỉ giữ lại văn bản tiếng Anh có điểm số (score) &ge; 0.65.
* **Lọc chất lượng và lặp:** Áp dụng các bộ lọc chất lượng và bộ lọc lặp (repetition filter) từ MassiveText[^massivetext] (sử dụng các ngưỡng mặc định).

Sau khi áp dụng bộ lọc cơ bản (base filtering) này cho từng đợt crawl đã được trích xuất văn bản (hiện tại có 96 đợt), chúng tôi thu được khoảng 36 nghìn tỷ token dữ liệu[^tokens_note].

[^curation_note]: Thu thập và lọc dữ liệu (data curation).
[^refinedweb]: Penedo et al. (2023). RefinedWeb.
[^blocklist]: Sử dụng danh sách chặn từ [DSI Université Toulouse 1 Capitole](https://dsi.ut-capitole.fr/blacklists/).
[^fasttext]: Joulin et al. (2016). fastText language classifier.
[^massivetext]: Rae et al. (2022). MassiveText.
[^tokens_note]: Như tất cả các phần khác trong báo cáo này: đây là số lượng token khi phân tách bằng bộ mã hóa (tokenizer) `gpt2`.
