---
sidebar_position: 1
sidebar_label: 'Ý tưởng FineWeb-Edu'
---

## 📚 FineWeb-Edu

<div className="main-plot-container">
  <figure>
    <img src="https://huggingface.co/datasets/HuggingFaceFW/fineweb/resolve/main/blog/assets/images/edu_ablations.png" alt="FineWeb-Edu so với các tập dữ liệu khác" />
    <figcaption>📚 FineWeb-Edu vượt trội hơn 🍷 FineWeb và tất cả các tập dữ liệu web mở khác trên nhóm các bài toán đánh giá của chúng tôi.</figcaption>
  </figure>
  <div id="plot-edu_ablations"></div>
</div>

[📚 FineWeb-Edu](https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu) là bước phát triển tiếp theo của FineWeb mà chúng tôi rất hào hứng giới thiệu và công bố công khai. FineWeb-Edu dựa trên một phương pháp mới xuất hiện gần đây: dùng dữ liệu tổng hợp để phát triển các classifier nhằm xác định nội dung mang tính giáo dục. Kỹ thuật này đã được áp dụng trong quá trình huấn luyện Llama 3[^llama3modelcard] và Phi-3[^abdin2024phi], nhưng theo nhận định của chúng tôi, tác động của nó ở quy mô lớn đối với việc lọc dữ liệu web vẫn chưa được nghiên cứu công khai đầy đủ.

Các mô hình Phi-3 phổ biến được huấn luyện trên 3,3 và 4,8 nghìn tỷ token, với bài báo nêu rõ:

> Dữ liệu huấn luyện của chúng tôi bao gồm dữ liệu web công khai được lọc kỹ lưỡng (theo "trình độ giáo dục") từ nhiều nguồn internet mở, cũng như dữ liệu tổng hợp do LLM tạo ra.

Tương tự, blog của Llama 3[^meta2024responsible] lưu ý:

> Chúng tôi nhận thấy các thế hệ Llama trước rất giỏi trong việc xác định dữ liệu chất lượng cao, vì vậy chúng tôi đã dùng Llama 2 để hỗ trợ xây dựng các classifier chất lượng văn bản đang vận hành Llama 3.

Tuy nhiên, các classifier và tập dữ liệu được lọc này không được công bố công khai. Để nâng cao chất lượng của 🍷 FineWeb, chúng tôi đã phát triển một classifier chất lượng giáo dục bằng cách dùng nhãn gán từ [Llama-3-70B-Instruct](https://huggingface.co/meta-llama/Meta-Llama-3-70B-Instruct) để tạo ra **📚 FineWeb-Edu**.

### Ý tưởng về Thang điểm Giá trị Giáo dục

Để đánh giá chất lượng giáo dục của các tài liệu một cách tự động và nhất quán, chúng tôi cần một thang đo có thể định lượng giá trị này. Sau khi thử nghiệm nhiều định dạng prompt khác nhau, chúng tôi nhận thấy **additive scale** của Yuan et al.[^yuan2024self] hoạt động hiệu quả nhất.

Thang điểm này cho phép LLM lập luận về từng điểm số bổ sung được cộng thêm, khác với Likert scale đơn lẻ vốn ép các mẫu dữ liệu vào các hộp định nghĩa sẵn. Ngoài ra, để tránh việc LLM thiên vị các trang có tính kỹ thuật quá cao như bài nộp trên arXiv, chúng tôi tập trung thang điểm vào **kiến thức cấp tiểu học và trung học cơ sở**. Bằng cách đặt ngưỡng lọc là 3 (trên thang 0–5), chúng tôi vẫn có thể giữ lại một số trang giáo dục ở trình độ cao.

[^llama3modelcard]: Llama 3 Model Card.
[^abdin2024phi]: Abdin et al., "Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone".
[^meta2024responsible]: Meta, "Introducing Llama 3: The most capable openly available LLM to date".
[^yuan2024self]: Yuan et al., "Self-Rewarding Language Models".
