"use client"
import Navbar from '@/components/backoffice/Navbar'
import Sidebar from '@/components/backoffice/Sidebar'
import React from 'react'

export default function Layout({ children }) {
  return (
    <div className='flex'>
      {/* { Sidebar } */}
      <Sidebar />
      {/* { The Main Body } */}
      <div className='lg:ml-64 ml-0 flex-grow bg-slate-100 min-h-screen'>
        {/* { Header } */}
        <Navbar />
        {/* { Main } */}
        <main className='p-8 bg-slate-100 dark:bg-slate-900 text-slate-50 mt-16 min-h-screen'>
          {children}
        </main>
      </div>
    </div>
  )
}
