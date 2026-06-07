---
sidebar_position: 4
sidebar_label: 'Thí nghiệm & Đánh giá'
---

# Thí nghiệm & Đánh giá

## Thiết lập thí nghiệm loại trừ và đánh giá

Để so sánh tác động của một bước xử lý cụ thể, chúng tôi huấn luyện hai mô hình trên hai phiên bản khác nhau của tập dữ liệu: một phiên bản được xử lý bổ sung bước đó (phiên bản cần đánh giá) và một phiên bản loại bỏ (ablated) bước này. Ngoại trừ phần dữ liệu, hai mô hình này hoàn toàn giống nhau về mọi mặt: cùng số lượng tham số, siêu tham số kiến trúc, và được huấn luyện trên một số lượng token được lấy mẫu ngẫu nhiên bằng nhau từ mỗi phiên bản dữ liệu trong duy nhất một chu kỳ (epoch) — sự khác biệt duy nhất do đó chỉ nằm ở dữ liệu huấn luyện. Sau đó, chúng tôi đánh giá từng mô hình trên cùng một bộ bài toán và so sánh điểm số trung bình.

Các mô hình thử nghiệm loại trừ (ablation model) của chúng tôi được huấn luyện bằng [nanotron](https://github.com/huggingface/nanotron). Các mô hình này có kích thước 1,82 tỷ tham số (bao gồm cả lớp nhúng - embeddings), sử dụng kiến trúc Llama với chiều dài chuỗi (sequence length) là 2048, kích thước lô toàn cục (global batch size) khoảng 2 triệu token, và sử dụng bộ phân tách từ (tokenizer) GPT2. Đối với hầu hết các thử nghiệm loại trừ, chúng tôi huấn luyện trên khoảng 28 tỷ token (gần bằng kích thước huấn luyện tối ưu theo Chinchilla đối với kích thước mô hình này). Để xác nhận các cải tiến hiệu suất tương đối sau mỗi bước lọc, chúng tôi đã thực hiện các lượt huấn luyện dài hơn trên 350 tỷ token như sẽ đề cập chi tiết ở phần dưới.

> [!NOTE]
> 📝 **Ghi chú**
> Chúng tôi sẽ sớm cung cấp cấu hình để tái lập các mô hình thử nghiệm loại trừ này trong Nanotron.

Chúng tôi đánh giá các mô hình bằng công cụ [lighteval](https://github.com/huggingface/lighteval/). Chúng tôi đã lựa chọn cẩn thận một bộ các benchmark cho các thử nghiệm loại trừ bằng cách chọn ra các phép thử cung cấp tín hiệu tốt ở quy mô tương đối nhỏ (các mô hình "nhỏ" chỉ được huấn luyện trên "vài tỷ" token). Nhìn chung, chúng tôi dựa vào các tiêu chí sau để chọn ra các benchmark này trong số tất cả các benchmark có sẵn trong lighteval:

* **Độ lệch (variance) nhỏ giữa các lượt chạy được huấn luyện trên các mẫu khác nhau của cùng một tập dữ liệu:** chúng tôi muốn các lượt chạy trên một tập con dữ liệu phải mang tính đại diện cho toàn bộ tập dữ liệu, và kết quả điểm số thu được sẽ ít nhạy cảm nhất có thể đối với các lựa chọn điểm dữ liệu cụ thể so với tác động từ bộ lọc của chúng tôi.
* **Hiệu suất tăng đơn điệu (hoặc gần như vậy) trong suốt quá trình huấn luyện:** lý tưởng nhất là khi số lượng token mô hình đã học tăng lên, hiệu suất trên một benchmark có tín hiệu cao không được giảm đi (điều này biểu thị cho kết quả không đáng tin cậy ở quy mô nhỏ).
* **Hiệu suất vượt trên mức cơ sở ngẫu nhiên (random baseline) của bài toán đó ít nhất vài độ lệch chuẩn:** do các mô hình thử nghiệm loại trừ và các lượt huấn luyện của chúng tôi có quy mô nhỏ, chúng tôi thường không đạt được điểm số cực kỳ cao trên bất kỳ benchmark nào, nhưng chúng tôi muốn đảm bảo điểm số thu được vượt hẳn trên nhiễu ngẫu nhiên.

Sau khi cân nhắc kỹ lưỡng, chúng tôi đã chọn danh sách các benchmark sau:
* CommonSense QA
* HellaSwag
* OpenBook QA
* PIQA
* SIQA
* WinoGrande
* ARC
* MMLU

Để đảm bảo việc đánh giá các điểm kiểm soát (checkpoint) nằm trong một khoảng thời gian giới hạn, chúng tôi đã giới hạn các benchmark dài hơn ở mức tối đa 1000 mẫu (thời gian đánh giá thực tế mất chưa đầy 5 phút trên một nút gồm 8 GPU - được thực hiện song song với quá trình huấn luyện)[^1].

[^1]: Bạn có thể tìm thấy danh sách đầy đủ các nhiệm vụ và câu lệnh (prompt) chúng tôi đã sử dụng tại [đây](https://huggingface.co/datasets/HuggingFaceFW/fineweb/blob/main/lighteval_tasks.py).
