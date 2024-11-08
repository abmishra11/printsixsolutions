"use client"
import Navbar from '@/components/backoffice/Navbar'
import Sidebar from '@/components/backoffice/Sidebar'
import React, { useState } from 'react'

export default function Layout({ children }) {
  const [showSideBar, setShowSideBar] = useState(true)
  
  return (
    <div className='flex min-h-screen'>
      {showSideBar && <Sidebar showSideBar={showSideBar} />}
      <div className={`flex-grow transition-all duration-300 ${showSideBar ? 'lg:ml-64' : 'ml-0'}`}> 
        <Navbar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <main className="p-8 bg-slate-100 dark:bg-slate-900 text-slate-50 mt-16 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
