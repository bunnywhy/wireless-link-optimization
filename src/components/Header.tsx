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
      ? `flex items-center space-x-2 px-4 py-2 rounded text-white`
      : `flex items-center space-x-2 px-4 py-2 rounded hover:opacity-80 transition-opacity text-gray-800`
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
            <Link
              href='/rf-link'
              className={getNavItemStyle('/rf-link')}
              style={getNavItemBackground('/rf-link')}
            >
              <span className='text-base font-semibold'>射频链路计算</span>
            </Link>
            <Link
              href='/cable-loss'
              className={getNavItemStyle('/cable-loss')}
              style={getNavItemBackground('/cable-loss')}
            >
              <span className='text-base font-semibold'>电缆损耗</span>
            </Link>
            <Link
              href='/map'
              className={getNavItemStyle('/map')}
              style={getNavItemBackground('/map')}
            >
              <span className='text-base font-semibold'>高程配置图</span>
            </Link>
          </nav>
        </div>
        <div className='flex items-center space-x-4'>
          <button className='flex items-center space-x-2 text-base font-semibold hover:opacity-80 hover:scale-105 hover:shadow-sm transition-all duration-300 transform text-gray-800'>
            <ArrowRightLeft size={16} />
            <span>切换项目</span>
          </button>
          <button className='flex items-center space-x-2 text-base font-semibold hover:opacity-80 hover:scale-105 hover:shadow-sm transition-all duration-300 transform text-gray-800'>
            <Download size={16} />
            <span>导出报告</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
