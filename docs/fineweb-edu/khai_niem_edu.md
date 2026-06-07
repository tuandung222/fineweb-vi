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

[📚 FineWeb-Edu](https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu) là một bước phát triển bổ sung của FineWeb mà chúng tôi rất hào hứng được giới thiệu trong báo cáo kỹ thuật này và phát hành công khai. 📚 FineWeb-Edu dựa trên một phương pháp mới xuất hiện gần đây để lọc các tập dữ liệu huấn luyện mô hình ngôn ngữ lớn (LLM): sử dụng dữ liệu tổng hợp / dữ liệu nhân tạo (synthetic data) để phát triển các bộ phân loại nhằm xác định nội dung mang tính giáo dục. Kỹ thuật này đã được sử dụng đáng chú ý trong quá trình huấn luyện Llama 3[^llama3modelcard] và Phi3[^abdin2024phi], nhưng theo ý kiến của chúng tôi, tác động quy mô lớn của nó đối với việc lọc dữ liệu web cho đến nay vẫn chưa được nghiên cứu công khai một cách đầy đủ tiềm năng.

Các mô hình Phi3 phổ biến đã được huấn luyện trên 3,3 và 4,8 nghìn tỷ (trillion) token, với bài báo công bố nêu rõ:

> Dữ liệu huấn luyện của chúng tôi bao gồm dữ liệu web có sẵn công khai được lọc kỹ lưỡng (theo 'trình độ giáo dục') từ nhiều nguồn internet mở khác nhau, cũng như dữ liệu tổng hợp do LLM tạo ra.

Tương tự, bài đăng trên blog của Llama 3[^meta2024responsible] lưu ý:

> Chúng tôi nhận thấy các thế hệ Llama trước đây rất giỏi trong việc xác định dữ liệu chất lượng cao, vì vậy chúng tôi đã sử dụng Llama 2 để hỗ trợ xây dựng các bộ phân loại chất lượng văn bản đang vận hành Llama 3.

Tuy nhiên, các bộ phân loại và tập dữ liệu được lọc này không được công bố công khai. Để nâng cao hơn nữa chất lượng của 🍷 FineWeb, chúng tôi đã phát triển một bộ phân loại chất lượng giáo dục bằng cách sử dụng các nhãn gán được tạo bởi [Llama-3-70B-Instruct](https://huggingface.co/meta-llama/Meta-Llama-3-70B-Instruct) để tạo ra **📚 FineWeb-Edu**.

### Ý tưởng về Thang điểm Giá trị Giáo dục

Để đánh giá chất lượng giáo dục của các tài liệu một cách tự động và nhất quán, chúng tôi cần một thang đo có thể định lượng giá trị này. Chúng tôi đã nghiên cứu nhiều định dạng gợi ý (prompt format) khác nhau để tự động trích xuất điểm giáo dục bằng LLM và nhận thấy rằng **thang điểm cộng dồn (additive scale)** của Yuan và các cộng sự[^yuan2024self] hoạt động hiệu quả nhất.

Thang điểm này cho phép LLM lập luận về từng điểm số bổ sung được cộng thêm, không giống như thang đo Likert đánh giá đơn lẻ (single-rating Likert scale) vốn ép các mẫu dữ liệu vào các hộp định nghĩa sẵn. Ngoài ra, để tránh việc LLM thiên vị các trang có tính kỹ thuật quá cao như các bản tóm tắt và bài nộp trên arXiv, chúng tôi đã tập trung thang điểm vào **kiến thức cấp tiểu học và trung học cơ sở (grade-school và middle-school)**. Bằng cách thiết lập ngưỡng lọc là 3 (trên thang điểm từ 0 đến 5) trong quá trình lọc dữ liệu, chúng tôi vẫn có thể giữ lại được một số trang giáo dục ở trình độ cao.

[^llama3modelcard]: Llama 3 Model Card.
[^abdin2024phi]: Abdin et al., "Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone".
[^meta2024responsible]: Meta, "Introducing Llama 3: The most capable openly available LLM to date".
[^yuan2024self]: Yuan et al., "Self-Rewarding Language Models".

