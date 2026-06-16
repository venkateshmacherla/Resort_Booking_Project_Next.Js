
import React from 'react'
import Link from "next/link";

const AdminNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link href="/" className="logo">
          Resort<span>Book</span>
        </Link>

        <p className="welcome-text">
          Welcome:
          <span className="welcome-username">
                Admin
          </span>
        </p>

        <div className="auth-buttons">
          <Link href="/api/auth/signout" className="link">
            <div className="logout-btn">
              Logout
            </div>
          </Link>
        </div>

        {/*
        <div className="auth-buttons">
          <Link href="/login" className="login-btn">
            Login
          </Link>

          <Link href="/register" className="register-btn">
            Register
          </Link>

          <Link href="/api/auth/signout" className="link">
            <div className="logout-btn">
              Logout
            </div>
          </Link>
        </div>
        */}

      </div>
    </nav>
  )
}

export default AdminNavbar