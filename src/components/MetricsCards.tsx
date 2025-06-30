'use client'

import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const MetricsCards: React.FC = () => {
  const metrics = [
    {
      title: '链路可靠性',
      value: '99.72%',
      change: '较上月提升0.15%',
      trend: 'up'
    },
    {
      title: '覆盖效率',
      value: '98.4%',
      change: '较上月提升1.2%',
      trend: 'up'
    },
    {
      title: '平均增益',
      value: '12.6dB',
      change: '较上月提升2.4dB',
      trend: 'up'
    },
    {
      title: '设备健康度',
      value: '96.8%',
      change: '较上月提升0.8%',
      trend: 'up'
    }
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={20} className='text-green-500' />
      case 'down':
        return <TrendingDown size={20} className='text-red-500' />
      default:
        return <Minus size={20} className='text-gray-500' />
    }
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {metrics.map((metric, index) => (
        <div
          key={index}
          className='p-6 rounded-lg border bg-white shadow-sm border-l-4'
          style={{ borderLeftColor: '#1a6fb0' }}
        >
          <div className='flex items-center justify-between mb-3'>
            <span className='text-base font-medium text-gray-600'>
              {metric.title}
            </span>
            {getTrendIcon(metric.trend)}
          </div>
          <div className='text-3xl font-bold text-gray-800 mb-2'>
            {metric.value}
          </div>
          <div className='text-sm text-green-600'>{metric.change}</div>
        </div>
      ))}
    </div>
  )
}

export default MetricsCards
