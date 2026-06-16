'use client'

import React from 'react'
import { useState } from 'react';
import { loginAction } from '../serverActions/loginAction';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const router = useRouter()

    const loginHandler = async (e) => {
        e.preventDefault()

        const loginDetails = {
            email,
            password
        }
        console.log(loginDetails)

        try{
            const response = await loginAction(loginDetails);
            if(response.success) {
                router.push('/')
            } else {
                setError(response.message || "Login failed")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="form-container">
        <div className="form-card">
            <h2 className="form-title">Login</h2>

            <form onSubmit = {loginHandler}>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type="submit" className="form-btn">
                Login
            </button>
            </form>
            <Link href="/register" className="auth-link">
                Don&apos;t have an account? <span className="link-text">Register here</span>
            </Link>
        </div>
    </div>
  )
}

export default UserLogin