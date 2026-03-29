# 📝 Blog App (MERN Stack)

A basic application with authentication, role-based access, and CRUD operations for blogs.

---

## 🚀 Tech Stack

* **Frontend:** React (Vite)
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Auth:** JWT (stored in HTTP-only cookies)

---

## 📁 Project Structure

```
assignment/
├── client/   # React frontend
├── server/   # Express backend
└── .gitignore
```

---

## ⚙️ Prerequisites

Make sure you have installed:

* Node.js
* MongoDB (running locally)
* npm / yarn

---

## 🔑 Environment Variables

Create a `.env` file inside `server/`:

```
JWT_SECRET=your_secret_key
```

---

## 🛠️ How to Run Locally

### 1️⃣ Clone the repository

```
git clone https://github.com/SarthakMaluskar/CRUDwAUTH
cd assignment
```

---

### 2️⃣ Setup Backend

```
cd server
npm install
```

Start server:

```
node index.js
```

👉 Runs on: `http://localhost:3000`
👉 MongoDB: `mongodb://localhost:27017/assignment`

---

### 3️⃣ Setup Frontend

```
cd client
npm install
npm run dev
```

👉 Runs on: `http://localhost:5173`

---

## 🔐 Authentication Flow

* Signup/Login returns JWT stored in cookies
* Protected routes require cookie (`token`)
* Role-based:

  * **Admin:** Access all blogs
  * **User:** Access own blogs only

---

## 📡 API Endpoints

### 🔑 Auth

* `POST /api/signup` → Register user
* `POST /api/login` → Login user
* `GET /api/me` → Get current user
* `POST /api/logout` → Logout user

---

### 📝 Blogs

* `POST /api/blogs` → Create blog
* `GET /api/blogs` → Get blogs (admin/user based)
* `GET /api/blogs/:id` → Get single blog
* `PUT /api/blogs/:id` → Update blog
* `DELETE /api/blogs/:blogId` → Delete blog

---

## 🍪 Cookies

* JWT stored in `token` cookie
* HTTP-only (secure from JS access)
* Expires in 7 days

---

## ⚠️ Important Notes

* Enable MongoDB before running server
* CORS configured for:

```
http://localhost:5173
```

* Use Postman or frontend for testing APIs

---

## 🧪 Testing

You can test APIs using:

* Postman (with cookie support)
* Frontend UI

---

## 💡 Features

* User authentication (JWT)
* Role-based access (Admin/User)
* Full CRUD for blogs
* Secure cookie-based sessions

---

## 👨‍💻 Author

Sarthak Maluskar

---
