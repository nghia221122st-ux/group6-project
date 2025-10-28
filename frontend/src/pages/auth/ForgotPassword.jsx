import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import { showSuccess, showError, showInfo } from '../../utils/toast';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetInfo, setResetInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      showError('Vui lòng nhập email');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.forgotPassword(email);
      setResetInfo(response);
      showSuccess('Đã gửi link reset password!');
      showInfo('Kiểm tra console để lấy link reset (demo mode)');
      console.log('Reset Password Link:', response.resetUrl);
      console.log('Reset Token:', response.resetToken);
    } catch (error) {
      showError(error.response?.data?.message || 'Gửi email thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Quên Mật Khẩu</h2>
          <p>Nhập email để nhận link reset password</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Đang gửi...' : 'Gửi Email Reset'}
          </button>
        </form>

        {resetInfo && (
          <div className="reset-info-box">
            <p className="info-title">Email đã được gửi!</p>
            <p className="info-text">
              <strong>Demo Mode:</strong> Link reset đã được log trong console
            </p>
            <Link 
              to={`/reset-password/${resetInfo.resetToken}`}
              className="reset-link"
            >
              Click vào đây để reset ngay
            </Link>
          </div>
        )}

        <div className="auth-footer">
          <p>
            Nhớ mật khẩu rồi?{' '}
            <Link to="/login" className="auth-link">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

