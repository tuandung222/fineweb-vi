---
sidebar_position: 7
sidebar_label: 'Tiếp cận Thống kê'
---

### Tiếp cận thống kê để phát triển các bộ lọc heuristic

Để phát triển các bộ lọc heuristic mới và chọn ra các ngưỡng phù hợp, chúng tôi đã thiết kế một quy trình có hệ thống:

1. **Thu thập số liệu thống kê:** Chúng tôi bắt đầu bằng cách thu thập một danh sách rất lớn các số liệu thống kê cấp cao của các tập dữ liệu (hơn **50** chỉ số khác nhau), từ các chỉ số cấp độ tài liệu (document-level) phổ biến (ví dụ: số dòng, độ dài dòng/từ trung bình, v.v.) đến các chỉ số lặp lại giữa các tài liệu (lấy cảm hứng từ MassiveText), trên cả tập dữ liệu web chất lượng cao và chất lượng thấp;
2. **Chọn lọc chỉ số:** Chúng tôi lựa chọn các chỉ số có khoảng cách Wasserstein (Wasserstein distance) lớn nhất giữa hai phân phối (của chỉ số được tính toán trên mỗi tập dữ liệu);
3. **Xác định ngưỡng:** Chúng tôi kiểm tra biểu đồ tần suất (histogram) của hai phân phối và chọn một ngưỡng theo kinh nghiệm thực nghiệm sao cho tập dữ liệu chất lượng thấp giống với tập dữ liệu chất lượng cao hơn đối với chỉ số này;
4. **Xác thực bộ lọc:** Chúng tôi xác thực bộ lọc thu được (cặp chỉ số - ngưỡng) bằng cách áp dụng nó trên một tập dữ liệu tham chiếu và chạy các thử nghiệm loại trừ (ablation study) nhỏ.

Do giả định (mới) của chúng tôi rằng loại trùng MinHash toàn cục (global MinHash) làm tăng đáng kể tỷ lệ dữ liệu chất lượng thấp trong các đợt crawl cũ nhất, chúng tôi đã tính toán các chỉ số trên cả phiên bản loại trùng MinHash độc lập (independently MinHashed) và phiên bản loại trùng MinHash toàn cục (chất lượng kém hơn) của các đợt crawl `2013-48` và `2015-22` (hai đợt crawl cũ hơn). Sau đó, chúng tôi so sánh các số liệu thống kê ở cấp độ vĩ mô bằng cách xem xét phân phối của các chỉ số này cho từng phiên bản.

Có lẽ không quá ngạc nhiên dựa trên các phát hiện của chúng tôi về việc loại bỏ trùng lặp (deduplication), chúng tôi đã tìm thấy sự khác biệt đáng kể ở hầu hết các chỉ số giữa hai phương pháp loại trùng. Ví dụ, chỉ số tỷ lệ ký tự dòng trùng lặp `line-char-duplicates` (số ký tự trong các dòng trùng lặp / tổng số ký tự) đã tăng gần gấp đôi từ loại trùng độc lập (0,0053 đối với đợt `2015-22` và 0,0058 đối với đợt `2013-48`) lên loại trùng toàn cục (0,011 đối với đợt `2015-22` và 0,01 đối với đợt `2013-48`), cho thấy phương pháp sau có mức độ lặp lại giữa các tài liệu cao hơn.

Việc tuân theo quy trình liệt kê ở trên cho các tập dữ liệu này đã tạo ra **17** cặp chỉ số - ngưỡng ứng viên. Trong hình ảnh bên dưới, bạn có thể thấy ba trong số các biểu đồ tần suất này:

<div className="main-plot-container">
  <figure>
    <img src="https://huggingface.co/datasets/HuggingFaceFW/fineweb/resolve/main/blog/assets/images/stats.png" alt="Các biểu đồ thống kê phân phối" />
  </figure>
  <div id="plot-stats"></div>
</div>

Ví dụ, chúng tôi đã kiểm tra biểu đồ tần suất của "tỷ lệ các dòng kết thúc bằng dấu câu" (xem hình trên) và quan sát thấy mật độ tài liệu tăng lên của phương pháp loại trùng toàn cục (global MinHash) ở khoảng 0,12. Sau đó, chúng tôi lọc với ngưỡng này và nhận thấy dữ liệu bị loại bỏ chứa lượng lớn các danh sách ngắn hoặc chỉ bao gồm văn bản bố cục tài liệu (chẳng hạn như "Home", "Sign up", v.v.).

Sau đó, chúng tôi đánh giá hiệu quả của 17 bộ lọc mới tạo này bằng cách thực hiện một số lượt chạy thử nghiệm loại trừ (ablation runs) quy mô **28 tỷ token** trên đợt crawl `2019-18`. Trong tất cả các lượt chạy đó, chúng tôi đã xác định được **3** bộ lọc (dựa trên các biểu đồ tần suất ở trên) đem lại những cải thiện đáng kể nhất cho điểm số tổng hợp:

- **Loại bỏ các tài liệu có tỷ lệ các dòng kết thúc bằng dấu câu &le; 0,12** (loại bỏ 10,14% token) — so với mức 30% từ bộ lọc dấu câu kết thúc gốc của C4.
- **Loại bỏ các tài liệu có tỷ lệ ký tự trong các dòng trùng lặp &ge; 0,1** (loại bỏ 12,47% token) — ngưỡng gốc của MassiveText cho tỷ lệ này là &ge; 0,2.
- **Loại bỏ các tài liệu có tỷ lệ các dòng ngắn hơn 30 ký tự &ge; 0,67** (loại bỏ 3,73% token).
- **Khi áp dụng cả ba bộ lọc này cùng nhau**, khoảng ~22% lượng token đã bị loại bỏ.

<div className="main-plot-container">
  <figure>
    <img src="https://huggingface.co/datasets/HuggingFaceFW/fineweb/resolve/main/blog/assets/images/custom_filters.png" alt="Hiệu quả của các bộ lọc tùy chỉnh" />
  </figure>
  <div id="plot-custom_filters"></div>
</div>

Các bộ lọc này cho phép chúng tôi cải thiện hơn nữa hiệu suất và đặc biệt là vượt qua hiệu suất của tập dữ liệu C4, đồng thời vẫn cung cấp một tập dữ liệu có kích thước lớn hơn nhiều.
