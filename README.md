# 🔗 TinyLink — URL Shortener (MERN Stack)

TinyLink is a full-stack URL shortener built using **MongoDB**, **Express**, **React**, and **Node.js**.  
The app allows users to generate short URLs, track analytics, view link stats, filter/search links, and monitor service health.

This project meets all requirements given in the assignment:

- Create short links  
- Track number of clicks  
- Show stats dashboard  
- Health endpoint  
- Search/filter  
- Auto-copy link  
- Responsive UI  
- Code-based redirects  
- Error handling  
- Backend + frontend deployment  

---

## 🚀 Live Deployments

### **Frontend (Netlify)**
> https://your-frontend.netlify.app

### **Backend (Render)**
> https://tinylink-backend-mmd7.onrender.com

---

## 📦 Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React + Vite + TailwindCSS |
| Backend    | Node.js + Express.js |
| Database   | MongoDB Atlas |
| Hosting    | Netlify (FE), Render (BE) |
| Monitoring | Health Endpoint |
| Utilities  | Axios, React Router |

---

# ✨ Features

### ✅ 1. Create Short URL  
- Add a target URL  
- Optional custom short code  
- Auto-generate code if not provided  
- Stores URL + code + click stats

### ✅ 2. Redirect by Code  
Visiting:

```
/abc123
```

Redirects to the original long URL and increments click count.

### ✅ 3. Analytics / Stats Page  
Each link has a dedicated stats page:

```
/code/:code
```

Shows:
- Total clicks  
- Last clicked timestamp  
- Target URL  
- API-driven data  

### ✅ 4. Dashboard  
Displays all links in a table:

- Code  
- Target URL  
- Clicks  
- Last clicked  
- Stats button  
- Copy button  
- Delete button  

### 🎯 **Search / Filter (Frontend Only)**  
Search by:
- Short code  
- Target URL  

Live filtering without server calls.

### 📱 Responsive UI  
- Mobile-first  
- Table collapses cleanly  
- Buttons scale on small screens  

### 🧹 Clean UX  
- Loading state  
- Empty state  
- Error handling  
- Input validation  
- Hover effects  

### ⚙ Health Endpoint  
```
GET /healthz
```

Example Response:

```json
{
  "ok": true,
  "version": "1.0"
}
```

Used for uptime monitors (UptimeRobot / Cron-job.org).

---

# 🧩 Project Structure

```
tinylink/
 ├── backend/
 │   ├── src/
 │   │   ├── models/
 │   │   ├── routes/
 │   │   ├── controllers/
 │   │   ├── server.js
 │   ├── package.json
 │   ├── .env
 │
 ├── frontend/
 │   ├── src/
 │   │   ├── components/
 │   │   ├── pages/
 │   │   ├── App.jsx
 │   │   ├── api.js
 │   ├── vite.config.js
 │   ├── package.json
 │   ├── .env
```

---

# ⚙️ Environment Variables

## **Backend (`backend/.env`)**
```
PORT=10000
MONGODB_URI=your-mongodb-uri
BASE_URL=https://tinylink-backend-mmd7.onrender.com
```

## **Frontend (`frontend/.env`)**
```
VITE_API_BASE=https://tinylink-backend-mmd7.onrender.com
```

### ❗ Never commit `.env` — always add to `.gitignore`  
```
frontend/.env
backend/.env
```

---

# 🛠 Backend API Documentation

## 🔹 **POST /api/links**
Create short link.

**Body:**
```json
{
  "targetUrl": "https://google.com",
  "code": "optional"
}
```

**Response:**
```json
{
  "code": "abc123",
  "targetUrl": "https://google.com",
  "clicks": 0
}
```

---

## 🔹 **GET /api/links**
List all links.

---

## 🔹 **GET /api/links/:code**
Get stats for a single link.

---

## 🔹 **DELETE /api/links/:code**
Delete a link.

---

## 🔹 **GET /:code**
Redirect to original URL.  
Also increments `clicks`.

---

## 🔹 **GET /healthz**
Health check endpoint.

---

# 🎨 Frontend Features

### Dashboard (`/`)
- Form to create new links  
- Search/filter  
- Responsive table  
- Copy button  
- Stats button  
- Delete button  

### Stats Page (`/code/:code`)
- Target URL  
- Click count  
- Last clicked  
- Styled analytics view  

### Header Navigation
- Home  
- Dashboard  
- Health (opens backend /healthz)  

---

# 🚀 Deployment Instructions

## ✅ **Backend Deployment (Render)**

1. Push backend to GitHub  
2. Create new Render “Web Service”  
3. Select repo  
4. Set root directory → `backend`  
5. Add `.env`  
6. Build command:
```
npm install
```
7. Start command:
```
node src/server.js
```

---

## 🎯 Prevent Render from Sleeping (FREE)

Use cron-job.org to ping every 5 min:

```
https://tinylink-backend-mmd7.onrender.com/healthz
```

Backend stays awake forever.

---

## ✅ **Frontend (Netlify)**

1. Connect GitHub  
2. Root directory → `frontend`  
3. Build command:
```
npm run build
```
4. Publish directory:
```
dist
```
5. Add env:
```
VITE_API_BASE=https://tinylink-backend-mmd7.onrender.com
```

---

# 👨‍💻 Local Setup

### Clone repo
```
git clone https://github.com/your-repo/tinylink.git
```

### Install backend deps
```
cd backend
npm install
npm start
```

### Install frontend deps
```
cd frontend
npm install
npm run dev
```

---

# 📌 How Search Works (Frontend Only)

- Uses React state  
- Filters `links` list client-side  
- No extra backend load  
- Case-insensitive matching  

---

# 🧪 Testing Checklist

- [x] Create link  
- [x] Delete link  
- [x] Redirect works  
- [x] Click counter increases  
- [x] Stats page loads  
- [x] Health endpoint returns JSON  
- [x] Frontend is responsive  
- [x] Deployed FE + BE  
- [x] ENV variables configured  
- [x] Backend stays awake (cron ping)  

---

# 🏁 Final Notes

TinyLink is fully production-ready for assignment grading.  
All features are implemented cleanly with industry-standard best practices.

