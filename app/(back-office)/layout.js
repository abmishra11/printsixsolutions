"use client"
import Navbar from '@/components/backoffice/Navbar'
import Sidebar from '@/components/backoffice/Sidebar'
import Spinner from '@/components/spinners/Spinner';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const [showSideBar, setShowSideBar] = useState(true);

  if (status === "loading") {
    return <Spinner />;
  }else{
    return (
      <div className='flex min-h-screen'>
        {showSideBar && <Sidebar showSideBar={showSideBar} />}
        <div className={`flex-grow transition-all duration-300 ${showSideBar ? 'lg:ml-64' : 'ml-0'}`}> 
          <Navbar showSideBar={showSideBar} setShowSideBar={setShowSideBar} session={session} status={status} />
          <main className="p-8 bg-slate-100 dark:bg-slate-900 text-slate-50 mt-16 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    )
  }
  
}
