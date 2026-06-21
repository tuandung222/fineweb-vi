---
sidebar_position: 7
sidebar_label: 'Tiếp cận Thống kê'
---

### Tiếp cận thống kê để phát triển các bộ lọc heuristic

Để phát triển các bộ lọc heuristic mới và chọn ngưỡng phù hợp, chúng tôi thiết kế một quy trình có hệ thống:

1. **Thu thập số liệu thống kê:** Thu thập danh sách lớn các chỉ số cấp cao của tập dữ liệu (hơn **50** chỉ số khác nhau) — từ các chỉ số cấp tài liệu phổ biến (số dòng, độ dài dòng/từ trung bình, v.v.) đến các chỉ số lặp lại giữa các tài liệu (lấy cảm hứng từ MassiveText), trên cả tập dữ liệu web chất lượng cao và chất lượng thấp;
2. **Chọn lọc chỉ số:** Chọn các chỉ số có khoảng cách Wasserstein lớn nhất giữa hai phân phối (của chỉ số đó trên mỗi tập);
3. **Xác định ngưỡng:** Xem histogram của hai phân phối và chọn ngưỡng theo kinh nghiệm sao cho tập dữ liệu chất lượng thấp gần với tập chất lượng cao hơn ở chỉ số này;
4. **Xác thực bộ lọc:** Áp dụng bộ lọc (cặp chỉ số - ngưỡng) lên tập dữ liệu tham chiếu và chạy ablation nhỏ.

Do giả định rằng global MinHash deduplication làm tăng đáng kể tỷ lệ dữ liệu chất lượng thấp trong các đợt crawl cũ nhất, chúng tôi tính toán các chỉ số trên cả phiên bản independent MinHash và phiên bản global MinHash (chất lượng kém hơn) của các đợt crawl `2013-48` và `2015-22`. Sau đó chúng tôi so sánh các số liệu thống kê vĩ mô bằng cách xem phân phối của các chỉ số này cho từng phiên bản.

Không quá bất ngờ, chúng tôi nhận thấy sự khác biệt đáng kể ở hầu hết các chỉ số giữa hai phương pháp. Ví dụ, chỉ số `line-char-duplicates` (số ký tự trong các dòng trùng lặp / tổng số ký tự) tăng gần gấp đôi — từ independent deduplication (0,0053 cho `2015-22` và 0,0058 cho `2013-48`) lên global deduplication (0,011 cho `2015-22` và 0,01 cho `2013-48`) — cho thấy phương pháp sau có mức độ lặp lại giữa các tài liệu cao hơn.

Quy trình trên tạo ra **17** cặp chỉ số - ngưỡng ứng viên. Trong hình bên dưới, bạn có thể thấy ba trong số các histogram này:

<div className="main-plot-container">
  <figure>
    <img src="https://huggingface.co/datasets/HuggingFaceFW/fineweb/resolve/main/blog/assets/images/stats.png" alt="Các biểu đồ thống kê phân phối" />
  </figure>
  <div id="plot-stats"></div>
</div>

Ví dụ, chúng tôi xem histogram "tỷ lệ các dòng kết thúc bằng dấu câu" (hình trên) và nhận thấy mật độ tài liệu tăng lên của global MinHash ở khoảng 0,12. Sau đó chúng tôi lọc với ngưỡng này và thấy dữ liệu bị loại bỏ chứa nhiều danh sách ngắn hoặc chỉ toàn văn bản điều hướng (như "Home", "Sign up", v.v.).

Tiếp theo, chúng tôi đánh giá 17 bộ lọc mới bằng các ablation run **28 tỷ token** trên đợt crawl `2019-18`. Qua đó xác định được **3** bộ lọc (dựa trên histogram ở trên) mang lại cải thiện đáng kể nhất:

- **Loại bỏ tài liệu có tỷ lệ dòng kết thúc bằng dấu câu ≤ 0,12** (loại bỏ 10,14% token) — so với mức 30% của bộ lọc dấu câu kết thúc gốc trong C4.
- **Loại bỏ tài liệu có tỷ lệ ký tự trong dòng trùng lặp ≥ 0,1** (loại bỏ 12,47% token) — ngưỡng gốc của MassiveText cho tỷ lệ này là ≥ 0,2.
- **Loại bỏ tài liệu có tỷ lệ dòng ngắn hơn 30 ký tự ≥ 0,67** (loại bỏ 3,73% token).
- **Khi áp dụng cả ba bộ lọc cùng nhau**, khoảng ~22% token bị loại bỏ.

<div className="main-plot-container">
  <figure>
    <img src="https://huggingface.co/datasets/HuggingFaceFW/fineweb/resolve/main/blog/assets/images/custom_filters.png" alt="Hiệu quả của các bộ lọc tùy chỉnh" />
  </figure>
  <div id="plot-custom_filters"></div>
</div>

Các bộ lọc này giúp chúng tôi cải thiện thêm hiệu suất, vượt qua C4, trong khi vẫn giữ được một tập dữ liệu có kích thước lớn hơn nhiều.
