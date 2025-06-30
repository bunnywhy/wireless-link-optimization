'use client'

import React from 'react'

const OptimizationChart: React.FC = () => {
  // Sample optimization data
  const optimizationData = [
    { angle: 0, value: 0.8, label: '信号强度' },
    { angle: 60, value: 0.9, label: '传输效率' },
    { angle: 120, value: 0.7, label: '抗干扰' },
    { angle: 180, value: 0.85, label: '稳定性' },
    { angle: 240, value: 0.75, label: '覆盖范围' },
    { angle: 300, value: 0.95, label: '功耗控制' }
  ]

  const recommendations = [
    {
      type: '功率优化',
      status: 'optimal',
      description: '调整发射功率至理想值140*'
    },
    {
      type: '频率优化',
      status: 'warning',
      description: '建议调整为干扰较少的频段'
    },
    { type: '天线优化', status: 'good', description: '天线方向角度已优化' },
    { type: '链路优化', status: 'optimal', description: '链路质量达到最优状态' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'text-green-600 bg-green-100'
      case 'good':
        return 'text-blue-600 bg-blue-100'
      case 'warning':
        return 'text-orange-600 bg-orange-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'optimal':
        return '最优'
      case 'good':
        return '良好'
      case 'warning':
        return '注意'
      default:
        return '正常'
    }
  }

  // Generate SVG path for hexagonal radar chart
  const generateRadarPath = () => {
    const centerX = 80
    const centerY = 80
    const radius = 60

    const points = optimizationData.map((point) => {
      const angle = (point.angle - 90) * (Math.PI / 180)
      const r = radius * point.value
      const x = centerX + r * Math.cos(angle)
      const y = centerY + r * Math.sin(angle)
      return `${x},${y}`
    })

    return `M ${points.join(' L ')} Z`
  }

  // Generate hexagonal grid
  const generateHexagonPath = (radius: number) => {
    const centerX = 80
    const centerY = 80
    const points = []

    for (let i = 0; i < 6; i++) {
      const angle = (i * 60 - 90) * (Math.PI / 180)
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      points.push(`${x},${y}`)
    }

    return `M ${points.join(' L ')} Z`
  }

  return (
    <div className='space-y-6'>
      {/* Radar Chart */}
      <div className='bg-white rounded-lg shadow-sm p-6'>
        <div className='flex items-center mb-4'>
          <div className='w-3 h-3 bg-purple-500 rounded-full mr-2'></div>
          <h2 className='text-lg font-medium text-gray-800'>优化指标分析</h2>
        </div>

        <div className='flex justify-center'>
          <svg width='160' height='160' viewBox='0 0 160 160'>
            {/* Hexagonal grid */}
            {[20, 40, 60].map((r) => (
              <path
                key={r}
                d={generateHexagonPath(r)}
                fill='none'
                stroke='#e5e7eb'
                strokeWidth='1'
              />
            ))}

            {/* Grid lines from center to vertices */}
            {optimizationData.map((point, index) => {
              const angle = (point.angle - 90) * (Math.PI / 180)
              const x2 = 80 + 60 * Math.cos(angle)
              const y2 = 80 + 60 * Math.sin(angle)
              return (
                <line
                  key={index}
                  x1='80'
                  y1='80'
                  x2={x2}
                  y2={y2}
                  stroke='#e5e7eb'
                  strokeWidth='1'
                />
              )
            })}

            {/* Data area */}
            <path
              d={generateRadarPath()}
              fill='rgba(34, 197, 94, 0.2)'
              stroke='#22c55e'
              strokeWidth='2'
            />

            {/* Data points */}
            {optimizationData.map((point, index) => {
              const angle = (point.angle - 90) * (Math.PI / 180)
              const r = 60 * point.value
              const x = 80 + r * Math.cos(angle)
              const y = 80 + r * Math.sin(angle)
              return <circle key={index} cx={x} cy={y} r='3' fill='#22c55e' />
            })}

            {/* Labels */}
            {optimizationData.map((point, index) => {
              const angle = (point.angle - 90) * (Math.PI / 180)
              const labelRadius = 75
              const x = 80 + labelRadius * Math.cos(angle)
              const y = 80 + labelRadius * Math.sin(angle)
              return (
                <text
                  key={index}
                  x={x}
                  y={y}
                  textAnchor='middle'
                  dominantBaseline='middle'
                  className='fill-gray-600 text-xs'
                  fontSize='10'
                >
                  {point.label}
                </text>
              )
            })}
          </svg>
        </div>

        <div className='mt-4 text-center'>
          <div className='text-sm text-gray-600'>综合评分</div>
          <div className='text-2xl font-bold text-green-600'>82.1%</div>
        </div>
      </div>

      {/* System Status */}
      <div className='bg-white rounded-lg shadow-sm p-6'>
        <div className='flex items-center mb-4'>
          <div className='w-3 h-3 bg-blue-500 rounded-full mr-2'></div>
          <h2 className='text-lg font-medium text-gray-800'>系统运行状态</h2>
        </div>

        <div className='space-y-3'>
          <div className='flex justify-between items-center text-sm'>
            <span className='text-gray-600'>公网基站:</span>
            <span className='text-blue-600 font-mono'>16.8Mbps</span>
          </div>
          <div className='flex justify-between items-center text-sm'>
            <span className='text-gray-600'>信号强度:</span>
            <span className='text-green-600 font-mono'>正常</span>
          </div>
          <div className='flex justify-between items-center text-sm'>
            <span className='text-gray-600'>延时状态:</span>
            <span className='text-orange-600 font-mono'>12.1%</span>
          </div>
        </div>
      </div>

      {/* Optimization Recommendations */}
      <div className='bg-white rounded-lg shadow-sm p-6'>
        <div className='flex items-center mb-4'>
          <div className='w-3 h-3 bg-orange-500 rounded-full mr-2'></div>
          <h2 className='text-lg font-medium text-gray-800'>优化方案</h2>
        </div>

        <div className='space-y-3'>
          <div className='text-sm text-gray-600'>
            • 增强发射功率至理想值140*
          </div>
          <div className='text-sm text-gray-600'>• 调整发射方向至理想角度</div>
          <div className='text-sm text-gray-600'>• 提高信号接收效率10.8%</div>
          <div className='text-sm text-gray-600'>• 移动至理想收发位置</div>
        </div>
      </div>
    </div>
  )
}

export default OptimizationChart
