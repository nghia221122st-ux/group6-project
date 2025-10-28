import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📋 Group Project
        </Link>

        {user ? (
          <div className="navbar-menu">
            <Link to="/" className="nav-link">
              🏠 Dashboard
            </Link>
            
            {isAdmin && (
              <Link to="/admin" className="nav-link admin-link">
                ⚙️ Admin
              </Link>
            )}

            <div className="user-menu">
              <button 
                className="user-menu-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.avatar ? (
                  <img 
                    src={`http://localhost:3000${user.avatar}`} 
                    alt={user.name}
                    className="user-avatar"
                  />
                ) : (
                  <div className="user-avatar-placeholder">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span>{user.name}</span>
                <span className="dropdown-arrow">▼</span>
              </button>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <p className="dropdown-name">{user.name}</p>
                    <p className="dropdown-email">{user.email}</p>
                  </div>
                  <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    👤 Profile
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    🚪 Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="navbar-menu">
            <Link to="/login" className="nav-link">
              Đăng nhập
            </Link>
            <Link to="/signup" className="nav-button">
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

