---
sidebar_position: 4
sidebar_label: 'Kết quả Lọc Giáo dục'
---

## Kết quả Lọc Giáo dục và Đánh giá

Chúng tôi áp dụng classifier trên 15 nghìn tỷ token của 🍷 FineWeb, tiêu tốn khoảng 6.000 giờ GPU H100. Sau khi khảo sát tác động của các ngưỡng lọc khác nhau, chúng tôi nhận thấy ngưỡng `3` cho kết quả tổng thể tốt nhất. Ngưỡng lớn hơn `3` cải thiện hiệu suất trên các benchmark đòi hỏi nhiều kiến thức và lập luận, nhưng lại làm giảm hiệu suất đáng kể trên HellaSwag và PIQA. Biểu đồ dưới đây so sánh hiệu suất từng ngưỡng so với FineWeb trên sáu benchmark, dùng mô hình 1.82B huấn luyện trên 8 tỷ token.

<div className="main-plot-container">
  <figure>
    <img src="https://huggingface.co/datasets/HuggingFaceFW/fineweb/resolve/main/blog/assets/images/edu-8k.png" alt="So sánh các ngưỡng lọc giáo dục trên 8B token" />
  </figure>
  <div id="plot-edu-8k"></div>
</div>

> [!NOTE]
> 📝 **Ghi chú**
> Ablation này được thực hiện trên 8 tỷ token từ đợt crawl `2024-10` cho cả FineWeb và FineWeb-Edu, do đó kết quả có thể không đại diện cho toàn bộ tập dữ liệu. Thử nghiệm tiếp theo cho thấy các phát hiện với ngưỡng 3 vẫn đúng trong lượt chạy 350 tỷ token từ tất cả đợt crawl FineWeb, ngoại trừ HellaSwag — nơi hiệu suất bị suy giảm nhẹ.

Chúng tôi xây dựng 📚 FineWeb-Edu bằng cách lọc bỏ các mẫu có điểm dưới 3. Bước này loại bỏ 92% dữ liệu, còn lại 1,3 nghìn tỷ token mang tính giáo dục. Để đánh giá hiệu quả ở quy mô lớn hơn, chúng tôi thực hiện ablation dùng mô hình 1.82B huấn luyện trên 350 tỷ token, tương tự ablation filtering FineWeb đã mô tả trước đó:

<div className="main-plot-container">
  <figure>
    <img src="https://huggingface.co/datasets/HuggingFaceFW/fineweb/resolve/main/blog/assets/images/edu-100k.png" alt="So sánh FineWeb-Edu với các tập dữ liệu khác trên 350B token" />
  </figure>
  <div id="plot-edu-100k"></div>
</div>

Dưới đây là những điểm nổi bật từ kết quả ablation trên:

- 📚 FineWeb-Edu **vượt trội hơn 🍷 FineWeb và tất cả các tập dữ liệu web mở khác, với cải thiện rõ rệt trên các benchmark giáo dục** như MMLU, ARC và OpenBookQA.
- Đạt hiệu suất tương đương với lượng dữ liệu ít hơn đáng kể — chỉ cần số token bằng 1/10 so với C4 và Dolma để đạt cùng kết quả trên MMLU.
- Điều này khẳng định hiệu quả của việc sử dụng bộ phân loại được huấn luyện trên nhãn LLM để lọc dữ liệu ở quy mô lớn.

Vì ngưỡng `2` cũng cho hiệu suất tốt trong khi giữ lại được nhiều dữ liệu hơn, chúng tôi phát hành thêm một tập dữ liệu lọc theo ngưỡng này, bao gồm 5,4 nghìn tỷ token tại [HuggingFaceFW/fineweb-edu-score-2](https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu-score-2).

Bạn có thể tìm thấy cả hai tập dữ liệu cùng với bộ phân loại trong [bộ sưu tập này](https://huggingface.co/collections/HuggingFaceFW/fineweb-edu-6659c3f3d399d0e1d648adfd).
