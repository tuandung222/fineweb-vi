---
sidebar_position: 2
sidebar_label: 'Dữ liệu Tổng hợp'
---

### Dấu chân của dữ liệu tổng hợp

Chúng tôi tự hỏi liệu hiệu suất mạnh mẽ của một vài đợt crawl gần đây có phải một phần là do sự xuất hiện của lượng lớn dữ liệu tổng hợp / dữ liệu nhân tạo (synthetic data) (dữ liệu được tạo ra bởi các LLM) hay không. Sự thay đổi này không có gì đáng ngạc nhiên trước sự bùng nổ phổ biến gần đây của các LLM, đặc biệt là ChatGPT.

Vì theo hiểu biết của chúng tôi, không có phương pháp nào là hoàn toàn chắc chắn để phát hiện dữ liệu tổng hợp, chúng tôi đã chọn sử dụng một thước đo gián tiếp (proxy metric): đo lường tần suất xuất hiện của các từ/cụm từ sau trong mỗi đợt crawl: `"delve", "as a large language model", "it's important to note", "rich tapestry", "intertwined", "certainly!", "dive into"` — tất cả đều là những từ khóa đặc trưng thường được ChatGPT sử dụng.

Cần lưu ý rằng không phải tất cả các mẫu chứa một trong những cụm từ này đều nhất thiết phải do ChatGPT tạo ra (và nhiều mẫu do ChatGPT tạo ra cũng không chứa bất kỳ cụm từ nào ở trên), nhưng nếu giả định rằng lượng dữ liệu tổng hợp không thay đổi giữa các đợt crawl, người ta sẽ kỳ vọng tần suất của các từ này sẽ duy trì ở mức xấp xỉ không đổi theo thời gian.

Kết quả được thể hiện trong biểu đồ sau:

<div className="main-plot-container l-page-outset">
  <figure>
    <img src="https://huggingface.co/datasets/HuggingFaceFW/fineweb/resolve/main/blog/assets/images/synth_data_contamination.png" alt="Tần suất xuất hiện các từ khóa đặc trưng của ChatGPT qua các đợt crawl" />
  </figure>
  <div id="plot-synth_data_contamination"></div>
</div>

Trong khi tần suất này duy trì ở mức tương đối ổn định cho đến đợt crawl `2023-14` (ChatGPT được ra mắt vào cuối năm 2022), chúng tôi phát hiện sự gia tăng mạnh mẽ của thước đo gián tiếp này trong các đợt crawl gần đây. Mặc dù thử nghiệm đơn giản này không đủ để kết luận rằng văn bản hoàn thiện từ ChatGPT và dữ liệu tổng hợp khác đang cải thiện chất lượng của đợt crawl gần đây nhất, nhưng ít nhất nó dường như không gây hại nghiêm trọng đến chất lượng dữ liệu.

Chúng tôi dự đoán sẽ tiếp tục thấy lượng dữ liệu tổng hợp gia tăng trong các đợt crawl CommonCrawl tiếp theo. Tuy nhiên, mặc dù đối với các lượt huấn luyện quy mô tương đối nhỏ, dữ liệu này dường như không làm hại đến hiệu suất (và thậm chí có thể cải thiện nó), vẫn chưa rõ liệu điều này có còn đúng đối với các lượt huấn luyện quy mô lớn hơn nhiều hay không.
