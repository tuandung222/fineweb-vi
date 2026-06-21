---
sidebar_position: 5
sidebar_label: 'Thử nghiệm thất bại'
---

# Các hướng tiếp cận toàn cục khác (Thử nghiệm thất bại)

Phát triển từ phương pháp mới tìm ra (deduplication riêng biệt cho từng đợt crawl), chúng tôi cố gắng cải thiện hiệu suất bằng cách tiếp tục deduplication tập dữ liệu 20 nghìn tỷ token (đã được independent MinHash) với các phương pháp global deduplication (trên toàn bộ các đợt crawl). Các hướng đã thử:

* **Deduplication theo URL:** Chỉ giữ một tài liệu cho mỗi URL đã chuẩn hóa (chuyển chữ thường) — loại bỏ 71,5% token, còn lại 5,6T — *FineWeb URL dedup*.
* **Deduplication theo dòng:**
  * Loại bỏ tất cả trừ 1 lần xuất hiện (chọn ngẫu nhiên) của mỗi dòng trùng lặp — loại bỏ 77,8% token, còn lại 4,4T — *FineWeb line dedup*.
  * Tương tự nhưng chỉ loại bỏ dòng trùng lặp có ít nhất 10 từ, và loại bỏ tài liệu còn lại ít hơn 3 câu sau khi deduplication — loại bỏ 85% token, còn lại 2,9T — *FineWeb line dedup w/ min words*.
  * Loại bỏ tất cả trừ 1 lần xuất hiện của mỗi nhóm 3 dòng liên tiếp trùng lặp, trong đó mọi chữ số được coi là ký tự `0` khi so khớp — loại bỏ 80,9% token, còn lại 3,7T — *FineWeb 3-line dedup*.

Hiệu suất của các mô hình huấn luyện trên mỗi phiên bản này đều tệ hơn một cách nhất quán (dù mức độ khác nhau) so với dữ liệu được deduplication riêng lᮣ cho từng đợt crawl ban đầu:

![So sánh các nỗ lực deduplication toàn cục](https://huggingfacefw-blogpost-fineweb-v1.static.hf.space/assets/images/dedup_attempts.png)
