# 🏖️ Resort Booking Application

A full-stack Resort Booking Application built with Next.js, MongoDB, NextAuth, and Mongoose.

This project allows users to browse luxury resorts, view resort details, select booking dates, and manage their bookings. An admin can add and manage resorts through a dedicated admin dashboard.

---

## 🚀 Features

### 👤 User Features

- User Registration & Login
- Secure Authentication using NextAuth
- Browse Available Resorts
- View Resort Details
- Select Check-In & Check-Out Dates
- Create Resort Bookings
- View Personal Booking History
- Responsive UI Design

### 🛠️ Admin Features

- Admin Authentication
- Add New Resorts
- Manage Resort Listings
- View Resort Information
- Separate Admin Dashboard

---

## 🏗️ Tech Stack

### Frontend

- Next.js 15 (App Router)
- React.js
- CSS Modules
- React Date Range

### Backend

- Next.js Server Actions
- Next.js API Routes
- NextAuth

### Database

- MongoDB Atlas
- Mongoose

---

## 📂 Project Structure

```bash
src/
│
├── app/
│   ├── admin/
│   ├── api/
│   ├── detail/
│   ├── login/
│   ├── register/
│   ├── my-bookings/
│   ├── components/
│   ├── serverActions/
│   └── utils/
│
├── public/
│   └── uploads/
│
└── middleware.js
```

---

## 🔐 Authentication

Authentication is handled using NextAuth Credentials Provider.

### User Session Includes

```js
{
  id,
  username,
  email,
  role
}
```

### Roles

- user
- admin

---

## 📦 Booking Flow

1. User logs in
2. Selects a resort
3. Opens calendar
4. Chooses Check-In & Check-Out dates
5. Clicks Book Now
6. Booking is stored in MongoDB
7. Booking appears in My Bookings page

---

## 📊 Database Collections

### Users

```js
{
  username,
  email,
  password,
  role,
  bookings:[]
}
```

### Products (Resorts)

```js
{
  title,
  description,
  pricePerNight,
  image,
  location,
  category,
  amenities,
  availability
}
```

### Bookings

```js
{
  startDate,
  endDate,
  productName,
  price,
  image,
  totalGuests,
  bookingStatus,
  email,
  user,
  product
}
```

---

## ⚙️ Environment Variables

Create a `.env.local` file and add:

```env
MONGO_URI=your_mongodb_connection_string

AUTH_SECRET=your_nextauth_secret

AUTH_TRUST_HOST=true
```

---

## ▶️ Getting Started

Clone the repository:

```bash
git clone https://github.com/your-username/resort-booking-app.git
```

Move into the project:

```bash
cd resort-booking-app
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## 📸 Main Pages

### User

- Home Page
- Resort Details Page
- My Bookings Page
- Login Page
- Register Page

### Admin

- Admin Dashboard
- Add Resort Page

---

## 🔮 Future Improvements

- Payment Gateway Integration
- Booking Cancellation
- Resort Reviews & Ratings
- Availability Calendar
- Email Notifications
- User Profile Management
- Search & Filter Resorts
- Wishlist Feature

---

## 🎯 What I Learned

While building this project, I gained hands-on experience with:

- Next.js App Router
- Server Actions
- Authentication with NextAuth
- MongoDB & Mongoose
- Dynamic Routing
- Role-Based Access Control
- API Integration
- State Management
- Responsive UI Design

---

## 👨‍💻 Author

**Venky**

Built as a full-stack learning project using Next.js, MongoDB, and NextAuth.

Feel free to fork, explore, and improve the project.