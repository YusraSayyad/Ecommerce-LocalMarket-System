# 🛒 Local Market Ecommerce System

A full-stack ecommerce web application that connects local sellers with customers.
Users can browse products, add items to cart, and place orders, while sellers manage their products and orders. Admin controls the entire platform.
## 🚀 Features

### 👤 User Panel
- User registration & login
- Browse products by category
- Search products
- Add to cart & wishlist
- Checkout & place orders
- Order history & tracking

### 🏪 Seller Panel
- Seller registration & login
- Add new products
- Update / delete products
- Manage inventory
- View orders

### 🛠️ Admin Panel
- Admin dashboard
- Approve / reject sellers
- Manage users & sellers
- Manage all products
- Monitor platform activity
## 🧑‍💻 Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- (Optional: Bootstrap / React / Tailwind)

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### Authentication
- JWT (JSON Web Token)
- bcrypt.js

## 📂 Project Structure
local-market-ecommerce/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── index.html
│ ├── pages/
│ ├── css/
│ ├── js/
│ └── assets/
│
├── .env
├── package.json
└── README.md

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/your-username/local-market-ecommerce.git
cd local-market-ecommerce
npm install
## 🔐 Environment Variables

Create a `.env` file in your root or backend folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

npm run dev
npm start


---

## 📌 Future Improvements
- Payment gateway integration (Razorpay / Stripe)
- Real-time chat between buyer & seller
- Product reviews & ratings
- Advanced filtering & search
- Mobile responsive PWA version

---

# 👩‍💻 Developer

Developed by **Yusra Sayyad**

A full-stack web development project built for learning and real-world practice.

---

# 📄 License

This project is for educational and portfolio purposes.
