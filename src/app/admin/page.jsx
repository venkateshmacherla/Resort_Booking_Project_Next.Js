
import React from 'react'
import { auth } from '../auth'
import { redirect } from 'next/navigation'
import Link from "next/link";
import AdminNavbar from '../components/AdminNavbar';
import "../components/UserNavigation.css";
import AddProduct from '../components/AddProduct';


const AdminPage = async () => {

  const session = await auth()

  if(!session) {
    redirect("/login")
  }

  return (
    <div>
      { session ? (
          <>
            <AdminNavbar />
            <AddProduct />
          </>
        ) : "Not Authorized" 
      }
    </div>
  )
}

export default AdminPage

