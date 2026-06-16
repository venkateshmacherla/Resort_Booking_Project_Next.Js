'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import "./UserNavigation.css";

const UserNavigation = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  const userName = session?.user?.username || session?.username || session?.user?.name || "";

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link href="/" className="logo">
          Resort<span>Book</span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/">Resorts</Link>
          </li>

          <li>
            <Link href="/my-bookings">Bookings</Link>
          </li>
        </ul>
        <p className="welcome-text">
          Welcome:
          <span className="welcome-username">
            {userName}
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
  );
};

export default UserNavigation;