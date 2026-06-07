---
sidebar_position: 2
sidebar_label: 'Xử lý quy mô lớn'
---

# Xử lý quy mô lớn

Với kích thước khổng lồ của dữ liệu liên quan, một trong những thách thức chính mà chúng tôi phải vượt qua là sở hữu một cơ sở mã nguồn (codebase) mô-đun hóa và có khả năng mở rộng tốt. Điều này cho phép chúng tôi nhanh chóng lặp lại các quyết định xử lý và dễ dàng thử nghiệm các ý tưởng mới, đồng thời song song hóa khối lượng công việc một cách hợp lý và mang lại cái nhìn rõ ràng về dữ liệu.

Để phục vụ mục đích này, chúng tôi đã phát triển [datatrove](https://github.com/huggingface/datatrove), một thư viện xử lý dữ liệu nguồn mở cho phép chúng tôi mở rộng quy trình lọc dữ liệu (filtering) và loại bỏ trùng lặp (deduplication) của mình một cách liền mạch lên hàng nghìn nhân CPU. Tất cả các bước xử lý dữ liệu liên quan đến việc tạo ra 🍷 FineWeb đều sử dụng thư viện này. Bạn có thể tìm thấy các mã lệnh (script) chính xác mà chúng tôi đã sử dụng trong [kho lưu trữ datatrove](https://github.com/huggingface/datatrove/blob/main/examples/fineweb.py).
