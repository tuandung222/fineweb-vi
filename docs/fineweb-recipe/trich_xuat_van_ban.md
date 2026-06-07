---
sidebar_position: 1
sidebar_label: 'Trích xuất Văn bản'
---

# Công thức chế biến 🍷 FineWeb

Trong các phần tiếp theo, chúng tôi sẽ giải thích chi tiết từng bước được thực hiện để tạo ra tập dữ liệu (dataset) FineWeb.

![Quy trình FineWeb](https://huggingfacefw-blogpost-fineweb-v1.static.hf.space/assets/images/fineweb-recipe.png)

> [!TIP]
> Bạn có thể tìm thấy cấu hình `datatrove` hoàn chỉnh để tái lập kết quả [tại đây](https://github.com/huggingface/datatrove/blob/main/examples/fineweb.py).

### Điểm khởi đầu: Trích xuất văn bản

Dữ liệu CommonCrawl được cung cấp dưới hai định dạng chính: WARC và WET. **WARC** (Web ARChive format) chứa dữ liệu thô từ quá trình thu thập dữ liệu (crawl), bao gồm mã HTML của toàn bộ trang web và siêu dữ liệu (metadata) của yêu cầu. Các tệp **WET** (WARC Encapsulated Text) cung cấp phiên bản chỉ chứa văn bản của các trang web đó.

Rất nhiều tập dữ liệu hiện nay chọn các tệp WET làm điểm khởi đầu. Tuy nhiên, theo kinh nghiệm của chúng tôi, phương pháp trích xuất văn bản mặc định mà CommonCrawl sử dụng để tạo ra các tệp WET này chưa tối ưu cho mục tiêu tiền huấn luyện (pretraining)[^1] mô hình ngôn ngữ lớn (LLM). Hiện nay, có nhiều thư viện mã nguồn mở khác cung cấp khả năng trích xuất văn bản tốt hơn. Chúng tôi đã trích xuất nội dung văn bản từ các tệp WARC bằng thư viện `trafilatura`[^trafilatura], vốn cho kết quả trích xuất chất lượng tốt qua đánh giá cảm quan khi so sánh với các thư viện khác.

> [!NOTE]
> Bạn có thể xem bảng so sánh đối sánh (benchmark) giữa các thư viện trích xuất văn bản khác nhau [tại đây](https://github.com/scrapinghub/article-extraction-benchmark/blob/master/README.rst).

Để kiểm chứng quyết định này, chúng tôi đã xử lý đợt crawl (dump) `2019-18` bằng hai cách: trực tiếp sử dụng các tệp WET và sử dụng văn bản được trích xuất từ tệp WARC qua thư viện `trafilatura`[^trafilatura_opts]. Chúng tôi áp dụng cùng một quy trình xử lý cho cả hai phiên bản (bao gồm bộ lọc cơ bản (base filtering) + loại trùng MinHash, chi tiết bên dưới) rồi huấn luyện hai mô hình. Mặc dù tập dữ liệu thu được từ dữ liệu WET có kích thước lớn hơn khoảng 25% (khoảng 254 tỷ token), chất lượng của nó lại kém hơn nhiều so với phiên bản sử dụng dữ liệu WARC được trích xuất bằng `trafilatura` (khoảng 200 tỷ token). Việc kiểm tra trực quan một số mẫu dữ liệu xác nhận rằng phần lớn lượng token dư thừa trong các tệp WET là nội dung rác định dạng / boilerplate (boilerplate) không cần thiết từ trang web.

Tuy nhiên, cần lưu ý rằng trích xuất văn bản là một trong những bước tốn kém tài nguyên nhất trong quy trình xử lý của chúng tôi. Do đó, việc sử dụng trực tiếp các tệp dữ liệu WET sẵn có có thể là một phương án đánh đổi hợp lý đối với các nhóm có ngân sách hạn chế.

![So sánh WARC/trafilatura và WET](https://huggingfacefw-blogpost-fineweb-v1.static.hf.space/assets/images/wet_comparison.png)

[^1]: Cụ thể, chúng tôi nghi ngờ rằng phương pháp này giữ lại quá nhiều nội dung rác định dạng / boilerplate (boilerplate) và các menu điều hướng.
[^trafilatura]: Barbaresi, A. (2021). Trafilatura: A Web Scraping Library and Command-Line Tool for Text Extraction.
[^trafilatura_opts]: Chúng tôi đã sử dụng các tùy chọn mặc định của `trafilatura` với tham số `favour_precision=True`.
