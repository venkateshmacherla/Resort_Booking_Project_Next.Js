'use client'

import React, { useState } from 'react'
import { registerAction } from '../serverActions/registerAction';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const RegisterForm = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 

    const router = useRouter()

    const registerHandler = async (e) => {
        e.preventDefault()

        const userRegisterDetails = {
            username,
            email,
            password
        }

        console.log(userRegisterDetails)

        try {
            const response = await registerAction(userRegisterDetails);
            if(response.success) {
                alert("Registration successful!");
                    router.push("/login")
            }
        } catch (error) {
            console.error("Error occurred while registering user:", error)
        }
    }
  return (
    <div className="form-container">
        <div className="form-card">
            <h2 className="form-title">Create Account</h2>

            <form onSubmit = {registerHandler}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                type="text"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>

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
                Create Account
            </button>
            </form>
            <Link href="/login" className="auth-link">
                Already have an account? <span className="link-text">Login here</span>
            </Link>
        </div>
    </div>
  )
}
 
export default RegisterForm