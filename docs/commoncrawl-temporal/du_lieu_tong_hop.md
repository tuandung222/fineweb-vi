---
sidebar_position: 2
sidebar_label: 'Dữ liệu Tổng hợp'
---

### Dấu chân của dữ liệu tổng hợp

Chúng tôi đặt câu hỏi liệu hiệu suất tốt của một vài đợt crawl gần đây có phần nào là do sự xuất hiện ngày càng nhiều của dữ liệu tổng hợp (dữ liệu do LLM tạo ra) hay không. Điều này không có gì đáng ngạc nhiên trước sự bùng nổ của các LLM, đặc biệt là ChatGPT.

Vì không có phương pháp nào hoàn toàn chắc chắn để phát hiện dữ liệu tổng hợp, chúng tôi chọn dùng một proxy metric: đo tần suất xuất hiện của các từ/cụm từ sau trong mỗi đợt crawl: `"delve"`, `"as a large language model"`, `"it's important to note"`, `"rich tapestry"`, `"intertwined"`, `"certainly!"`, `"dive into"` — tất cả đều là đặc trưng thường thấy trong văn bản do ChatGPT tạo ra.

Cần lưu ý rằng không phải mẫu nào chứa một trong những cụm từ này đều nhất thiết do ChatGPT tạo ra (và nhiều mẫu do ChatGPT tạo cũng không chứa chúng). Tuy nhiên, nếu giả định lượng dữ liệu tổng hợp không thay đổi giữa các đợt crawl, tần suất các từ này sẽ phải duy trì ở mức xấp xỉ không đổi theo thời gian.

Kết quả được thể hiện trong biểu đồ sau:

<div className="main-plot-container l-page-outset">
  <figure>
    <img src="https://huggingface.co/datasets/HuggingFaceFW/fineweb/resolve/main/blog/assets/images/synth_data_contamination.png" alt="Tần suất xuất hiện các từ khóa đặc trưng của ChatGPT qua các đợt crawl" />
  </figure>
  <div id="plot-synth_data_contamination"></div>
</div>

Tần suất này duy trì ở mức tương đối ổn định cho đến đợt crawl `2023-14` (ChatGPT ra mắt cuối năm 2022), sau đó tăng mạnh trong các đợt crawl gần đây. Dù thử nghiệm đơn giản này không đủ để kết luận rằng văn bản từ ChatGPT và dữ liệu tổng hợp khác đang cải thiện chất lượng đợt crawl gần nhất, ít nhất nó cho thấy điều đó không gây hại nghiêm trọng đến chất lượng dữ liệu.

Chúng tôi dự đoán lượng dữ liệu tổng hợp sẽ tiếp tục tăng trong các đợt crawl CommonCrawl sắp tới. Dù ở quy mô huấn luyện nhỏ, dữ liệu này dường như không làm giảm hiệu suất (thậm chí có thể cải thiện), nhưng vẫn chưa rõ liệu điều này có còn đúng ở quy mô lớn hơn nhiều hay không.
