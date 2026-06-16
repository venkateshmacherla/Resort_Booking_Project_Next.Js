
import React from 'react'
import DBConnection from './utils/config/db';
import { auth } from './auth'
import { redirect } from 'next/navigation'
import UserNavigation from './components/UserNavigation';
import AdminPage from './admin/page';
import ProductCollection from './components/ProductCollection';

const HomePage = async () => {

  const session = await auth()

  await DBConnection();

  if(!session) {
    redirect("/login")
  }

  console.log("UserName Check", session.user.username);
  console.log(`Role: ${session.user.role}`);

  const userName = session.user.username;

  return (
    <div>
      { session.user.role === 'user' && (
        <>
          <UserNavigation userName={userName} />
          <ProductCollection />
        </>
      )}
      { session.user.role === 'admin' && 
        <AdminPage />
      }
    </div>
  )
}

export default HomePage