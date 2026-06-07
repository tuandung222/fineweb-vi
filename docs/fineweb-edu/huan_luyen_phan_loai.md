---
sidebar_position: 3
sidebar_label: 'Huấn luyện Phân loại'
---

## Huấn luyện mô hình phân loại chất lượng

Để mở rộng quy mô gán nhãn lên tới hàng nghìn tỷ token trong FineWeb, chúng tôi đã sử dụng các nhãn gán từ Llama 3 để huấn luyện một mô hình phân loại (classifier) nhỏ. Mô hình được sử dụng là mô hình biểu diễn từ (embedding model) [Snowflake-arctic-embed-m](https://huggingface.co/Snowflake/snowflake-arctic-embed-m) tích hợp thêm một đầu phân loại (classification head) với một đầu ra hồi quy (regression output) duy nhất nằm ở phía trên.

Chúng tôi đã huấn luyện mô hình này trên 450.000 mẫu nhãn gán Llama 3 trong 20 epoch với tốc độ học (learning rate) là 3e-4, đồng thời đóng băng (freeze) các tầng encoder và embedding. Chúng tôi đã lưu lại điểm kiểm soát (checkpoint) có F1 score cao nhất trên tập kiểm định tách biệt (held-out validation set) gồm 45.000 mẫu, coi các nhãn gán của Llama 3 là nhãn chuẩn / ground-truth (ground-truth). Sau khi huấn luyện, chúng tôi làm tròn các điểm số hồi quy thành các số nguyên từ `0` đến `5`.

Sau đó, chúng tôi chuyển bài toán này thành nhiệm vụ phân loại nhị phân (binary classification) bằng cách sử dụng một ngưỡng (threshold) cố định để xác định xem một tài liệu có mang tính giáo dục hay không. Với ngưỡng là `3`, mô hình đạt được F1 score là 82% trên tập kiểm định, cho thấy hiệu suất mạnh mẽ trong việc phân biệt nội dung giáo dục chất lượng cao.

Mô hình phân loại hiện được phát hành công khai tại: [HuggingFaceFW/fineweb-edu-classifier](https://huggingface.co/HuggingFaceFW/fineweb-edu-classifier). Mã nguồn huấn luyện và suy luận (inference) được cung cấp trên [GitHub](https://github.com/huggingface/cosmopedia/tree/main/classification).
