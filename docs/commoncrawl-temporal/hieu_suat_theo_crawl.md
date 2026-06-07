---
sidebar_position: 1
sidebar_label: 'Hiệu suất theo Crawl'
---

## Khảo sát: Biến động CommonCrawl theo thời gian

> Giống như rượu vang ngon, không phải đợt crawl nào cũng có chất lượng như nhau.

Trong khi thực hiện các thử nghiệm loại trừ (ablation) cho các bước lọc dữ liệu, chúng tôi nhận thấy một số đợt crawl vượt trội hơn hẳn so với những đợt khác với biên độ đáng kể. Chúng tôi quyết định đi sâu tìm hiểu hiện tượng này.

### Hiệu suất benchmark theo từng đợt crawl

Đối với mỗi đợt crawl / bản dump (crawl), chúng tôi huấn luyện hai mô hình 1.8B trên 27 tỷ (27B) token được lấy mẫu ngẫu nhiên từ dữ liệu của đợt crawl đó (sau khi thực hiện các bước lọc cơ bản (base filtering) và loại bỏ trùng lặp / loại trùng (deduplication) MinHash độc lập), trong đó mỗi lượt chạy sử dụng một tập mẫu 27B token ngẫu nhiên khác nhau. Chúng tôi đã huấn luyện tổng cộng 192 mô hình như vậy, tiêu tốn hơn 60 nghìn giờ GPU H100. Sau đó, chúng tôi lấy 3 điểm kiểm soát (checkpoint) cuối cùng của cả hai lượt chạy và vẽ biểu đồ trung bình của 6 điểm dữ liệu này cho mỗi đợt crawl.

Biểu đồ bên dưới cho thấy rõ ràng rằng một số đợt crawl có hiệu suất kém hơn nhiều so với những đợt khác. Mỗi năm được biểu diễn bằng một màu sắc khác nhau, và số lượng các đợt crawl mỗi năm cũng khác nhau.

<div className="main-plot-container l-page-outset">
  <figure>
    <img src="https://huggingface.co/datasets/HuggingFaceFW/fineweb/resolve/main/blog/assets/images/score_by_dump.png" alt="Điểm số trung bình theo từng đợt crawl" />
  </figure>
  <div id="plot-score_by_dump"></div>
</div>

Chúng tôi đã nghiên cứu các nguyên nhân khả thi dẫn đến hành vi này, chẳng hạn như sự thay đổi của các URL phổ biến nhất trong mỗi đợt crawl, cũng như khả năng nhiễm bẩn dữ liệu / rò rỉ dữ liệu (contamination) trong benchmark, nhưng không tìm thấy lời giải thích nào thực sự thuyết phục. Chúng tôi xin để lại nghiên cứu sâu hơn này cho các công trình trong tương lai.
