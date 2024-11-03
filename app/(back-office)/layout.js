"use client"
import Navbar from '@/components/backoffice/Navbar'
import Sidebar from '@/components/backoffice/Sidebar'
import React, { useState } from 'react'

export default function Layout({ children }) {
  const [showSideBar, setShowSideBar] = useState(false)
  
  return (
    <div className="flex">
      {showSideBar && <Sidebar showSideBar={showSideBar} />}
      
      <div className={`flex-grow ${showSideBar ? 'lg:ml-64' : 'ml-0'} bg-slate-100 min-h-screen`}>
        <Navbar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <main className="p-8 bg-slate-100 dark:bg-slate-900 text-slate-50 mt-16 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}
