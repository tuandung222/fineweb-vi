---
sidebar_position: 1
sidebar_label: 'Thu thập CommonCrawl'
---

# Dữ liệu Web

## Tìm kiếm dữ liệu thô

Câu hỏi thường gặp về các tập dữ liệu web dùng để huấn luyện LLM là "dữ liệu đó lấy từ đâu?". Nhìn chung có hai hướng:

* Tự thu thập dữ liệu (crawl), như cách OpenAI hay Anthropic đang làm (xem tại [đây](https://platform.openai.com/docs/gptbot) và [đây](https://darkvisitors.com/agents/claudebot)).
* Dùng kho lưu trữ công khai các trang web đã được thu thập sẵn, chẳng hạn kho lưu trữ của tổ chức phi lợi nhuận [CommonCrawl](https://commoncrawl.org/).

Để xây dựng 🍷 FineWeb, chúng tôi dùng CommonCrawl (CC) làm điểm khởi đầu — cách tiếp cận phổ biến trong các đội ngũ huấn luyện LLM trước đây. CommonCrawl thu thập dữ liệu web từ năm 2007 và thường xuyên phát hành các đợt crawl mới chứa từ 200 đến 400 TiB văn bản, thường 1–2 tháng một lần.

Ví dụ, đợt crawl gần nhất (tháng 4/2024) chứa 2,7 tỷ trang web với tổng cộng 386 TiB HTML chưa nén[^1]. Tính từ năm 2013, đã có 96 đợt crawl được phát hành; ngoài ra còn 3 đợt từ năm 2008–2012 dùng định dạng cũ hơn[^2].

[^1]: Kích thước thay đổi theo từng đợt crawl. Trong báo cáo này, chúng tôi dùng "dump" và "crawl" thay thế cho nhau.
[^2]: Chúng tôi không xử lý 3 đợt crawl cũ này.
