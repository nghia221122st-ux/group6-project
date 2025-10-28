import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { showSuccess, showError } from '../../utils/toast';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: 'user' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersData, statsData] = await Promise.all([
        adminService.getAllUsers(),
        adminService.getStats()
      ]);
      setUsers(usersData.users);
      setStats(statsData.stats);
    } catch (error) {
      showError('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Bạn có chắc muốn xóa user "${name}"?`)) {
      return;
    }

    try {
      await adminService.deleteUser(id);
      showSuccess('Xóa user thành công!');
      fetchData();
    } catch (error) {
      showError(error.response?.data?.message || 'Xóa thất bại');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await adminService.updateUser(editingUser.id, editForm);
      showSuccess('Cập nhật user thành công!');
      setEditingUser(null);
      fetchData();
    } catch (error) {
      showError(error.response?.data?.message || 'Cập nhật thất bại');
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>⚙️ Admin Dashboard</h1>
        <p>Quản lý người dùng hệ thống</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{stats.totalUsers}</h3>
              <p>Tổng Users</p>
            </div>
          </div>
          <div className="stat-card admin-stat">
            <div className="stat-icon">👑</div>
            <div className="stat-info">
              <h3>{stats.adminUsers}</h3>
              <p>Admin</p>
            </div>
          </div>
          <div className="stat-card user-stat">
            <div className="stat-icon">👤</div>
            <div className="stat-info">
              <h3>{stats.regularUsers}</h3>
              <p>Regular Users</p>
            </div>
          </div>
          <div className="stat-card new-stat">
            <div className="stat-icon">✨</div>
            <div className="stat-info">
              <h3>{stats.newUsersLast30Days}</h3>
              <p>Users mới (30 ngày)</p>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="users-table-container">
        <h2>Danh Sách Người Dùng</h2>
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Role</th>
                <th>Ngày Tạo</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="user-cell">
                      {user.avatar ? (
                        <img 
                          src={`http://localhost:3000${user.avatar}`} 
                          alt={user.name}
                          className="user-avatar-small"
                        />
                      ) : (
                        <div className="user-avatar-placeholder-small">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(user)}
                      >
                        ✏️ Sửa
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(user.id, user.name)}
                      >
                        🗑️ Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="modal-overlay" onClick={() => setEditingUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chỉnh Sửa User</h3>
              <button className="modal-close" onClick={() => setEditingUser(null)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleUpdateUser}>
              <div className="form-group">
                <label>Tên</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setEditingUser(null)}>
                  Hủy
                </button>
                <button type="submit" className="btn-save">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

