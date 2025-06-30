'use client'

import React from 'react'
import {
  Home,
  Settings,
  HelpCircle,
  User,
  Radio,
  SatelliteDish
} from 'lucide-react'
import { COLORS } from '../constants/colors'

const Header: React.FC = () => {
  return (
    <header
      className='rounded-lg shadow-sm'
      style={{ backgroundColor: '#f3f4f6' }}
    >
      <div className='flex items-center justify-between px-6 py-4'>
        <div className='flex items-center space-x-8'>
          <div className='flex items-center space-x-1'>
            <div className='w-8 h-8 rounded-sm flex items-center justify-center'>
              <SatelliteDish size={24} color={COLORS.PRIMARY_BLUE} />
            </div>
            <h1 className='text-lg font-bold text-gray-800'>
              抽水蓄能电站无线链路设计优化工具
            </h1>
          </div>
          <nav className='flex items-center space-x-5'>
            <button
              className='flex items-center space-x-2 px-4 py-2 rounded text-white transition-colors'
              style={{ backgroundColor: COLORS.PRIMARY_BLUE }}
            >
              <Home size={16} />
              <span className='text-base font-semibold'>主页面</span>
            </button>
            <button className='flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-100 transition-colors text-gray-700'>
              <span className='text-base font-semibold'>天线下倾角</span>
            </button>
            <button className='flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-100 transition-colors text-gray-700'>
              <span className='text-base font-semibold'>射频链路计算</span>
            </button>
            <button className='flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-100 transition-colors text-gray-700'>
              <span className='text-base font-semibold'>电缆损耗</span>
            </button>
            <button className='flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-100 transition-colors text-gray-700'>
              <span className='text-base font-semibold'>无线链路</span>
            </button>
            <button className='flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-100 transition-colors text-gray-700'>
              <span className='text-base font-semibold'>干扰分析</span>
            </button>
          </nav>
        </div>
        <div className='flex items-center space-x-4'>
          <button className='text-base font-semibold hover:text-blue-600 text-gray-700'>
            登录项目
          </button>
          <button className='text-base font-semibold hover:text-blue-600 text-gray-700'>
            登出项目
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
