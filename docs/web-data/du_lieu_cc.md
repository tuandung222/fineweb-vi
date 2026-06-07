---
sidebar_position: 1
sidebar_label: 'Thu thập CommonCrawl'
---

# Dữ liệu Web

## Tìm kiếm dữ liệu thô

Một câu hỏi phổ biến thường gặp về các tập dữ liệu web được sử dụng để huấn luyện mô hình ngôn ngữ lớn (LLM) là "họ lấy tất cả số dữ liệu đó từ đâu?". Nhìn chung sẽ có hai lựa chọn:

* Bạn tự mình thu thập dữ liệu (crawl), giống như cách các công ty như OpenAI hay Anthropic (và các bên khác) đang thực hiện (xem tại [đây](https://platform.openai.com/docs/gptbot) và [đây](https://darkvisitors.com/agents/claudebot)).
* Bạn sử dụng kho lưu trữ công cộng của các trang web đã được thu thập, chẳng hạn như kho lưu trữ do tổ chức phi lợi nhuận [CommonCrawl](https://commoncrawl.org/) duy trì.

Để xây dựng 🍷 FineWeb, tiếp nối những gì các đội ngũ huấn luyện LLM đã thực hiện trước đây, chúng tôi sử dụng CommonCrawl (CC) làm điểm khởi đầu. Tổ chức phi lợi nhuận Common Crawl đã tiến hành thu thập dữ liệu web từ năm 2007 và phát hành các đợt crawl mới chứa từ 200 đến 400 TiB nội dung văn bản thu được qua quá trình thu thập web tự động, thường là sau mỗi 1 hoặc 2 tháng.

Ví dụ, đợt crawl CC gần đây nhất (tháng 4 năm 2024) chứa 2,7 tỷ trang web, với tổng cộng 386 TiB nội dung văn bản HTML chưa nén[^1]. Đã có 96 đợt crawl được phát hành kể từ năm 2013 và 3 đợt crawl từ năm 2008 đến năm 2012 vốn sử dụng định dạng khác (cũ hơn)[^2].

[^1]: Lưu ý rằng kích thước thay đổi theo từng đợt crawl. Lưu ý thêm rằng chúng tôi sử dụng hai từ "dump" (bản sao lưu) và "crawl" (đợt crawl) thay thế cho nhau trong báo cáo kỹ thuật này.
[^2]: Chúng tôi không xử lý 3 đợt crawl cũ này.
