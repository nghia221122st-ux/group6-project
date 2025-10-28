# 📋 Group Project - Authentication & User Management System

Hệ thống quản lý người dùng hoàn chỉnh với **Authentication** sử dụng **Node.js + Express + React + MongoDB**.

## 🌟 Phiên Bản 2.0 - Buổi 5

## 🎯 Mục Tiêu

Xây dựng hệ thống **Authentication & User Management** hoàn chỉnh với:
- ✅ Đăng ký, Đăng nhập, Đăng xuất
- ✅ Quản lý Profile
- ✅ Upload Avatar
- ✅ Đổi mật khẩu
- ✅ Quên/Reset mật khẩu
- ✅ Admin Dashboard (quản lý users)
- ✅ Role-based Access Control (RBAC)

## 🛠️ Công Nghệ Sử Dụng

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### Frontend
- **React** - UI library
- **Axios** - HTTP client

## 📁 Cấu Trúc Dự Án

```
group-project-basic/
├── backend/
│   ├── controllers/
│   │   └── userController.js      # Logic xử lý CRUD
│   ├── models/
│   │   └── User.js                # Schema MongoDB
│   ├── routes/
│   │   └── user.js                # API routes
│   ├── server.js                  # Entry point backend
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UserList.jsx       # Hiển thị danh sách
│   │   │   └── AddUser.jsx        # Form thêm/sửa
│   │   ├── App.js                 # Component chính
│   │   └── App.css                # Styles
│   └── package.json
│
└── README.md
```

## 🚀 Hướng Dẫn Chạy Dự Án

### 1. Cài Đặt Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 2. Cấu Hình MongoDB

Tạo file `.env` trong thư mục `backend/`:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/groupDB
```

**Hoặc** dùng MongoDB local:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/groupDB
```

### 3. Chạy Ứng Dụng

#### Chạy Backend (Terminal 1)
```bash
cd backend
npm run dev
```
Backend sẽ chạy tại: `http://localhost:3000`

#### Chạy Frontend (Terminal 2)
```bash
cd frontend
npm start
```
Frontend sẽ chạy tại: `http://localhost:3001` (hoặc cổng khác nếu 3000 đã dùng)

### 4. Sử Dụng

1. Mở trình duyệt: `http://localhost:3001`
2. Thêm người dùng mới bằng form
3. Xem danh sách người dùng
4. Sửa hoặc xóa người dùng

## 📋 Chức Năng

### Authentication
- ✅ Đăng ký (Signup) với email unique check
- ✅ Đăng nhập (Login) với JWT tokens
- ✅ Đăng xuất (Logout)
- ✅ Quên mật khẩu (Forgot Password) với reset token
- ✅ Reset mật khẩu (Reset Password)

### User Management
- ✅ Xem profile cá nhân
- ✅ Cập nhật thông tin (tên, email)
- ✅ Đổi mật khẩu
- ✅ Upload avatar (hỗ trợ JPG, PNG, GIF)
- ✅ Xóa tài khoản

### Admin Features (Chỉ Admin)
- ✅ Xem danh sách tất cả users
- ✅ Cập nhật thông tin user (bao gồm role)
- ✅ Xóa user
- ✅ Xem thống kê hệ thống

### Security
- ✅ Password hashing (bcrypt)
- ✅ JWT authentication
- ✅ Protected routes (backend & frontend)
- ✅ Role-based authorization (RBAC)
- ✅ Token expiration

## 🌐 API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/users` | Lấy danh sách tất cả users |
| POST | `/users` | Tạo user mới |
| PUT | `/users/:id` | Cập nhật user theo ID |
| DELETE | `/users/:id` | Xóa user theo ID |

## 👥 Phân Công Nhóm

- **Sinh viên 1**: Backend (Node.js + Express) - [Xem README_SinhVien1.md](./README_SinhVien1.md)
- **Sinh viên 2**: Frontend (React) - [Xem README_SinhVien2.md](./README_SinhVien2.md)
- **Sinh viên 3**: Database (MongoDB) - [Xem README_SinhVien3.md](./README_SinhVien3.md)

## 🎓 Học Được Gì?

- REST API design
- CRUD operations
- MongoDB + Mongoose
- React Hooks (useState, useEffect)
- Axios HTTP requests
- Form validation
- Git workflow (branches, PR, merge)

## 📝 Ghi Chú

- Backend chạy port 3000
- Frontend chạy port 3001 (mặc định)
- CORS đã được enable
- Email phải unique
- Form có validation cơ bản

## 🐛 Troubleshooting

**Lỗi kết nối MongoDB:**
- Kiểm tra MONGODB_URI trong file `.env`
- Đảm bảo MongoDB Atlas cho phép IP của bạn
- Kiểm tra username/password

**Lỗi CORS:**
- Đảm bảo backend đã cài `cors`
- Kiểm tra `app.use(cors())` trong `server.js`

**Frontend không gọi được API:**
- Kiểm tra backend đang chạy
- Kiểm tra URL API trong `App.js` (mặc định: `http://localhost:3000/users`)

## 📄 License

MIT License - Free to use for educational purposes.

