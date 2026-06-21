---
sidebar_position: 8
sidebar_label: 'Recipe Hoàn chỉnh'
---

## Tập dữ liệu 🍷 FineWeb hoàn chỉnh

Tập dữ liệu 🍷 FineWeb cuối cùng gồm 15 nghìn tỷ (15T) token, được xây dựng qua các bước sau — mỗi bước đều mang lại cải thiện hiệu suất trên bộ benchmark:

- Base filtering
- Independent MinHash deduplication trên từng dump
- Một số bộ lọc C4 được chọn lọc
- Các bộ lọc tùy chỉnh của chúng tôi (đã đề cập ở phần trước)

<div className="main-plot-container">
  <figure>
    <img src="https://huggingface.co/datasets/HuggingFaceFW/fineweb/resolve/main/blog/assets/images/filtering_steps.png" alt="Các bước lọc của FineWeb" />
  </figure>
  <div id="plot-all_filtering_steps"></div>
</div>

### So sánh với các tập dữ liệu web-scale khác

Chúng tôi so sánh 🍷 FineWeb với các tập dữ liệu sau — thường được coi là các tập dữ liệu web-scale chất lượng cao nhất có thể truy cập công khai (kèm số token xấp xỉ của phiên bản công khai):

- [RefinedWeb](https://huggingface.co/datasets/tiiuae/falcon-refinedweb)[^penedo2023refinedweb] (500 tỷ token)
- [C4](https://huggingface.co/datasets/allenai/c4)[^raffel2023exploring] (172 tỷ token)
- [Dolma v1.6](https://huggingface.co/datasets/allenai/dolma)[^dolma] (3 nghìn tỷ token) (phần CommonCrawl)[^dolma_footnote]
- [The Pile](https://huggingface.co/datasets/EleutherAI/pile)[^gao2020pile] (340 tỷ token)
- [SlimPajama](https://huggingface.co/datasets/cerebras/SlimPajama-627B)[^cerebras2023slimpajama] (627 tỷ token)
- [RedPajama2](https://huggingface.co/datasets/togethercomputer/RedPajama-Data-V2)[^together2023redpajama] (20 nghìn tỷ token, đã deduplication)
- Và tập dữ liệu mới **🍷 FineWeb** (15 nghìn tỷ token) (được giới thiệu trong báo cáo này).

Các ablation model được huấn luyện trên 350 tỷ token đã được công bố công khai trong [bộ sưu tập này](https://huggingface.co/collections/HuggingFaceFW/ablation-models-662457b0d213e8c14fe47f32), với checkpoint được tải lên sau mỗi 1000 bước. Bạn cũng có thể xem đầy đủ [kết quả đánh giá tại đây](https://huggingface.co/datasets/HuggingFaceFW/fineweb/blob/main/eval_results.csv).

<div className="main-plot-container">
  <figure>
    <img src="https://huggingface.co/datasets/HuggingFaceFW/fineweb/resolve/main/blog/assets/images/dataset_ablations.png" alt="Biểu đồ so sánh giữa các tập dữ liệu" />
  </figure>
  <div id="plot-dataset_ablations"></div>
</div>

Theo hiểu biết của chúng tôi, 🍷 FineWeb hiện là tập dữ liệu mở mang lại hiệu suất mô hình cao nhất, trong khi vẫn cho phép huấn luyện ở quy mô hàng nghìn tỷ token.

[^penedo2023refinedweb]: Penedo et al., "The RefinedWeb Dataset for Falcon LLM: Outperforming Refined Human-Curated Corpora with Web Data, and Web Data Only".
[^raffel2023exploring]: Raffel et al., "Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer".
[^dolma]: Soldaini et al., "Dolma: an Open Corpus of Three Trillion Tokens for LLM Pretraining Research".
[^gao2020pile]: Gao et al., "The Pile: An Anisotropic 800GB Toy Dataset of Diverse Text for Language Modeling".
[^cerebras2023slimpajama]: Cerebras, "SlimPajama-627B: An Open-Source, Cleaned, and Deduplicated Version of RedPajama-Data-1T".
[^together2023redpajama]: Together Computer, "RedPajama-Data-V2: An Open Dataset for Training Large Language Models".
[^dolma_footnote]: Có phiên bản Dolma mới hơn là v1.7, nhưng kích thước nhỏ hơn.
