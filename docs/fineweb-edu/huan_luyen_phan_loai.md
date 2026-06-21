---
sidebar_position: 3
sidebar_label: 'Huấn luyện Phân loại'
---

## Huấn luyện mô hình phân loại chất lượng

Để mở rộng quy mô gán nhãn lên hàng nghìn tỷ token trong FineWeb, chúng tôi dùng nhãn gán từ Llama 3 để huấn luyện một classifier nhỏ. Mô hình được chọn là embedding model [Snowflake-arctic-embed-m](https://huggingface.co/Snowflake/snowflake-arctic-embed-m) với một classification head hồi quy (regression) đơn đầu ra ở phía trên.

Chúng tôi huấn luyện mô hình trên 450.000 mẫu nhãn gán từ Llama 3 trong 20 epoch với learning rate 3e-4, đồng thời freeze các tầng encoder và embedding. Checkpoint có F1 score cao nhất trên held-out validation set gồm 45.000 mẫu được giữ lại — coi nhãn gán của Llama 3 là ground-truth. Sau khi huấn luyện, các điểm số hồi quy được làm tròn thành số nguyên từ `0` đến `5`.

Tiếp theo, chúng tôi chuyển sang binary classification bằng cách dùng một threshold cố định để xác định tài liệu có mang tính giáo dục hay không. Với ngưỡng `3`, mô hình đạt F1 score 82% trên tập kiểm định — hiệu suất tốt trong việc phân biệt nội dung giáo dục chất lượng cao.

Classifier này được công bố công khai tại: [HuggingFaceFW/fineweb-edu-classifier](https://huggingface.co/HuggingFaceFW/fineweb-edu-classifier). Mã nguồn huấn luyện và inference có trên [GitHub](https://github.com/huggingface/cosmopedia/tree/main/classification).

