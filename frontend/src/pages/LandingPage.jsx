import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="landing-nav">
        <div className="landing-nav__container">
          <div className="landing-nav__logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>UserHub</span>
          </div>
          
          <div className="landing-nav__links">
            <Link to="/login" className="landing-nav__link">Đăng nhập</Link>
            <Link to="/signup" className="landing-nav__btn">Đăng ký ngay</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero__container">
          <h1 className="landing-hero__title">
            Hệ thống Quản lý Người dùng
          </h1>

          <p className="landing-hero__description">
            Giải pháp quản lý thông tin người dùng toàn diện với giao diện thân thiện,
            bảo mật cao và nhiều tính năng mạnh mẽ.
          </p>

          <div className="landing-hero__actions">
            <Link to="/signup" className="landing-btn landing-btn--primary">
              Bắt đầu miễn phí
            </Link>
            <Link to="/login" className="landing-btn landing-btn--secondary">
              Đăng nhập
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="landing-features__container">
          <h2 className="landing-section-title">Tính năng nổi bật</h2>

          <div className="landing-features__grid">
            <div className="landing-feature">
              <div className="landing-feature__icon">👤</div>
              <h3 className="landing-feature__title">Quản lý hồ sơ</h3>
              <p className="landing-feature__description">
                Cập nhật và quản lý thông tin cá nhân một cách dễ dàng
              </p>
            </div>

            <div className="landing-feature">
              <div className="landing-feature__icon">🔒</div>
              <h3 className="landing-feature__title">Bảo mật cao</h3>
              <p className="landing-feature__description">
                Mã hóa mật khẩu và xác thực JWT đảm bảo an toàn
              </p>
            </div>

            <div className="landing-feature">
              <div className="landing-feature__icon">👥</div>
              <h3 className="landing-feature__title">Quản lý phân quyền</h3>
              <p className="landing-feature__description">
                Hệ thống phân quyền rõ ràng giữa User và Admin
              </p>
            </div>

            <div className="landing-feature">
              <div className="landing-feature__icon">📸</div>
              <h3 className="landing-feature__title">Upload ảnh đại diện</h3>
              <p className="landing-feature__description">
                Tải lên và quản lý ảnh đại diện cá nhân
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer__container">
          <p className="landing-footer__text">
            © 2024 UserHub. Hệ thống quản lý người dùng chuyên nghiệp.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

