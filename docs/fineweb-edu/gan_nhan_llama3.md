---
sidebar_position: 2
sidebar_label: 'Gán nhãn Llama 3'
---

## Gán nhãn chất lượng giáo dục ở quy mô lớn

Để thực hiện việc gán nhãn chất lượng giáo dục trên quy mô lớn, chúng tôi đã sử dụng [Llama-3-70B-Instruct](https://huggingface.co/meta-llama/Meta-Llama-3-70B-Instruct) để gán nhãn cho 500.000 mẫu dữ liệu từ 🍷 FineWeb, chấm điểm chất lượng giáo dục của từng mẫu theo thang điểm từ 0 đến 5.

### Thử nghiệm với các mô hình trọng số mở

Về các mô hình trọng số mở (open-weight models) được sử dụng để gán nhãn dữ liệu, chúng tôi đã thử nghiệm nhiều mô hình khác nhau bao gồm:
- [Mixtral-8x7B-Instruct](https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1)
- [Mixtral-8x22B-Instruct](https://huggingface.co/mistralai/Mixtral-8x22B-Instruct-v0.1)
- [Llama-3-70B-Instruct](https://huggingface.co/meta-llama/Meta-Llama-3-70B-Instruct)
- Một cơ chế hội đồng giám khảo (jury) tập hợp điểm số từ cả ba mô hình trên[^verga2024replacing].

Qua các thử nghiệm thực nghiệm, chúng tôi nhận thấy rằng việc sử dụng duy nhất Llama 3 mang lại kết quả đáng tin cậy nhất.

### Gợi ý gán nhãn tập trung vào cấp học phổ thông

Để tự động gán nhãn, chúng tôi đã thiết kế một gợi ý (prompt) chi tiết. Gợi ý này hướng dẫn mô hình tập trung đánh giá dựa trên mức độ phù hợp của kiến thức với học sinh cấp tiểu học và trung học cơ sở (grade-school và middle-school), giúp tránh việc thiên vị các tài liệu học thuật quá chuyên sâu (như các bài đăng trên arXiv).

<div className="main-plot-container">
  <figure>
    <img src="https://cdn-uploads.huggingface.co/production/uploads/61c141342aac764ce1654e43/fjZQ4izIj1rx1xQnBTKKr.png" alt="Gợi ý gán nhãn cho LLM" />
    <figcaption>Gợi ý (prompt) được sử dụng cho các nhãn gán điểm giáo dục bằng Llama 3, bạn cũng có thể xem tại [đây](https://huggingface.co/HuggingFaceFW/fineweb-edu-classifier/blob/main/utils/prompt.txt).</figcaption>
  </figure>
</div>

[^verga2024replacing]: Verga et al., "Replacing Human Feedback with Model Feedback in Language Model Alignment".

