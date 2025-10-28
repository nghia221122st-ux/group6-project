import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-hero">
        <h1>Chào mừng, {user?.name}! 👋</h1>
        <p>Bạn đã đăng nhập thành công vào hệ thống</p>
      </div>

      <div className="dashboard-grid">
        <Link to="/profile" className="dashboard-card">
          <div className="card-icon">👤</div>
          <h3>Hồ Sơ</h3>
          <p>Xem và chỉnh sửa thông tin cá nhân</p>
          <span className="card-arrow">→</span>
        </Link>

        {isAdmin && (
          <Link to="/admin" className="dashboard-card admin-card">
            <div className="card-icon">⚙️</div>
            <h3>Quản Trị</h3>
            <p>Quản lý người dùng (Admin)</p>
            <span className="card-arrow">→</span>
          </Link>
        )}

        <div className="dashboard-card info-card">
          <div className="card-icon">📊</div>
          <h3>Thống Kê</h3>
          <p>Role: <strong>{user?.role}</strong></p>
          <p>Email: <strong>{user?.email}</strong></p>
        </div>

        <div className="dashboard-card feature-card">
          <div className="card-icon">🎯</div>
          <h3>Tính Năng</h3>
          <ul>
            <li>✅ Authentication</li>
            <li>✅ Profile Management</li>
            <li>✅ Avatar Upload</li>
            {isAdmin && <li>✅ Admin Dashboard</li>}
          </ul>
        </div>
      </div>

      <div className="dashboard-info">
        <div className="info-box">
          <h3>📝 Hướng Dẫn Sử Dụng</h3>
          <ul>
            <li>Truy cập <strong>Hồ Sơ</strong> để cập nhật thông tin cá nhân</li>
            <li>Upload ảnh đại diện trong phần Profile</li>
            <li>Đổi mật khẩu trong cài đặt bảo mật</li>
            {isAdmin && <li>Quản lý users trong <strong>Admin Dashboard</strong></li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

