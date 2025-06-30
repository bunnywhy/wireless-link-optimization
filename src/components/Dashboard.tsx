'use client'

import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import Footer from './Footer'

const Dashboard: React.FC = () => {
  return (
    <div
      className='h-screen flex flex-col'
      style={{ backgroundColor: '#0c2461' }}
    >
      <div className='pt-2 px-2'>
        <Header />
      </div>
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
