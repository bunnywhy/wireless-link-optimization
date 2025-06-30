'use client'

import React, { useState } from 'react'
import {
  ChevronRight,
  BarChart3,
  Radio,
  Target,
  Settings,
  FileText,
  Zap,
  Building,
  Factory,
  Wifi,
  Signal,
  FolderOpen
} from 'lucide-react'
import { COLORS } from '../constants/colors'

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('上库区域')

  const menuItems = [
    {
      title: '项目信息',
      icon: FileText,
      items: []
    },
    {
      title: '上库区域',
      icon: Radio,
      items: [],
      active: true
    },
    {
      title: '下库区域',
      icon: Target,
      items: []
    },
    {
      title: '输水洞室',
      icon: Building,
      items: []
    },
    {
      title: '地下厂房',
      icon: Factory,
      items: []
    },
    {
      title: '开关站',
      icon: Zap,
      items: []
    },
    {
      title: '输电线路',
      icon: Signal,
      items: []
    }
  ]

  // Additional control items from the sidebar
  const controlItems = [
    { label: '上游水库', sublabel: '运行参数设计模拟', value: '12dB/m' },
    { label: '下游水库', sublabel: '多区段应用管理', value: '18dB/m' },
    { label: '监视站', sublabel: '', value: '15dB/m' },
    { label: '变电站间', sublabel: '', value: '25dB/m' },
    { label: 'WiFi/WAPI', sublabel: '', value: '2.4/5.0GHz' },
    { label: '5G基站', sublabel: '多频段', value: '' },
    { label: '高频', sublabel: '塔高: 30-60m', value: '' },
    { label: '高频', sublabel: '塔高: 20-40m', value: '' }
  ]

  return (
    <div className='w-72 py-2 pl-2' style={{ backgroundColor: '#0c2461' }}>
      <div
        className='rounded-lg shadow-sm h-full flex flex-col'
        style={{ backgroundColor: '#f3f4f6' }}
      >
        {/* 项目结构 Section */}
        <div className='p-3 border-b border-gray-200'>
          <div className='flex items-center space-x-2'>
            <FolderOpen size={18} color={COLORS.PRIMARY_BLUE} />
            <h2 className='text-base font-bold text-gray-700'>项目结构</h2>
          </div>
        </div>

        {/* 项目结构 Content */}
        <div className='p-2'>
          {menuItems.map((item, index) => (
            <div key={index} className='mb-1'>
              <button
                className={`w-full flex items-center justify-between px-4 py-2 text-base font-semibold rounded ${
                  item.active ? 'text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={item.active ? { backgroundColor: '#1a6fb0' } : {}}
                onClick={() => setActiveItem(item.title)}
              >
                <div className='flex items-center space-x-3'>
                  <item.icon size={18} />
                  <span>{item.title}</span>
                </div>
                {item.items.length > 0 && <ChevronRight size={16} />}
              </button>

              {item.items.length > 0 && activeItem === item.title && (
                <div className='ml-8 mt-2 space-y-1'>
                  {item.items.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      className='block w-full text-left px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded'
                    >
                      {subItem}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 材质库 Section Header */}
        <div className='p-3 border-t border-gray-200 border-b border-gray-200'>
          <div className='flex items-center space-x-2'>
            <BarChart3 size={18} color={COLORS.PRIMARY_BLUE} />
            <h2 className='text-base font-bold text-gray-700'>材质库</h2>
          </div>
        </div>

        {/* 材质库 Content - Scrollable Control Items Section */}
        <div className='overflow-y-auto' style={{ height: '300px' }}>
          <div className='p-4'>
            <div className='grid grid-cols-2 gap-4'>
              {controlItems.map((item, index) => (
                <div
                  key={index}
                  className='bg-gray-50 rounded-lg p-4 text-center'
                >
                  <div className='text-sm font-bold text-gray-800'>
                    {item.label}
                  </div>
                  {item.sublabel && (
                    <div className='text-xs font-medium text-gray-600 mt-1'>
                      {item.sublabel}
                    </div>
                  )}
                  {item.value && (
                    <div
                      className='text-xs font-bold font-mono mt-1'
                      style={{ color: COLORS.PRIMARY_BLUE }}
                    >
                      {item.value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* 设备库 Section */}
        <div className='p-3 border-t border-gray-200 border-b border-gray-200'>
          <div className='flex items-center space-x-2'>
            <Settings size={18} color={COLORS.PRIMARY_BLUE} />
            <h2 className='text-base font-bold text-gray-700'>设备库</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
