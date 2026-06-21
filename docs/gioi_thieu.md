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

Hiệu suất của một LLM phụ thuộc rất lớn vào chất lượng và kích thước tập dữ liệu pretraining. Tuy nhiên, tập dữ liệu pretraining của các LLM mở hàng đầu như Llama 3 hay Mixtral đều không được công bố — và chúng ta biết rất ít về cách chúng được xây dựng.

> ⏱️ **Thời gian đọc:** 45 phút. Để có trải nghiệm đọc tốt nhất, nên đọc trên máy tính thay vì điện thoại.

Gần đây, chúng tôi đã phát hành [**🍷 FineWeb**](https://huggingface.co/datasets/HuggingFaceFW/fineweb) — tập dữ liệu pretraining quy mô lớn với **15 nghìn tỷ token, dung lượng 44TB**. FineWeb được xây dựng từ 96 snapshot của CommonCrawl và cho thấy **hiệu suất mô hình tốt hơn so với các tập dữ liệu pretraining mở hiện có**. Nhằm thúc đẩy tính minh bạch trong machine learning, chúng tôi ghi chép đầy đủ mọi lựa chọn thiết kế của FineWeb — bao gồm các nghiên cứu chuyên sâu về chiến lược deduplication và filtering. Báo cáo kỹ thuật này trình bày chi tiết cách xây dựng một tập dữ liệu web-scale chất lượng cao cho pretraining LLM. Tập dữ liệu 🍷 FineWeb có thể tải xuống tại [đây](https://huggingface.co/datasets/HuggingFaceFW/fineweb).

> [!NOTE]
> 📝 **Ghi chú**
> Chúng tôi vô cùng biết ơn toàn bộ đội ngũ [distill.pub](https://distill.pub/) — đặc biệt là Christopher Olah, Shan Carter và Ludwig Schubert — vì đã tạo ra template làm nền tảng cho bài viết này, cũng như đã truyền cảm hứng qua những bài báo được biên soạn vô cùng công phu.

Báo cáo này cũng giới thiệu [**📚 FineWeb-Edu**](https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu) — một subset của FineWeb, được lọc bằng cách gán nhãn chất lượng giáo dục tự động và có thể mở rộng quy mô. Tập dữ liệu này vượt trội hơn tất cả các tập dữ liệu web mở hiện có trên một loạt benchmark giáo dục như MMLU, ARC và OpenBookQA.

[📚 FineWeb-Edu](https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu) có hai phiên bản: **1,3 nghìn tỷ token** (nội dung có giá trị giáo dục rất cao) và **5,4 nghìn tỷ token** (nội dung có giá trị giáo dục cao), tất cả đo bằng tokenizer GPT2. Tải xuống tại [đây](https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu).

Cả hai tập dữ liệu đều được phát hành theo giấy phép [ODC-By 1.0](https://opendatacommons.org/licenses/by/1-0/).

**Tóm tắt (TLDR):** Bài viết trình bày quy trình xử lý và đánh giá chất lượng dữ liệu ở quy mô lớn, công thức xây dựng 🍷 FineWeb (kèm giải thích toàn bộ các lựa chọn thiết kế), và quy trình tạo ra subset 📚 FineWeb-Edu.
