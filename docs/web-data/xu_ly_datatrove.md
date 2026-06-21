---
sidebar_position: 2
sidebar_label: 'Xử lý quy mô lớn'
---

# Xử lý quy mô lớn

Với khối lượng dữ liệu khổng lồ, một trong những thách thức chính là cần có codebase module hóa và dễ mở rộng. Điều này giúp nhanh chóng thử nghiệm các quyết định xử lý mới, song song hóa công việc hiệu quả và duy trì cái nhìn rõ ràng về dữ liệu.

Để giải quyết bài toán này, chúng tôi phát triển [datatrove](https://github.com/huggingface/datatrove) — thư viện xử lý dữ liệu mã nguồn mở cho phép mở rộng quy trình filtering và deduplication lên hàng nghìn nhân CPU. Toàn bộ các bước xử lý trong 🍷 FineWeb đều dùng thư viện này. Các script cụ thể có thể tìm thấy tại [kho lưu trữ datatrove](https://github.com/huggingface/datatrove/blob/main/examples/fineweb.py).

