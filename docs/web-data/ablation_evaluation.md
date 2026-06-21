---
sidebar_position: 4
sidebar_label: 'Thí nghiệm & Đánh giá'
---

# Thí nghiệm & Đánh giá

## Thiết lập thí nghiệm ablation và đánh giá

Để đánh giá tác động của một bước xử lý cụ thể, chúng tôi huấn luyện hai mô hình trên hai phiên bản tập dữ liệu: một có bước đó, một không có. Ngoài phần dữ liệu, hai mô hình hoàn toàn giống nhau — cùng số tham số, cùng kiến trúc, và được huấn luyện trên cùng số lượng token lấy mẫu ngẫu nhiên trong một epoch. Sau đó chúng tôi đánh giá cả hai trên cùng bộ bài toán và so sánh điểm trung bình.

Các ablation model được huấn luyện bằng [nanotron](https://github.com/huggingface/nanotron). Mô hình có 1,82 tỷ tham số (kể cả embedding), dùng kiến trúc Llama với sequence length 2048, global batch size khoảng 2 triệu token và tokenizer GPT2. Với hầu hết các ablation, chúng tôi huấn luyện trên khoảng 28 tỷ token (gần bằng kích thước tối ưu theo Chinchilla cho mô hình này). Để xác nhận các cải tiến hiệu suất sau mỗi bước lọc, chúng tôi cũng thực hiện các lượt huấn luyện dài hơn trên 350 tỷ token.

> [!NOTE]
> 📝 **Ghi chú**
> Chúng tôi sẽ sớm cung cấp cấu hình để tái lập các ablation model này trong Nanotron.

Chúng tôi đánh giá các mô hình bằng [lighteval](https://github.com/huggingface/lighteval/). Bộ benchmark cho ablation được chọn lọc kỹ theo các tiêu chí:

* **Variance thấp giữa các lượt huấn luyện trên các mẫu khác nhau của cùng tập dữ liệu:** kết quả từ một subset cần đại diện tốt cho toàn bộ tập dữ liệu, và ít bị ảnh hưởng bởi các điểm dữ liệu cụ thể so với tác động của bộ lọc.
* **Hiệu suất tăng đơn điệu (hoặc gần như vậy) trong suốt quá trình huấn luyện:** khi số token mô hình đã thấy tăng lên, điểm benchmark không nên giảm (điều đó cho thấy kết quả không đáng tin cậy ở quy mô nhỏ).
* **Hiệu suất vượt mức ngẫu nhiên ít nhất vài độ lệch chuẩn:** do mô hình và lượt huấn luyện có quy mô nhỏ, điểm số thường không cao, nhưng cần đảm bảo nó vượt hẳn nhiễu ngẫu nhiên.

Sau cân nhắc, chúng tôi chọn các benchmark sau:
* CommonSense QA
* HellaSwag
* OpenBook QA
* PIQA
* SIQA
* WinoGrande
* ARC
* MMLU

Để đánh giá các checkpoint kịp thời, chúng tôi giới hạn các benchmark dài hơn ở tối đa 1000 mẫu — thực tế mất chưa đầy 5 phút trên một node 8 GPU, chạy song song với quá trình huấn luyện[^1].

[^1]: Danh sách đầy đủ các task và prompt chúng tôi đã dùng có thể tìm thấy [tại đây](https://huggingface.co/datasets/HuggingFaceFW/fineweb/blob/main/lighteval_tasks.py).
