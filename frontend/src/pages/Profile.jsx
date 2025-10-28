import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import profileService from '../services/profileService';
import { showSuccess, showError } from '../utils/toast';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [loading, setLoading] = useState(false);
  
  // Profile form
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Avatar
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email
      });
      setAvatar(user.avatar);
    }
  }, [user]);

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await profileService.updateProfile(profileData);
      updateUser(response.user);
      showSuccess('Cập nhật profile thành công!');
    } catch (error) {
      showError(error.response?.data?.message || 'Cập nhật thất bại');
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);
    try {
      await profileService.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      showSuccess('Đổi mật khẩu thành công!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      showError(error.response?.data?.message || 'Đổi mật khẩu thất bại');
    } finally {
      setLoading(false);
    }
  };

  // Handle avatar selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showError('Ảnh không được vượt quá 5MB');
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle avatar upload
  const handleAvatarUpload = async () => {
    if (!avatarFile) {
      showError('Vui lòng chọn ảnh');
      return;
    }

    setLoading(true);
    try {
      const response = await profileService.uploadAvatar(avatarFile);
      setAvatar(response.avatar);
      updateUser({ ...user, avatar: response.avatar });
      showSuccess('Upload avatar thành công!');
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (error) {
      showError(error.response?.data?.message || 'Upload thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar-section">
          <div className="profile-avatar-wrapper">
            {avatar || avatarPreview ? (
              <img 
                src={avatarPreview || `http://localhost:3000${avatar}`} 
                alt="Avatar" 
                className="profile-avatar"
              />
            ) : (
              <div className="profile-avatar-placeholder">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="profile-info">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <span className={`role-badge ${user?.role}`}>
              {user?.role === 'admin' ? '👑 Admin' : '👤 User'}
            </span>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          📝 Thông tin
        </button>
        <button 
          className={`tab ${activeTab === 'password' ? 'active' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          🔒 Mật khẩu
        </button>
        <button 
          className={`tab ${activeTab === 'avatar' ? 'active' : ''}`}
          onClick={() => setActiveTab('avatar')}
        >
          🖼️ Ảnh đại diện
        </button>
      </div>

      <div className="profile-content">
        {/* Info Tab */}
        {activeTab === 'info' && (
          <div className="tab-content">
            <h3>Cập nhật thông tin</h3>
            <form onSubmit={handleProfileUpdate}>
              <div className="form-group">
                <label>Họ và tên</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Đang cập nhật...' : 'Cập nhật'}
              </button>
            </form>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <div className="tab-content">
            <h3>Đổi mật khẩu</h3>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label>Mật khẩu hiện tại</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu mới</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  required
                />
                <small>Tối thiểu 6 ký tự</small>
              </div>
              <div className="form-group">
                <label>Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Đang đổi...' : 'Đổi mật khẩu'}
              </button>
            </form>
          </div>
        )}

        {/* Avatar Tab */}
        {activeTab === 'avatar' && (
          <div className="tab-content">
            <h3>Upload ảnh đại diện</h3>
            <div className="avatar-upload-section">
              <div className="avatar-preview">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Preview" />
                ) : avatar ? (
                  <img src={`http://localhost:3000${avatar}`} alt="Current" />
                ) : (
                  <div className="avatar-placeholder-large">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="avatar-upload-controls">
                <input
                  type="file"
                  id="avatar-input"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="avatar-input" className="btn-secondary">
                  Chọn ảnh
                </label>
                {avatarPreview && (
                  <button 
                    onClick={handleAvatarUpload} 
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Đang upload...' : 'Upload'}
                  </button>
                )}
              </div>
              <p className="upload-hint">Kích thước tối đa: 5MB. Định dạng: JPG, PNG, GIF</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

