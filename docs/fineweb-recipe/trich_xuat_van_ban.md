---
sidebar_position: 1
sidebar_label: 'Trích xuất Văn bản'
---

# Công thức chế biến 🍷 FineWeb

Trong các phần tiếp theo, chúng tôi sẽ giải thích chi tiết từng bước được thực hiện để tạo ra FineWeb.

![Quy trình FineWeb](https://huggingfacefw-blogpost-fineweb-v1.static.hf.space/assets/images/fineweb-recipe.png)

> [!TIP]
> Bạn có thể tìm thấy cấu hình `datatrove` hoàn chỉnh để tái lập kết quả [tại đây](https://github.com/huggingface/datatrove/blob/main/examples/fineweb.py).

### Điểm khởi đầu: Trích xuất văn bản

Dữ liệu CommonCrawl được cung cấp dưới hai định dạng: WARC và WET. **WARC** (Web ARChive format) chứa dữ liệu thô từ quá trình crawl, bao gồm HTML của toàn bộ trang web và metadata của request. Các file **WET** (WARC Encapsulated Text) cung cấp phiên bản chỉ chứa văn bản.

Nhiều tập dữ liệu hiện nay chọn file WET làm điểm khởi đầu. Tuy nhiên, theo kinh nghiệm của chúng tôi, phương pháp trích xuất văn bản mặc định của CommonCrawl khi tạo file WET chưa tối ưu cho pretraining[^1] LLM. Hiện có nhiều thư viện mã nguồn mở cho kết quả tốt hơn. Chúng tôi đã trích xuất văn bản từ file WARC bằng thư viện `trafilatura`[^trafilatura], vốn cho kết quả tốt qua đánh giá cảm quan khi so sánh với các thư viện khác.

> [!NOTE]
> Bạn có thể xem bảng so sánh các thư viện trích xuất văn bản [tại đây](https://github.com/scrapinghub/article-extraction-benchmark/blob/master/README.rst).

Để kiểm chứng quyết định này, chúng tôi xử lý dump `2019-18` theo hai cách: dùng trực tiếp file WET và dùng văn bản được trích xuất từ WARC qua `trafilatura`[^trafilatura_opts]. Chúng tôi áp dụng cùng quy trình xử lý cho cả hai (base filtering + MinHash deduplication) rồi huấn luyện hai mô hình. Dù tập từ WET lớn hơn khoảng 25% (~254 tỷ token), chất lượng lại kém hơn nhiều so với phiên bản từ WARC qua `trafilatura` (~200 tỷ token). Kiểm tra trực quan xác nhận rằng phần lớn token dư trong WET là boilerplate không cần thiết từ trang web.

Cần lưu ý rằng trích xuất văn bản là một trong những bước tốn kém tài nguyên nhất trong quy trình. Vì vậy, dùng trực tiếp file WET có thể là đánh đổi hợp lý cho các nhóm có ngân sách hạn chế.

![So sánh WARC/trafilatura và WET](https://huggingfacefw-blogpost-fineweb-v1.static.hf.space/assets/images/wet_comparison.png)

[^1]: Cụ thể, chúng tôi nghi ngờ rằng phương pháp này giữ lại quá nhiều boilerplate và menu điều hướng.
[^trafilatura]: Barbaresi, A. (2021). Trafilatura: A Web Scraping Library and Command-Line Tool for Text Extraction.
[^trafilatura_opts]: Chúng tôi đã dùng các tùy chọn mặc định của `trafilatura` với tham số `favour_precision=True`.
