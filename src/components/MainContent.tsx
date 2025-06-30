'use client'

import React from 'react'
import MetricsCards from './MetricsCards'
import NetworkMap from './NetworkMap'
import ControlPanel from './ControlPanel'

const MainContent: React.FC = () => {
  return (
    <div
      className='flex-1 overflow-hidden p-2'
      style={{ backgroundColor: '#0c2461' }}
    >
      {/* Single card container for all content */}
      <div
        className='rounded-lg shadow-sm p-8 h-full flex flex-col'
        style={{ backgroundColor: '#f3f4f6' }}
      >
        {/* Header Section */}
        <div className='border-b border-gray-200 pb-6 mb-8'>
          <div className='flex items-center mb-3'>
            <h1 className='text-2xl font-semibold text-gray-800'>系统概览</h1>
          </div>
          <p className='text-base text-gray-600'>
            上库区域 - 主站站内含量分析与优化
          </p>
        </div>

        {/* Metrics Cards - Fixed at top */}
        <div className='mb-8'>
          <MetricsCards />
        </div>

        {/* Scrollable content below MetricsCards */}
        <div className='flex-1 overflow-y-auto'>
          <div className='space-y-8'>
            {/* Network Map */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <div className='flex items-center mb-6'>
                <div className='w-4 h-4 bg-blue-500 rounded-full mr-3'></div>
                <h2 className='text-xl font-medium text-gray-800'>
                  上库区域GIS信号功率图
                </h2>
              </div>
              <NetworkMap />

              {/* Bottom legend sections */}
              <div className='grid grid-cols-5 gap-4 mt-6'>
                <div className='text-center'>
                  <div className='text-base text-gray-600 mb-2'>
                    🏠 候用模式
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-base text-gray-600 mb-2'>
                    🟡 强风模式
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-base text-gray-600 mb-2'>
                    🌡️ 高温模式
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-base text-gray-600 mb-2'>
                    ❄️ 低温模式
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-base text-gray-600 mb-2'>
                    ⚡ 清空信模式
                  </div>
                </div>
              </div>
            </div>

            {/* Control Panel */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <div className='flex items-center mb-6'>
                <div className='w-4 h-4 bg-green-500 rounded-full mr-3'></div>
                <h2 className='text-xl font-medium text-gray-800'>
                  设备参数设置
                </h2>
              </div>
              <ControlPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContent
