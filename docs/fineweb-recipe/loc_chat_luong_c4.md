---
sidebar_position: 6
sidebar_label: 'Bộ lọc C4'
---

## Lọc chất lượng bổ sung

Đến đây, chúng tôi đã đạt hiệu suất tương đương RefinedWeb — nghiên cứu trước mà chúng tôi cố gắng tái lập và mở rộng — bằng cách kết hợp base filtering và independent MinHash deduplication. Tuy nhiên, tập dữ liệu C4[^raffel2023exploring] — được lọc rất kỹ — vẫn cho hiệu suất tốt hơn trên một số benchmark trong bộ đánh giá.

Vì vậy, chúng tôi tìm kiếm các bước lọc mới: trước tiên bắt kịp C4, sau đó vượt qua nó. Điểm khởi đầu tự nhiên là tìm hiểu quy trình xử lý của C4.

### C4: Tập dữ liệu bền vững theo thời gian

C4[^raffel2023exploring] được phát hành năm 2019, thu thập từ dump `2019-18` của CommonCrawl bằng cách loại bỏ nội dung không phải tiếng Anh, áp dụng các bộ lọc heuristic ở cấp dòng và cấp tài liệu, deduplication ở cấp dòng, và loại bỏ các tài liệu chứa từ trong blocklist.

Dù đã cũ và kích thước khiêm tốn so với tiêu chuẩn hiện tại (khoảng 175 tỷ token GPT2), C4 vẫn là một thành phần phổ biến trong quá trình huấn luyện LLM và xuất hiện trong các mô hình gần đây như Llama 1[^touvron2023llama]. Sự bền vững này nhờ vào hiệu suất mạnh trên HellaSwag[^zellers2019hellaswag] — một trong những benchmark có tỷ lệ signal-to-noise cao nhất trong nhóm “tín hiệu sớm”. Chúng tôi thử nghiệm áp dụng lần lượt từng bộ lọc C4 vào baseline dump FineWeb 2019-18 đã independent deduplication:

<div className="main-plot-container">
  <figure>
    <img src="https://huggingface.co/datasets/HuggingFaceFW/fineweb/resolve/main/blog/assets/images/c4_filters_hellaswag.png" alt="Bộ lọc C4 trên HellaSwag" />
  </figure>
  <div id="plot-c4_filters_hellaswag"></div>
</div>

- **Áp dụng “Tất cả các bộ lọc”** (loại bỏ dòng không kết thúc bằng dấu câu, dòng đề cập javascript và cookie; loại bỏ tài liệu ngoài ngưỡng độ dài, chứa “lorem ipsum” hoặc dấu ngoặc nhọn `{`): giúp chúng tôi đạt hiệu suất HellaSwag ngang mức C4 (lần lượt là đường “All filters” và “C4”).
- **Bộ lọc dấu ngoặc nhọn và bộ lọc độ dài từ** mang lại cải thiện nhỏ, lần lượt loại bỏ 2,8% và 4,3% token.
- **Bộ lọc dấu câu kết thúc**, nếu đứng riêng, mang lại cải thiện lớn nhất nhưng lại loại bỏ *khoảng 30%* tổng số token (!).
- **Các quy tắc loại bỏ lorem ipsum, javascript và chính sách bảo mật** mỗi loại chỉ loại bỏ dưới 0,5% token, nên chúng tôi không huấn luyện riêng cho từng bộ lọc này.
- **“Tất cả bộ lọc trừ bộ lọc dấu câu kết thúc”** hoạt động tốt hơn so với chỉ dùng bộ lọc dấu câu kết thúc, trong khi chỉ loại bỏ ~7% token.

Chúng tôi quyết định áp dụng tất cả các bộ lọc C4 nêu trên, ngoại trừ bộ lọc dấu câu kết thúc. Kết quả đã được xác nhận bằng một lượt huấn luyện dài hơn, được trình bày trong biểu đồ ở phần tiếp theo.

[^raffel2023exploring]: Raffel et al., "Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer".
[^touvron2023llama]: Touvron et al., "LLaMA: Open and Efficient Foundation Language Models".
[^zellers2019hellaswag]: Zellers et al., "HellaSwag: Can a Machine Really Finish Your Sentence?".
