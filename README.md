# 🔐 Login Authentication System

A full-stack Login Authentication System built using React, Node.js, Express, and MySQL with secure password hashing using bcrypt.

---

# 🚀 Features

- User Signup
- User Login
- Forgot Password UI
- Password Hashing using bcrypt
- MySQL Database Integration
- REST API Backend
- Responsive UI
- Railway Backend Deployment
- Environment Variables Support

---

# 🛠️ Tech Stack

## Frontend
- React
- Vite
- CSS

## Backend
- Node.js
- Express.js
- MySQL2
- bcrypt
- dotenv
- cors

## Database
- MySQL

---

# 📁 Folder Structure

```bash
loginsystem/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── ForgotPassword.jsx
│   │   │
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── index.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/loginsystem.git
cd loginsystem
```

---

# 💻 Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🔧 Backend Setup

```bash
cd server
npm install
node index.js
```

Backend runs on:

```bash
http://localhost:5001
```

---

# 🔑 Environment Variables

Create a `.env` file inside the `server/` folder.

## Local MySQL Setup

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=auth_db
PORT=5001
```

---

# ☁️ Railway MySQL Setup

```env
DB_HOST=mysql.railway.internal
DB_USER=root
DB_PASSWORD=your_railway_password
DB_NAME=railway
PORT=8080
```

---

# 📡 API Routes

## Signup

```http
POST /signup
```

### Request Body

```json
{
  "name": "Tisha",
  "email": "test@gmail.com",
  "password": "123456"
}
```

---

## Login

```http
POST /login
```

### Request Body

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

---

## Forgot Password

```http
POST /forgot-password
```

### Request Body

```json
{
  "email": "test@gmail.com"
}
```

---

# 🗄️ Database Table

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

---

# 🌍 Deployment

## Frontend Deployment (Vercel)

```bash
npm run build
```

Deploy the `client/` folder on Vercel.

---

## Backend Deployment (Railway)

1. Push project to GitHub
2. Create Railway Project
3. Deploy GitHub Repository
4. Add MySQL Database
5. Add Environment Variables
6. Generate Public Domain

---

# 🔒 Security Features

- Passwords stored using bcrypt hashing
- Environment variables for credentials
- CORS enabled
- Input validation

---

# 🚀 Future Improvements

- JWT Authentication
- Email Verification
- Reset Password Token
- Protected Routes
- User Dashboard
- Session Management

---

# 👩‍💻 Author

**Tisha Kharade**

---

# 📜 License

This project is for educational purposes.
