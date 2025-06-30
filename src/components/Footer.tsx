'use client'

import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer
      className='rounded-lg shadow-sm px-6 py-3 mx-2 mb-2'
      style={{ backgroundColor: '#f3f4f6' }}
    >
      <div className='text-center text-sm text-gray-600'>
        抽水蓄能电站无线链路设计优化工具 V1.0 © 2025
        中国电建集团西北勘测设计研究院有限公司研发
      </div>
    </footer>
  )
}

export default Footer
