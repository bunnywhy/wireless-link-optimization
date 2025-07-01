'use client'

import React from 'react'
import {
  Settings,
  HelpCircle,
  User,
  Radio,
  SatelliteDish,
  ArrowRightLeft,
  Download
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { COLORS } from '../constants/colors'

const Header: React.FC = () => {
  const pathname = usePathname()

  const getNavItemStyle = (path: string) => {
    const isActive = pathname === path
    return isActive
      ? `flex items-center space-x-2 px-4 py-2 rounded text-white transition-colors`
      : `flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-100 transition-colors text-gray-700`
  }

  const getNavItemBackground = (path: string) => {
    const isActive = pathname === path
    return isActive ? { backgroundColor: COLORS.PRIMARY_BLUE } : {}
  }

  return (
    <header
      className='rounded-lg shadow-sm'
      style={{ backgroundColor: '#f3f4f6' }}
    >
      <div className='flex items-center justify-between px-6 py-4'>
        <div className='flex items-center space-x-8'>
          <Link
            href='/'
            className='flex items-center space-x-1 hover:opacity-80 transition-opacity'
          >
            <div className='w-8 h-8 rounded-sm flex items-center justify-center'>
              <SatelliteDish size={24} color={COLORS.PRIMARY_BLUE} />
            </div>
            <h1 className='text-lg font-bold text-gray-800'>
              抽水蓄能电站无线链路设计优化工具
            </h1>
          </Link>
          <nav className='flex items-center space-x-5'>
            <Link
              href='/antenna-downtilt'
              className={getNavItemStyle('/antenna-downtilt')}
              style={getNavItemBackground('/antenna-downtilt')}
            >
              <span className='text-base font-semibold'>天线下倾角计算</span>
            </Link>
            <button
              className={getNavItemStyle('/rf-link')}
              style={getNavItemBackground('/rf-link')}
            >
              <span className='text-base font-semibold'>射频链路计算</span>
            </button>
            <button
              className={getNavItemStyle('/cable-loss')}
              style={getNavItemBackground('/cable-loss')}
            >
              <span className='text-base font-semibold'>电缆损耗</span>
            </button>
            <button
              className={getNavItemStyle('/wireless-link')}
              style={getNavItemBackground('/wireless-link')}
            >
              <span className='text-base font-semibold'>无线链路</span>
            </button>
            <button
              className={getNavItemStyle('/interference')}
              style={getNavItemBackground('/interference')}
            >
              <span className='text-base font-semibold'>干扰分析</span>
            </button>
          </nav>
        </div>
        <div className='flex items-center space-x-4'>
          <button className='flex items-center space-x-2 text-base font-semibold hover:text-blue-600 text-gray-700'>
            <ArrowRightLeft size={16} />
            <span>切换项目</span>
          </button>
          <button className='flex items-center space-x-2 text-base font-semibold hover:text-blue-600 text-gray-700'>
            <Download size={16} />
            <span>导出报告</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
