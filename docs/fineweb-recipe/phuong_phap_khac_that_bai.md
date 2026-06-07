---
sidebar_position: 5
sidebar_label: 'Thử nghiệm thất bại'
---

# Các hướng tiếp cận toàn cục khác (Thử nghiệm thất bại)

Để phát triển dựa trên phương pháp mới tìm ra (loại trùng riêng biệt cho từng đợt crawl), chúng tôi đã cố gắng cải thiện hiệu suất bằng cách tiếp tục loại trùng tập dữ liệu 20 nghìn tỷ token (vốn đã được loại trùng độc lập bằng MinHash) bằng các phương pháp loại trùng toàn cục khác (áp dụng trên toàn bộ các đợt crawl). Chúng tôi đã khám phá các hướng tiếp cận sau:

* **Loại trùng theo URL:** Chúng tôi chỉ giữ lại một tài liệu cho mỗi URL đã chuẩn hóa (chuyển thành chữ thường) (loại bỏ 71.5% lượng token, còn lại 5.6T) — *FineWeb URL dedup*.
* **Loại trùng theo dòng (line-level deduplication):**
  * Loại bỏ tất cả trừ 1 lần xuất hiện (được chọn ngẫu nhiên) của mỗi dòng bị trùng lặp (loại bỏ 77.8% lượng token, còn lại 4.4T) — *FineWeb line dedup*.
  * Tương tự như trên, nhưng chỉ loại bỏ các dòng trùng lặp có chứa ít nhất 10 từ và loại bỏ các tài liệu có ít hơn 3 câu sau khi thực hiện loại trùng (loại bỏ 85% lượng token, còn lại 2.9T) — *FineWeb line dedup w/ min words*.
  * Loại bỏ tất cả trừ 1 lần xuất hiện của mỗi nhóm 3 dòng trùng lặp liên tiếp, trong đó mọi chữ số được coi là ký tự `0` khi thực hiện so khớp trùng lặp (loại bỏ 80.9% lượng token, còn lại 3.7T) — *FineWeb 3-line dedup*.

Hiệu suất của các mô hình được huấn luyện trên mỗi phiên bản dữ liệu này đều tệ hơn một cách nhất quán (dù ở các mức độ khác nhau) so với dữ liệu được loại trùng độc lập cho từng đợt crawl ban đầu:

![So sánh các nỗ lực loại trùng toàn cục](https://huggingfacefw-blogpost-fineweb-v1.static.hf.space/assets/images/dedup_attempts.png)
