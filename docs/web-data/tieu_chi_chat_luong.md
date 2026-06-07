---
sidebar_position: 3
sidebar_label: 'Định nghĩa Chất lượng'
---

# Định nghĩa Chất lượng

## Dữ liệu thế nào là tốt?

Đây có lẽ là câu hỏi quan trọng nhất cần lưu ý khi tạo một tập dữ liệu (dataset). Trong hầu hết các ngữ cảnh và đặc biệt là trong ngữ cảnh tiền huấn luyện (pretraining) mô hình ngôn ngữ lớn[^1], "chất lượng cao" không phải là một thuật ngữ được định nghĩa rõ ràng, và thậm chí không phải là một thuộc tính của tài liệu mà con người có thể luôn dễ dàng nhận biết chỉ qua quan sát trực tiếp.

Phương pháp phổ biến hiện nay vẫn là huấn luyện một mô hình trên một ngữ liệu (corpus) cho trước được coi là "sạch" (thông thường là Wikipedia[^2]) rồi sử dụng nó để kiểm tra độ hỗn loạn (perplexity) trên tập dữ liệu mà chúng ta đang cố gắng thu thập và lọc (curate). Đáng tiếc là điều này không phải lúc nào cũng tương quan với hiệu suất được cải thiện trên tập hợp các bài toán ứng dụng thực tế (downstream tasks) được quan tâm. Do đó, một cách tiếp cận khác cũng thường được sử dụng là huấn luyện các mô hình nhỏ[^3] trên một tập con đại diện của tập dữ liệu rồi đánh giá chúng trên một nhóm các nhiệm vụ đánh giá. Các mô hình nhỏ được sử dụng vì chi phí và thời gian huấn luyện tỷ lệ thuận với kích thước mô hình. Trong cách tiếp cận thứ hai này, điều quan trọng là phải chọn một bộ nhiệm vụ đánh giá tập dữ liệu đa dạng và mang tính đại diện, đồng thời cố gắng không để xảy ra hiện tượng quá khớp (overfit) vào bất kỳ một bài đánh giá (benchmark) riêng lẻ nào, vì điều đó có nguy cơ làm tổn hại đến tính tổng quát của LLM thu được sau pretraining.

Một cách khác nữa để so sánh các tập dữ liệu khác nhau là huấn luyện một mô hình trên mỗi tập dữ liệu đó rồi để con người đánh giá và so sánh kết quả do các mô hình tạo ra (như trên bảng xếp hạng [LMSYS Chatbot Arena](https://chat.lmsys.org/)). Phương pháp này được cho là mang lại kết quả đáng tin cậy nhất về mặt phản ánh cách sử dụng mô hình trong thực tế, nhưng việc thu thập kết quả thử nghiệm loại trừ (ablation) theo cách này lại rất tốn kém và chậm chạp. Nó cũng thường yêu cầu các mô hình phải trải qua giai đoạn tinh chỉnh theo chỉ dẫn (instruction finetuning) để có được khả năng trò chuyện, vì các mô hình pretraining không được thiết kế trực tiếp để tuân theo chỉ dẫn, do đó nhạy cảm hơn nhiều với các chi tiết của câu lệnh (prompt).

Trong nghiên cứu này, chúng tôi chọn hướng tiếp cận huấn luyện các mô hình nhỏ và đánh giá chúng trên một tập hợp các bài đánh giá cho "tín hiệu sớm" (early-signal benchmark). Chúng tôi tin rằng đây là một đại diện (proxy) hợp lý cho chất lượng dữ liệu được dùng để huấn luyện các mô hình này, miễn là luôn ghi nhớ lưu ý đã nêu ở trên về việc quá khớp với các benchmark đánh giá.

[^1]: Lưu ý rằng báo cáo kỹ thuật này tập trung vào lĩnh vực đặc thù là các tập dữ liệu quy mô web - web-scale (thường có nghĩa là &gt;100 tỷ token thu được từ web) được sử dụng để pretrain một mô hình ngôn ngữ lớn (bằng pretraining, chúng tôi muốn nói đến bước đầu tiên trong quá trình huấn luyện một mô hình, bắt đầu với các trọng số ngẫu nhiên). Chúng tôi không tự nhận bài viết bao quát bất kỳ lĩnh vực tạo tập dữ liệu nào khác, hoặc các bài học hay giả thuyết được phát triển trong tài liệu này có thể mở rộng ra các lĩnh vực ngoài phạm vi cụ thể này.
[^2]: Mặc dù như chúng tôi đã đề cập ở trên, khái niệm "sạch" mơ hồ đến mức có lẽ không nên xem nó tương đương với văn bản kiểu Wikipedia.
[^3]: "Nhỏ" so với các kích thước tiêu chuẩn của các LLM ngày nay, tức là nhỏ hơn so với mức 7-70 tỷ tham số. Trong nghiên cứu này, "nhỏ" nghĩa là khoảng 1-2 tỷ tham số.
