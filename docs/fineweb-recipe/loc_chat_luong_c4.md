---
sidebar_position: 6
sidebar_label: 'Bộ lọc C4'
---

## Lọc chất lượng bổ sung

Đến thời điểm này, chúng tôi đã đạt được hiệu suất tương đương với nghiên cứu trước đó mà chúng tôi cố gắng tái lập và mở rộng: RefinedWeb, sử dụng bộ lọc cơ bản (base filtering) và loại trùng MinHash độc lập (independent MinHash). Tuy nhiên, trên tập hợp các bài toán ứng dụng thực tế (downstream tasks), một tập dữ liệu được lọc rất kỹ khác là tập dữ liệu C4[^raffel2023exploring] vẫn cho thấy hiệu suất mạnh mẽ hơn trên một số benchmark trong bộ đánh giá của chúng tôi.

Do đó, chúng tôi đã đặt mục tiêu tìm kiếm các bước lọc mới, trước tiên là để bắt kịp hiệu suất của C4, và sau đó là vượt qua nó. Điểm xuất phát tự nhiên là tìm hiểu quy trình xử lý của chính C4.

### C4: Tập dữ liệu bền bỉ với thời gian

Tập dữ liệu C4[^raffel2023exploring] được phát hành lần đầu vào năm 2019. Nó được thu thập từ đợt crawl (dump) `2019-18` của CommonCrawl bằng cách loại bỏ dữ liệu không phải tiếng Anh, áp dụng một số bộ lọc heuristic ở cả cấp độ dòng (line-level) và cấp độ tài liệu (document-level), loại trùng (deduplication) ở cấp độ dòng, và loại bỏ các tài liệu chứa từ ngữ nằm trong danh sách đen từ vựng (word blocklist).

Mặc dù đã cũ và có kích thước hạn chế so với các tiêu chuẩn hiện tại (khoảng 175 tỷ token GPT2), tập dữ liệu này cho đến nay vẫn là một phần phổ biến trong quá trình huấn luyện LLM điển hình, được sử dụng trong các mô hình tương đối gần đây như Llama1[^touvron2023llama]. Sự thành công này có được là nhờ hiệu suất mạnh mẽ của các mô hình được huấn luyện trên tập dữ liệu này, đặc biệt vượt trội trên benchmark HellaSwag[^zellers2019hellaswag] — một trong những benchmark có tỷ lệ tín hiệu trên nhiễu (signal-to-noise ratio) cao nhất trong nhóm "tín hiệu sớm" (early-signal) của chúng tôi. Chúng tôi đã thử nghiệm áp dụng từng bộ lọc khác nhau của C4 vào đường cơ sở (baseline) của bản dump FineWeb 2019-18 đã được loại trùng độc lập:

<div className="main-plot-container">
  <figure>
    <img src="https://huggingface.co/datasets/HuggingFaceFW/fineweb/resolve/main/blog/assets/images/c4_filters_hellaswag.png" alt="Bộ lọc C4 trên HellaSwag" />
  </figure>
  <div id="plot-c4_filters_hellaswag"></div>
</div>

- **Áp dụng "Tất cả các bộ lọc"** (loại bỏ các dòng không kết thúc bằng dấu câu, các dòng đề cập đến javascript và thông báo cookie + loại bỏ các tài liệu ngoài ngưỡng độ dài, chứa "lorem ipsum" hoặc dấu ngoặc nhọn `{`): cho phép chúng tôi sánh ngang với hiệu suất HellaSwag của C4 (lần lượt là đường biểu diễn "All filters" và "C4").
- **Bộ lọc dấu ngoặc nhọn và bộ lọc độ dài từ** chỉ mang lại một cải thiện nhỏ, lần lượt loại bỏ 2,8% và 4,3% lượng token.
- **Bộ lọc dấu câu kết thúc (terminal punctuation filter)**, nếu đứng riêng lẻ, mang lại cải thiện cá nhân lớn nhất nhưng lại loại bỏ *khoảng 30%* tổng số token (!).
- **Các quy tắc loại bỏ lorem_ipsum, javascript và chính sách bảo mật** mỗi loại chỉ loại bỏ ít hơn 0,5% (&lt;0,5%) số lượng token huấn luyện, vì vậy chúng tôi không huấn luyện riêng cho từng bộ lọc này.
- **"Tất cả bộ lọc ngoại trừ bộ lọc dấu câu kết thúc"** (vốn có tính hủy diệt cao) hoạt động tốt hơn so với việc chỉ sử dụng duy nhất bộ lọc dấu câu kết thúc, trong khi tổng số lượng token bị loại bỏ ít hơn nhiều (~7%).

Chúng tôi quyết định áp dụng tất cả các bộ lọc C4 được đề cập ở trên ngoại trừ bộ lọc dấu câu kết thúc. Chúng tôi đã xác thực các kết quả này bằng một đợt chạy huấn luyện dài hơn, kết quả của đợt chạy này sẽ được trình bày trong biểu đồ ở phần tiếp theo.

[^raffel2023exploring]: Raffel et al., "Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer".
[^touvron2023llama]: Touvron et al., "LLaMA: Open and Efficient Foundation Language Models".
[^zellers2019hellaswag]: Zellers et al., "HellaSwag: Can a Machine Really Finish Your Sentence?".
