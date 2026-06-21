---
sidebar_position: 2
sidebar_label: 'Bộ lọc Cơ bản'
---

# Bộ lọc Cơ bản

Filtering là một phần quan trọng trong quy trình data curation[^curation_note]. Quá trình này bao gồm việc loại bỏ một phần dữ liệu — có thể là từ, dòng, hoặc toàn bộ tài liệu — mà nếu giữ lại sẽ làm giảm hiệu suất mô hình, tức là dữ liệu "chất lượng thấp" theo cách nhìn của quy trình đánh giá hiệu suất của chúng tôi.

Làm nền tảng, chúng tôi tham khảo một phần thiết lập từ RefinedWeb[^refinedweb]:

* **Lọc URL:** Dùng blocklist[^blocklist] để loại bỏ nội dung người lớn.
* **Phân loại ngôn ngữ:** Dùng fastText[^fasttext] để chỉ giữ văn bản tiếng Anh có score ≥ 0.65.
* **Lọc chất lượng và lặp:** Áp dụng các bộ lọc từ MassiveText[^massivetext] với ngưỡng mặc định.

Sau khi áp dụng base filtering cho từng đợt crawl đã trích xuất văn bản (hiện có 96 đợt), chúng tôi thu được khoảng 36 nghìn tỷ token[^tokens_note].

[^curation_note]: Thu thập và lọc dữ liệu (data curation).
[^refinedweb]: Penedo et al. (2023). RefinedWeb.
[^blocklist]: Sử dụng blocklist từ [DSI Université Toulouse 1 Capitole](https://dsi.ut-capitole.fr/blacklists/).
[^fasttext]: Joulin et al. (2016). fastText language classifier.
[^massivetext]: Rae et al. (2022). MassiveText.
[^tokens_note]: Như tất cả các phần khác trong báo cáo này: đây là số token khi tokenize bằng `gpt2`.
