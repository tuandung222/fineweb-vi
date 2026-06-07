# AGENT.md — Tiêu chuẩn Dịch thuật Kỹ thuật Báo cáo FineWeb sang Tiếng Việt

## Mục đích

Tài liệu này quy định **quy chuẩn dịch thuật và tiêu chuẩn làm việc** cho tất cả các sub-agents tham gia vào dự án dịch báo cáo kỹ thuật **"FineWeb: decanting the web for the finest text data at scale"** từ Hugging Face sang tiếng Việt (`fineweb-vi`). Mọi agent **PHẢI** đọc và tuân thủ các hướng dẫn này trước khi thực hiện bất kỳ thao tác chỉnh sửa nào.

---

## 1. Định hướng Tư duy & Phong cách Viết (Persona)

### Giọng văn (Tone & Voice)
* **Chuyên nghiệp, chính xác và có tính học thuật cao:** Diễn đạt như một kỹ sư dữ liệu lớn hoặc chuyên gia huấn luyện LLM chia sẻ các nghiên cứu khoa học thực nghiệm.
* **Dịch thoát ý (Free Translation):** Ưu tiên sự mạch lạc và tự nhiên trong văn phong tiếng Việt công nghệ, tránh dịch từng từ máy móc (literal translation).
* **Cấu trúc tiếp cận bài toán:** Khi giải thích các vấn đề phức tạp, luôn đi theo chuỗi logic: **Bối cảnh → Xung đột hệ thống → Giải thích toán học/logic → Minh họa bằng code/config**.

### Nguyên tắc bảo toàn
* **KHÔNG** dịch các đoạn code, cú pháp lập trình, tên tệp tin, hoặc cấu hình.
* **KHÔNG** làm mất hoặc dịch sai các công thức toán học LaTeX.
* **KHÔNG** tự ý thêm thông tin nằm ngoài phạm vi bài viết gốc.

---

## 2. Quy chuẩn Thuật ngữ Kỹ thuật (Glossary)

Để đảm bảo tính nhất quán trên toàn bộ tài liệu, các thuật ngữ sau đây cần được xử lý thống nhất:

### 2.1. LUÔN giữ nguyên tiếng Anh (Không dịch)
Các thuật ngữ công nghệ, tên thư viện hoặc tên mô hình:
```text
CommonCrawl, datatrove, nanotron, lighteval, MinHash, Llama, Mixtral, Phi3,
Snowflake-arctic-embed, GPT2, Web, HTML, URL, GPU, H100, CPU, API,
few-shot, zero-shot, multi-choice, free-form, F1 score, token, tokenizer,
embeddings, dataset, JSON, YAML, Python, bash, regex, blocklist, fastText,
WARC, WET, Chinchilla, Megatron-LM, DeepSpeed, sitemap, robots.txt, BibTeX
```

### 2.2. Dịch + Giữ gốc trong ngoặc (Đối với lần đầu xuất hiện)
Các thuật ngữ kỹ thuật cần được giải thích nghĩa tiếng Việt khi xuất hiện lần đầu trong mỗi chương:
```text
pretraining → tiền huấn luyện / huấn luyện tiền đề (pretraining)
deduplication → loại bỏ trùng lặp / loại trùng (deduplication)
data curation → thu thập và lọc dữ liệu (data curation)
ablation → thử nghiệm loại trừ / ablation study (ablation)
perplexity → độ hỗn loạn (perplexity)
downstream tasks → nhiệm vụ xuôi dòng / bài toán ứng dụng thực tế (downstream tasks)
base filtering → bộ lọc cơ bản (base filtering)
repetition filter → bộ lọc lặp (repetition filter)
document-level → cấp độ tài liệu (document-level)
line-level → cấp độ dòng (line-level)
Wasserstein distance → khoảng cách Wasserstein (Wasserstein distance)
synthetic data → dữ liệu tổng hợp / dữ liệu nhân tạo (synthetic data)
ground-truth → nhãn chuẩn / ground-truth (ground-truth)
fuzzy deduplication → loại trùng mờ (fuzzy deduplication)
exact deduplication → loại trùng khớp chính xác (exact deduplication)
intra-document deduplication → loại trùng lặp trong cùng tài liệu (intra-document deduplication)
cross-dump deduplication → loại trùng lặp chéo giữa các đợt crawl (cross-dump deduplication)
boilerplate → nội dung rác định dạng / boilerplate (boilerplate)
```

### 2.3. Dịch hoàn toàn sang tiếng Việt
Các từ vựng thông dụng và dễ hiểu trong ngữ cảnh học thuật:
```text
model → mô hình
methodology → phương pháp luận
accuracy → độ chính xác
performance → hiệu suất
metric → thước đo / chỉ số
reproduce → tái lập
reproducible → có thể tái lập
result → kết quả
table → bảng
chart / graph → biểu đồ
chapter → chương
technical report → báo cáo kỹ thuật
error / bug → lỗi
```

---

## 3. Định dạng và Cấu trúc MDX

### 3.1. Frontmatter YAML bắt buộc
Mỗi tệp Markdown trong Docusaurus phải bắt đầu bằng:
```yaml
---
sidebar_position: <thứ tự trong thư mục>
sidebar_label: '<tên ngắn gọn bằng tiếng Việt>'
---
```

### 3.2. Admonitions (Hộp thông tin)
Không sử dụng cú pháp Docusaurus cũ (`:::type`), bắt buộc sử dụng định dạng GFM Alerts chuẩn:
```markdown
> [!NOTE]
> 📝 **Ghi chú**
> Nội dung...

> [!TIP]
> 💡 **Mẹo**
> Nội dung...

> [!IMPORTANT]
> ⚠️ **Quan trọng**
> Nội dung...

> [!WARNING]
> ⚠️ **Cảnh báo**
> Nội dung...
```

### 3.3. MDX Safety (Thoát ký tự đặc biệt)
Tránh lỗi parse MDX đối với các ký tự `<` và `>` bên ngoài các khối code block:
* Sử dụng `&lt;` cho ký tự bé hơn (`<`).
* Sử dụng `&gt;` cho ký tự lớn hơn (`>`).
* Ví dụ: viết `mô hình có kích thước &lt;2B` thay vì `mô hình có kích thước <2B`.

### 3.4. Liên kết nội bộ (Links)
Đồng bộ hóa các liên kết nội bộ theo cấu trúc thư mục mới của Docusaurus tiếng Việt, sử dụng đường dẫn tuyệt đối bắt đầu bằng `/docs/` và bỏ phần mở rộng `.md` (Ví dụ: `/docs/web-data/du_lieu_cc`).

### 3.5. Cấu hình Slug cho Danh mục (Category Slugs)
Để tránh Docusaurus v4 tự động sinh slug bằng tiếng Việt có dấu/gạch nối bị lỗi liên kết, mọi file `_category_.json` phải định nghĩa rõ ràng `slug` tiếng Anh không dấu dạng `kebab-case`.
Ví dụ:
```json
{
  "label": "Dữ liệu Web & Nền tảng",
  "position": 1,
  "link": {
    "type": "generated-index",
    "slug": "/category/web-data"
  }
}
```

---

## 4. Phân chia Chương và Tên tệp tin (Naming Convention)

Dự án dịch sẽ được tổ chức theo cấu trúc thư mục Docusaurus như sau:

```text
docs/
├── gioi_thieu.md                                  # Giới thiệu tổng quan báo cáo kỹ thuật
├── web-data/                                      # DANH MỤC 1: Dữ liệu Web & Nền tảng
│   ├── _category_.json
│   ├── du_lieu_cc.md                              # 1.1. Thu thập dữ liệu thô (CommonCrawl)
│   ├── xu_ly_datatrove.md                         # 1.2. Thư viện datatrove xử lý quy mô lớn
│   ├── tieu_chi_chat_luong.md                     # 1.3. Định nghĩa chất lượng dữ liệu pretraining
│   └── ablation_evaluation.md                     # 1.4. Thiết lập thí nghiệm (nanotron + lighteval)
├── fineweb-recipe/                                # DANH MỤC 2: Công thức chế biến FineWeb
│   ├── _category_.json
│   ├── trich_xuat_van_ban.md                      # 2.1. Trích xuất văn bản: WARC vs WET
│   ├── loc_co_ban.md                              # 2.2. Các bộ lọc cơ bản (fastText, URL blocklists)
│   ├── loai_trung_minhash.md                      # 2.3. Loại trùng MinHash & Siêu tham số
│   ├── nghich_ly_loai_trung.md                    # 2.4. Nghịch lý loại trùng (Global vs Individual)
│   ├── phuong_phap_khac_that_bai.md               # 2.5. Các thử nghiệm loại trùng toàn cục thất bại
│   ├── loc_chat_luong_c4.md                       # 2.6. Thừa hưởng bộ lọc chất lượng của C4
│   ├── tiep_can_thong_ke.md                       # 2.7. Tối ưu hóa bộ lọc bằng khoảng cách Wasserstein
│   └── bo_recipe_hoan_chinh.md                    # 2.8. Bộ công thức hoàn chỉnh & So sánh đối sánh
├── fineweb-edu/                                   # DANH MỤC 3: FineWeb-Edu (Phiên bản Giáo dục)
│   ├── _category_.json
│   ├── khai_niem_edu.md                           # 3.1. Ý tưởng phân loại điểm giáo dục
│   ├── gan_nhan_llama3.md                         # 3.2. Gán nhãn quy mô lớn bằng Llama-3-70B
│   ├── huan_luyen_phan_loai.md                    # 3.3. Huấn luyện mô hình phân loại chất lượng
│   └── loc_va_ket_qua.md                          # 3.4. Đánh giá kết quả lọc giáo dục (FineWeb-Edu)
└── commoncrawl-temporal/                          # DANH MỤC 4: Biến động CC & Dữ liệu Tổng hợp
    ├── _category_.json
    ├── hieu_suat_theo_crawl.md                    # 4.1. Hiệu suất mô hình biến động theo từng đợt crawl
    └── du_lieu_tong_hop.md                        # 4.2. Dấu chân của dữ liệu tổng hợp (ChatGPT proxy words)
```

---

## 5. Quy trình Kiểm tra và Báo cáo (Checklist)

Từng agent dịch thuật và QA phải thực hiện kiểm duyệt trước khi đẩy mã nguồn:
- [ ] Tệp tin có đầy đủ phần YAML frontmatter và hiển thị chính xác trên thanh điều hướng.
- [ ] Không chứa ký tự `<` hoặc `>` trần ngoài code block (sử dụng `&lt;` và `&gt;`).
- [ ] Giữ nguyên 100% công thức toán học LaTeX và các khối mã nguồn gốc.
- [ ] Các thuật ngữ kỹ thuật tuân thủ Glossary trong phần 2.
- [ ] Mọi liên kết nội bộ hướng đến đúng URL dạng `/docs/path/to/page` (không dùng đuôi `.md` nếu dùng link tuyệt đối của trang).
- [ ] Đảm bảo tất cả danh mục đều có file `_category_.json` với trường `slug` tiếng Anh.
- [ ] Chạy `npm run build` thành công, đạt kết quả **0 warnings và 0 errors** liên quan đến broken links hay MDX parsing trước khi push lên main.
