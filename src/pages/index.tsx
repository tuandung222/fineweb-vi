import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Báo cáo Kỹ thuật FineWeb VI`}
      description="Bản dịch tiếng Việt hoàn chỉnh của FineWeb Technical Report từ Hugging Face.">
      
      {/* Hero Section */}
      <header className="custom-hero">
        <div className="container">
          <div className="hero-badge">Bản dịch tiếng Việt • Hugging Face</div>
          <Heading as="h1" className="gradient-title">
            Báo cáo Kỹ thuật FineWeb 🍷
          </Heading>
          <p className="hero-tagline">
            Decanting the web for the finest text data at scale — Cẩm nang xử lý, lọc sạch và loại bỏ trùng lặp dữ liệu quy mô lớn (15 nghìn tỷ tokens, 44TB) dùng để huấn luyện các mô hình ngôn ngữ lớn (LLM) hàng đầu thế giới.
          </p>
          <div className="cta-group">
            <Link
              className="button button--primary button--lg"
              style={{ borderRadius: '8px', padding: '0.8rem 2rem', fontWeight: 600 }}
              to="/docs/gioi_thieu">
              Bắt đầu đọc tài liệu 📖
            </Link>
            <a
              className="button button--secondary button--lg"
              style={{ borderRadius: '8px', padding: '0.8rem 2rem', fontWeight: 600 }}
              href="https://huggingface.co/spaces/HuggingFaceFW/blogpost-fineweb-v1"
              target="_blank"
              rel="noopener noreferrer">
              Bài viết gốc 🔗
            </a>
          </div>
        </div>
      </header>

      <main className="container" style={{ paddingBottom: '4rem' }}>
        {/* Key Highlights Section */}
        <section>
          <Heading as="h2" className="section-title">
            Điểm nhấn kỹ thuật nổi bật
          </Heading>
          <div className="grid-container">
            <div className="glass-panel">
              <span className="highlight-badge">QUY MÔ CỰC ĐẠI</span>
              <h3 className="highlight-title">15T Tokens Web Data 🍷</h3>
              <p className="highlight-desc">
                Cung cấp chi tiết toàn bộ công thức tinh cất dữ liệu từ 96 đợt CommonCrawl để tạo ra tập dữ liệu 15 nghìn tỷ tokens chất lượng vượt trội so với các tập dữ liệu mở trước đây.
              </p>
            </div>
            <div className="glass-panel">
              <span className="highlight-badge">LỌC GIÁO DỤC</span>
              <h3 className="highlight-title">📚 FineWeb-Edu</h3>
              <p className="highlight-desc">
                Tập dữ liệu giáo dục 1.3T và 5.4T tokens được gán nhãn chất lượng bằng Llama-3-70B và chắt lọc qua các bộ phân loại tối ưu, mang lại hiệu suất vượt bậc trên các benchmark lý luận.
              </p>
            </div>
            <div className="glass-panel">
              <span className="highlight-badge">BIẾN ĐỘNG THỜI GIAN</span>
              <h3 className="highlight-title">CC over Time & Synthetic Data 📅</h3>
              <p className="highlight-desc">
                Nghiên cứu biến động chất lượng dữ liệu CommonCrawl từ 2013 đến 2024 và đo lường sự bùng nổ của dữ liệu tổng hợp (ChatGPT proxy words) trong các đợt crawl gần đây.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section style={{ marginTop: '2rem' }}>
          <Heading as="h2" className="section-title">
            Các danh mục tài liệu chính
          </Heading>
          <div className="grid-container">
            <Link to="/docs/category/web-data" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="glass-panel" style={{ height: '100%' }}>
                <span className="highlight-badge">DANH MỤC 1</span>
                <h3 className="highlight-title">Dữ liệu Web & Nền tảng 🌐</h3>
                <p className="highlight-desc">
                  Cách tiếp cận khai thác dữ liệu thô CommonCrawl, kiến trúc hệ thống xử lý song song khổng lồ với <code>datatrove</code>, định nghĩa chất lượng dữ liệu pretraining và thiết lập hệ thống thí nghiệm abaltion.
                </p>
              </div>
            </Link>

            <Link to="/docs/category/fineweb-recipe" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="glass-panel" style={{ height: '100%' }}>
                <span className="highlight-badge">DANH MỤC 2</span>
                <h3 className="highlight-title">Công thức FineWeb 🧪</h3>
                <p className="highlight-desc">
                  Chi tiết kỹ thuật trích xuất văn bản từ WARC, lọc cơ bản, tối ưu hóa thuật toán loại trùng MinHash, nghịch lý loại trùng toàn cục làm giảm chất lượng, các bộ lọc C4 và phương pháp khoảng cách Wasserstein.
                </p>
              </div>
            </Link>

            <Link to="/docs/category/fineweb-edu" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="glass-panel" style={{ height: '100%' }}>
                <span className="highlight-badge">DANH MỤC 3</span>
                <h3 className="highlight-title">FineWeb-Edu & Trình phân loại 📖</h3>
                <p className="highlight-desc">
                  Phương pháp gán nhãn giáo dục bằng Llama-3-70B, cách xây dựng và huấn luyện mô hình phân loại chất lượng giáo dục Snowflake-arctic-embed và đánh giá kết quả lọc dữ liệu.
                </p>
              </div>
            </Link>

            <Link to="/docs/category/commoncrawl-temporal" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="glass-panel" style={{ height: '100%' }}>
                <span className="highlight-badge">DANH MỤC 4</span>
                <h3 className="highlight-title">CC over Time & Dữ liệu Tổng hợp ⏳</h3>
                <p className="highlight-desc">
                  Khảo sát sự thay đổi chất lượng của các đợt crawl qua thời gian và đo lường sự gia tăng đột biến của dữ liệu do AI tạo ra (synthetic data) trên Internet hiện nay.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Bottom Call to Action */}
        <section className="bottom-cta">
          <Heading as="h2" style={{ fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'var(--ifm-heading-font-family)' }}>
            Sẵn sàng đi sâu vào kiến trúc dữ liệu LLM?
          </Heading>
          <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: '#64748b' }}>
            Toàn bộ các phân tích thực nghiệm, bài học xương máu về loại bỏ dữ liệu rác, tối ưu hóa chi phí huấn luyện đã được lược dịch và trình bày khoa học.
          </p>
          <Link
            className="button button--primary button--lg"
            style={{ borderRadius: '8px', padding: '0.8rem 2.5rem', fontWeight: 600 }}
            to="/docs/gioi_thieu">
            Đọc báo cáo kỹ thuật 🍷
          </Link>
        </section>
      </main>
    </Layout>
  );
}
