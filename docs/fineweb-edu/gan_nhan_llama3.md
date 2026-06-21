---
sidebar_position: 2
sidebar_label: 'Gán nhãn Llama 3'
---

## Gán nhãn chất lượng giáo dục ở quy mô lớn

Để gán nhãn chất lượng giáo dục ở quy mô lớn, chúng tôi dùng [Llama-3-70B-Instruct](https://huggingface.co/meta-llama/Meta-Llama-3-70B-Instruct) để chấm điểm 500.000 mẫu từ 🍷 FineWeb theo thang 0–5.

### Thử nghiệm với các mô hình open-weight

Chúng tôi đã thử nghiệm nhiều mô hình open-weight để gán nhãn, bao gồm:
- [Mixtral-8x7B-Instruct](https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1)
- [Mixtral-8x22B-Instruct](https://huggingface.co/mistralai/Mixtral-8x22B-Instruct-v0.1)
- [Llama-3-70B-Instruct](https://huggingface.co/meta-llama/Meta-Llama-3-70B-Instruct)
- Một cơ chế jury tổng hợp điểm số từ cả ba mô hình trên[^verga2024replacing].

Qua thực nghiệm, Llama 3 đơn lẻ cho kết quả đáng tin cậy nhất.

### Prompt gán nhãn tập trung vào cấp học phổ thông

Để gán nhãn tự động, chúng tôi thiết kế một prompt chi tiết hướng dẫn mô hình đánh giá dựa trên mức độ phù hợp với học sinh tiểu học và trung học cơ sở — giúp tránh thiên vị đối với các tài liệu học thuật quá chuyên sâu (như bài đăng trên arXiv).

<div className="main-plot-container">
  <figure>
    <img src="https://cdn-uploads.huggingface.co/production/uploads/61c141342aac764ce1654e43/fjZQ4izIj1rx1xQnBTKKr.png" alt="Gợi ý gán nhãn cho LLM" />
    <figcaption>Prompt được dùng để gán điểm giáo dục bằng Llama 3, xem thêm [tại đây](https://huggingface.co/HuggingFaceFW/fineweb-edu-classifier/blob/main/utils/prompt.txt).</figcaption>
  </figure>
</div>

[^verga2024replacing]: Verga et al., "Replacing Human Feedback with Model Feedback in Language Model Alignment".

