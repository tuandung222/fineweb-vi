---
sidebar_position: 4
sidebar_label: 'Kết quả Lọc Giáo dục'
---

## Kết quả Lọc Giáo dục và Đánh giá

Chúng tôi đã áp dụng bộ phân loại trên 15 nghìn tỷ (trillion) token của 🍷 FineWeb, quá trình này tiêu tốn khoảng 6.000 giờ H100 GPU. Chúng tôi đã nghiên cứu tác động của việc sử dụng các ngưỡng lọc khác nhau và nhận thấy rằng việc sử dụng ngưỡng là `3` mang lại kết quả tổng thể tốt nhất. Mặc dù việc sử dụng ngưỡng lớn hơn `3` giúp cải thiện hiệu suất trên các benchmark đòi hỏi nhiều kiến thức và khả năng lập luận, nhưng nó lại làm giảm đáng kể hiệu suất trên HellaSwag và PIQA. Biểu đồ dưới đây thể hiện hiệu suất của từng ngưỡng so với FineWeb trên sáu benchmark khác nhau; biểu đồ này sử dụng mô hình 1.82B được huấn luyện trên 8 tỷ (8B) token.

<div className="main-plot-container">
  <figure>
    <img src="https://huggingface.co/datasets/HuggingFaceFW/fineweb/resolve/main/blog/assets/images/edu-8k.png" alt="So sánh các ngưỡng lọc giáo dục trên 8B token" />
  </figure>
  <div id="plot-edu-8k"></div>
</div>

> [!NOTE]
> 📝 **Ghi chú**
> Thử nghiệm loại trừ (ablation) này được thực hiện trên 8 tỷ (8B) token từ đợt crawl `2024-10` cho cả hai tập con FineWeb và FineWeb-Edu, do đó kết quả này có thể không đại diện cho toàn bộ tập dữ liệu. Thử nghiệm tiếp theo cho thấy các phát hiện đối với ngưỡng 3 vẫn đúng trong một lượt chạy dài hơn với 350 tỷ (350B) token từ tất cả các đợt crawl FineWeb, ngoại trừ HellaSwag, nơi chúng tôi nhận thấy hiệu suất bị suy giảm nhẹ.

Chúng tôi đã xây dựng 📚 FineWeb-Edu bằng cách lọc bỏ các mẫu có điểm số thấp hơn 3. Bước này đã loại bỏ 92% dữ liệu, để lại 1,3 nghìn tỷ token mang tính giáo dục. Để đánh giá hiệu quả của việc lọc này ở quy mô lớn hơn, chúng tôi đã thực hiện một thử nghiệm loại trừ bằng cách sử dụng mô hình 1.82B được huấn luyện trên 350 tỷ (350B) token, tương tự như thử nghiệm lọc FineWeb đã đề cập ở các phần trước:

<div className="main-plot-container">
  <figure>
    <img src="https://huggingface.co/datasets/HuggingFaceFW/fineweb/resolve/main/blog/assets/images/edu-100k.png" alt="So sánh FineWeb-Edu với các tập dữ liệu khác trên 350B token" />
  </figure>
  <div id="plot-edu-100k"></div>
</div>

Dưới đây là các điểm nhấn quan trọng từ kết quả thử nghiệm loại trừ ở trên:

- 📚 FineWeb-Edu **vượt trội hơn 🍷 FineWeb và tất cả các tập dữ liệu web mở khác, với những cải tiến rõ rệt trên các benchmark giáo dục** như MMLU, ARC và OpenBookQA.
- Nó đạt được cùng mức hiệu suất với lượng dữ liệu ít hơn đáng kể, yêu cầu số lượng token ít hơn gấp 10 lần so với C4 và Dolma để đạt được kết quả MMLU tương đương.
- Điều này chứng minh tính hiệu quả của việc sử dụng các bộ phân loại được huấn luyện trên nhãn gán LLM để lọc dữ liệu ở quy mô lớn.

Do ngưỡng `2` cũng cho thấy hiệu suất mạnh mẽ trong khi giữ lại được nhiều dữ liệu hơn, chúng tôi đã phát hành thêm một tập dữ liệu được lọc theo ngưỡng này, chứa 5,4 nghìn tỷ (trillion) token tại [HuggingFaceFW/fineweb-edu-score-2](https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu-score-2).

Bạn có thể tìm thấy cả hai tập dữ liệu cùng với bộ phân loại được sử dụng để lọc trong [bộ sưu tập (collection) này](https://huggingface.co/collections/HuggingFaceFW/fineweb-edu-6659c3f3d399d0e1d648adfd).
