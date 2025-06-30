'use client'

import React, { useState } from 'react'

const NetworkMap: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)

  // Sample network nodes data
  const nodes = [
    { id: 1, x: 15, y: 25, type: 'primary', status: 'active', name: '主基站' },
    {
      id: 2,
      x: 35,
      y: 45,
      type: 'secondary',
      status: 'active',
      name: '中继站A'
    },
    {
      id: 3,
      x: 65,
      y: 35,
      type: 'secondary',
      status: 'active',
      name: '中继站B'
    },
    {
      id: 4,
      x: 25,
      y: 65,
      type: 'secondary',
      status: 'active',
      name: '中继站C'
    },
    {
      id: 5,
      x: 75,
      y: 60,
      type: 'secondary',
      status: 'active',
      name: '中继站D'
    },
    {
      id: 6,
      x: 85,
      y: 20,
      type: 'secondary',
      status: 'warning',
      name: '监控点E'
    }
  ]

  const links = [
    { from: 1, to: 2 },
    { from: 1, to: 4 },
    { from: 2, to: 3 },
    { from: 3, to: 5 },
    { from: 3, to: 6 }
  ]

  const getNodeColor = (type: string, status: string) => {
    if (status === 'warning') return '#ef4444' // red
    if (type === 'primary') return '#dc2626' // dark red
    return '#10b981' // green
  }

  // Axis labels to match the image
  const axisLabels = [
    '最高温度点',
    '基站温度点',
    '扩散温度点',
    '基站温度点',
    '最高温度点'
  ]

  return (
    <div className='relative w-full'>
      <div className='relative w-full h-80 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg overflow-hidden'>
        {/* Background grid pattern */}
        <div className='absolute inset-0 opacity-10'>
          <svg width='100%' height='100%'>
            <defs>
              <pattern
                id='grid'
                width='20'
                height='20'
                patternUnits='userSpaceOnUse'
              >
                <path
                  d='M 20 0 L 0 0 0 20'
                  fill='none'
                  stroke='white'
                  strokeWidth='1'
                />
              </pattern>
            </defs>
            <rect width='100%' height='100%' fill='url(#grid)' />
          </svg>
        </div>

        {/* Network connections */}
        <svg className='absolute inset-0 w-full h-full'>
          {links.map((link, index) => {
            const fromNode = nodes.find((n) => n.id === link.from)
            const toNode = nodes.find((n) => n.id === link.to)
            if (!fromNode || !toNode) return null

            return (
              <line
                key={index}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke='rgba(255,255,255,0.6)'
                strokeWidth='2'
                strokeDasharray='5,5'
              />
            )
          })}
        </svg>

        {/* Network nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className='absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer'
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div
              className='w-3 h-3 rounded-full shadow-lg transition-all duration-200 hover:scale-125'
              style={{
                backgroundColor: getNodeColor(node.type, node.status),
                boxShadow: '0 0 10px rgba(255,255,255,0.5)'
              }}
            >
              {/* Pulse animation for active nodes */}
              {node.status === 'active' && (
                <div
                  className='absolute inset-0 rounded-full animate-ping'
                  style={{
                    backgroundColor: getNodeColor(node.type, node.status),
                    opacity: 0.4
                  }}
                />
              )}
            </div>

            {/* Tooltip */}
            {hoveredNode === node.id && (
              <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded whitespace-nowrap'>
                {node.name}
                <div className='absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black border-opacity-75'></div>
              </div>
            )}
          </div>
        ))}

        {/* Legend */}
        <div className='absolute bottom-4 left-4 bg-white bg-opacity-90 rounded p-3 text-xs'>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-1'>
              <div className='w-2 h-2 bg-red-600 rounded-full'></div>
              <span>主基站</span>
            </div>
            <div className='flex items-center space-x-1'>
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              <span>中继站点</span>
            </div>
            <div className='flex items-center space-x-1'>
              <div className='w-2 h-2 bg-red-500 rounded-full'></div>
              <span>异常设备</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom axis labels */}
      <div className='mt-4 flex justify-between items-center px-4'>
        {axisLabels.map((label, index) => (
          <div key={index} className='text-xs text-gray-600 text-center'>
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NetworkMap
