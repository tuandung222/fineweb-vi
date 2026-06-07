---
sidebar_position: 1
sidebar_label: 'Giới thiệu'
---

# 🍷 FineWeb: Chắt lọc mạng web để thu được dữ liệu văn bản chất lượng nhất ở quy mô lớn

**Tác giả:**
- [Guilherme Penedo](https://huggingface.co/guipenedo)
- [Hynek Kydlíček](https://huggingface.co/hynky)
- [Loubna Ben Allal](https://huggingface.co/loubnabnl)
- [Anton Lozhkov](https://huggingface.co/anton-l)
- [Colin Raffel](https://huggingface.co/craffel)
- [Leandro Werra](https://huggingface.co/lvwerra)
- [Thomas Wolf](https://huggingface.co/thomwolf)

*Tổ chức: Hugging Face*  
*Công bố: 28 tháng 5, 2024*

---

Hiệu suất của một mô hình ngôn ngữ lớn (LLM) phụ thuộc rất nhiều vào chất lượng và kích thước của tập dữ liệu tiền huấn luyện (pretraining) của nó. Tuy nhiên, các tập dữ liệu pretraining của những LLM mở tiên tiến nhất (state-of-the-art open LLMs) như Llama 3 và Mixtral lại không được công bố công khai, và chúng ta biết rất ít về cách chúng được tạo ra.

> ⏱️ **Thời gian đọc:** 45 phút. Để có trải nghiệm đọc tốt nhất, chúng tôi khuyên bạn không nên sử dụng điện thoại di động.

Gần đây, chúng tôi đã phát hành [**🍷 FineWeb**](https://huggingface.co/datasets/HuggingFaceFW/fineweb), một tập dữ liệu mới, quy mô lớn (**15 nghìn tỷ token, dung lượng ổ đĩa 44TB**) dành cho tiền huấn luyện (pretraining) LLM. FineWeb được xây dựng từ 96 bản sao lưu (snapshot) CommonCrawl và giúp tạo ra các **mô hình có hiệu suất tốt hơn so với các tập dữ liệu pretraining mở khác**. Để mang lại sự minh bạch hơn trong lĩnh vực học máy (machine learning) và thúc đẩy sự hiểu biết chung mang tính mở về cách huấn luyện các mô hình ngôn ngữ lớn đạt chất lượng tốt, chúng tôi đã ghi chép lại một cách cẩn thận và thực hiện thử nghiệm loại trừ (ablation) đối với tất cả các lựa chọn thiết kế được sử dụng trong FineWeb, bao gồm cả các nghiên cứu chuyên sâu về chiến lược loại bỏ trùng lặp (deduplication) và lọc dữ liệu (filtering). Báo cáo kỹ thuật (technical report) chi tiết này đi sâu nghiên cứu cách tạo ra một tập dữ liệu quy mô web (web-scale) lớn và chất lượng cao cho pretraining LLM. Bản thân tập dữ liệu, 🍷 FineWeb, hiện đã có thể tải xuống tại [đây](https://huggingface.co/datasets/HuggingFaceFW/fineweb).

> [!NOTE]
> 📝 **Ghi chú**
> Chúng tôi vô cùng biết ơn toàn bộ đội ngũ [distill.pub](https://distill.pub/) (đặc biệt là Christopher Olah, Shan Carter, Ludwig Schubert) vì đã tạo ra bản mẫu thiết kế (template) mà chúng tôi sử dụng làm nền tảng cho bài viết này. Xin cảm ơn vì đã truyền cảm hứng cho chúng tôi bằng những bài báo và bài viết được biên soạn vô cùng công phu.

Trong báo cáo kỹ thuật này, chúng tôi cũng giới thiệu [**📚 FineWeb-Edu**](https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu), một tập con (subset) của FineWeb được xây dựng bằng cách sử dụng các nhãn gán chất lượng cao tự động và có khả năng mở rộng để đánh giá giá trị giáo dục. Tập dữ liệu này vượt qua tất cả các tập dữ liệu web mở hiện có trên một loạt các bài đánh giá (benchmark) giáo dục như MMLU, ARC, và OpenBookQA.

[📚 FineWeb-Edu](https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu) hiện có sẵn ở hai kích thước/mức độ lọc: **1,3 nghìn tỷ token (nội dung giáo dục cực kỳ cao)** và **5,4 nghìn tỷ token (nội dung giáo dục cao)** (tất cả các token đều được đo lường bằng bộ phân tách từ (tokenizer) GPT2). Bạn có thể tải xuống tập dữ liệu này tại [đây](https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu).

Cả hai tập dữ liệu đều được phát hành theo giấy phép [ODC-By 1.0](https://opendatacommons.org/licenses/by/1-0/) cho phép tự do sử dụng.

**Tóm tắt nhanh (TLDR):** Bài viết này thảo luận về việc xử lý và đánh giá chất lượng dữ liệu ở quy mô lớn, công thức (recipe) 🍷 FineWeb (liệt kê và giải thích tất cả các lựa chọn thiết kế của chúng tôi), và quy trình được thực hiện để tạo ra tập con 📚 FineWeb-Edu của nó.
