---
sidebar_position: 3
sidebar_label: 'Định nghĩa Chất lượng'
---

# Định nghĩa Chất lượng

## Dữ liệu thế nào là tốt?

Đây có lẽ là câu hỏi quan trọng nhất khi xây dựng một tập dữ liệu. Trong hầu hết các trường hợp — đặc biệt là pretraining LLM[^1] — "chất lượng cao" không phải khái niệm có định nghĩa rõ ràng, và cũng không phải thuộc tính mà con người có thể dễ dàng nhận biết qua quan sát trực tiếp.

Một cách phổ biến hiện nay là huấn luyện mô hình trên corpus được coi là "sạch" (thường là Wikipedia[^2]), rồi dùng nó để đo perplexity trên tập dữ liệu cần lọc. Tiếc là cách này không phải lúc nào cũng tương quan với hiệu suất trên các downstream task thực tế. Vì vậy, một hướng khác cũng hay được dùng là huấn luyện các mô hình nhỏ[^3] trên subset đại diện rồi đánh giá trên một nhóm bài toán. Mô hình nhỏ được chọn vì chi phí huấn luyện tỷ lệ thuận với kích thước. Khi dùng cách này, điều quan trọng là phải chọn bộ benchmark đa dạng và có tính đại diện, đồng thời tránh overfit vào bất kỳ benchmark đơn lẻ nào — vì điều đó có thể làm tổn hại đến khả năng tổng quát hóa của LLM sau pretraining.

Một cách khác để so sánh các tập dữ liệu là huấn luyện mô hình trên từng tập rồi để người dùng đánh giá kết quả (như trên [LMSYS Chatbot Arena](https://chat.lmsys.org/)). Phương pháp này phản ánh thực tế sử dụng sát nhất, nhưng việc thu thập kết quả ablation theo cách này rất tốn kém và mất nhiều thời gian. Ngoài ra, thường phải instruction fine-tune mô hình trước để nó có khả năng hội thoại.

Trong nghiên cứu này, chúng tôi chọn huấn luyện các mô hình nhỏ và đánh giá trên bộ benchmark "tín hiệu sớm" (early-signal). Chúng tôi tin đây là proxy hợp lý cho chất lượng dữ liệu, miễn là luôn nhớ đến nguy cơ overfit vào các benchmark đánh giá.

[^1]: Báo cáo này tập trung vào các tập dữ liệu web-scale (thường >100 tỷ token) dùng để pretrain LLM — tức bước đầu tiên trong quá trình huấn luyện, bắt đầu với trọng số ngẫu nhiên. Chúng tôi không đề cập đến các lĩnh vực xây dựng tập dữ liệu khác, và các bài học trong tài liệu này có thể không áp dụng được ngoài phạm vi cụ thể này.
[^2]: Mặc dù như đã đề cập, khái niệm "sạch" khá mơ hồ và không hẳn đồng nghĩa với văn bản kiểu Wikipedia.
[^3]: "Nhỏ" so với các LLM hiện đại (7–70 tỷ tham số). Trong nghiên cứu này, "nhỏ" nghĩa là khoảng 1–2 tỷ tham số.
