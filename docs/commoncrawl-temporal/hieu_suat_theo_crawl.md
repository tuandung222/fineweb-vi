---
sidebar_position: 1
sidebar_label: 'Hiệu suất theo đợt crawl'
---

# Hiệu suất theo Thời gian

Biểu đồ dưới đây thể hiện sự biến động hiệu suất của các mô hình được huấn luyện trên từng đợt crawl khác nhau của CommonCrawl. Với mỗi đợt dữ liệu, chúng tôi áp dụng toàn bộ quy trình xử lý của FineWeb (bao gồm bộ lọc cơ bản, loại bỏ trùng lặp bằng MinHash, bộ lọc C4 và các bộ lọc tùy chỉnh khác), sau đó huấn luyện mô hình trên 350 tỷ token được lấy mẫu ngẫu nhiên từ đợt crawl đó. Kết quả cho thấy hiệu suất giữa các đợt crawl có sự chênh lệch đáng kể, thúc đẩy chúng tôi đi sâu tìm hiểu nguyên nhân đằng sau hiện tượng này.

### Hiệu suất benchmark theo từng đợt crawl

Đối với mỗi đợt crawl, chúng tôi huấn luyện hai mô hình 1.8B trên 27 tỷ (27B) token được lấy mẫu ngẫu nhiên từ dữ liệu của đợt crawl đó (sau khi đã thực hiện các bước lọc cơ bản và loại bỏ trùng lặp bằng MinHash). Mỗi lượt huấn luyện sử dụng một tập mẫu 27B token ngẫu nhiên khác nhau. Tổng cộng, chúng tôi đã huấn luyện 192 mô hình, tiêu tốn hơn 60.000 giờ GPU H100. Sau đó, chúng tôi sử dụng giá trị trung bình từ 3 điểm kiểm soát (checkpoint) cuối cùng của cả hai lượt chạy để vẽ biểu đồ cho mỗi đợt crawl.

Biểu đồ bên dưới cho thấy một số đợt crawl có hiệu suất kém hơn hẳn so với các đợt còn lại. Mỗi năm được biểu diễn bằng một màu sắc khác nhau, cho thấy sự khác biệt về số lượng đợt crawl theo từng năm.

<div className="main-plot-container l-page-outset">
  <figure>
    <img src="https://huggingface.co/datasets/HuggingFaceFW/fineweb/resolve/main/blog/assets/images/score_by_dump.png" alt="Điểm số trung bình theo từng đợt crawl" />
  </figure>
  <div id="plot-score_by_dump"></div>
</div>

Chúng tôi đã khảo sát nhiều nguyên nhân có thể giải thích hiện tượng này, bao gồm sự thay đổi về các URL phổ biến nhất trong mỗi đợt crawl, cũng như khả năng nhiễm bẩn (contamination) trong benchmark, nhưng chưa tìm được lời giải thích thuyết phục. Chúng tôi để lại hướng nghiên cứu này cho các công trình trong tương lai.


