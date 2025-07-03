'use client'

import React, { useState } from 'react'
import { Radio, BarChart3 } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import { COLORS } from '../constants/colors'
import dynamic from 'next/dynamic'

// Dynamically import LeafletMap to avoid SSR issues
const LeafletMapComponent = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className='flex-1 flex items-center justify-center bg-blue-100 rounded-lg'>
      <div className='text-blue-600'>Loading interactive map...</div>
    </div>
  )
})

const MapView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('卫星地图')
  const [coordinateSelectionMode, setCoordinateSelectionMode] = useState<
    'tx' | 'rx' | null
  >(null)
  const [txLatitude, setTxLatitude] = useState('')
  const [txLongitude, setTxLongitude] = useState('')
  const [rxLatitude, setRxLatitude] = useState('')
  const [rxLongitude, setRxLongitude] = useState('')
  const [selectedCoordinates, setSelectedCoordinates] = useState<{
    tx?: { lat: number; lng: number }
    rx?: { lat: number; lng: number }
  }>({})
  const [searchLatitude, setSearchLatitude] = useState('')
  const [searchLongitude, setSearchLongitude] = useState('')
  const [mapCenter, setMapCenter] = useState<{
    lat: number
    lng: number
  } | null>({
    lat: 38.81995,
    lng: 100.145738
  })

  const handleCoordinateSelection = (lat: number, lng: number) => {
    if (coordinateSelectionMode === 'tx') {
      // Update both TX coordinates
      setTxLatitude(lat.toFixed(6))
      setTxLongitude(lng.toFixed(6))

      // Update TX marker position
      setSelectedCoordinates((prev) => ({
        ...prev,
        tx: { lat, lng }
      }))
    } else if (coordinateSelectionMode === 'rx') {
      // Update both RX coordinates
      setRxLatitude(lat.toFixed(6))
      setRxLongitude(lng.toFixed(6))

      // Update RX marker position
      setSelectedCoordinates((prev) => ({
        ...prev,
        rx: { lat, lng }
      }))
    }
    setCoordinateSelectionMode(null)
    setActiveTab('参数设置')
  }

  const handleMapPinClick = (mode: 'tx' | 'rx') => {
    setCoordinateSelectionMode(mode)
    setActiveTab('卫星地图')
  }

  const handleSearchCoordinates = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      const lat = parseFloat(searchLatitude.trim())
      const lng = parseFloat(searchLongitude.trim())

      // Check if both fields have valid numbers
      if (isNaN(lat) || isNaN(lng)) {
        alert('请输入有效的数字格式')
        return
      }

      // Validate coordinate ranges
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        setMapCenter({ lat, lng })
      } else {
        alert('请输入有效的坐标范围:\n纬度: -90 到 90\n经度: -180 到 180')
      }
    }
  }

  const tabs = ['参数设置', '卫星地图', '计算结果']

  const renderTabContent = () => {
    switch (activeTab) {
      case '参数设置':
        return (
          <div className='h-full overflow-y-auto bg-gray-100 p-4'>
            <div className='w-full px-32'>
              {/* Instructions */}
              <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
                <p className='text-sm text-blue-800'>
                  1. 输入发射和接收设备信息，
                  <span className='text-red-600'>
                    红线区(或从地图上选择位置)
                  </span>{' '}
                  2.
                  点击计算并查看分析结果。只支持Chrome、Firefox、IE11等浏览器正常显示
                  <a href='#' className='text-blue-600 underline ml-1'>
                    现地例子
                  </a>
                </p>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {/* 发射站 (TX) */}
                <div className='bg-white rounded-lg shadow-sm p-8'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                    发射站(TX)
                  </h3>

                  {/* 名称 */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 bg-yellow-100 px-3 py-2 rounded-t border'>
                      名称
                    </label>
                    <input
                      type='text'
                      className='w-full border border-t-0 rounded-b px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </div>

                  {/* 无线设备类型 */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 bg-yellow-100 px-3 py-2 rounded-t border'>
                      无线设备类型
                    </label>
                    <select className='w-full border border-t-0 rounded-b px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                      <option>自定义设备</option>
                    </select>
                  </div>

                  {/* 纬度 */}
                  <div className='mb-4'>
                    <label className='flex items-center text-sm font-medium text-gray-700 bg-yellow-100 px-3 py-2 rounded-t border'>
                      纬度
                      <button
                        onClick={() => handleMapPinClick('tx')}
                        className='text-orange-500 ml-2 hover:text-orange-600 cursor-pointer'
                        type='button'
                      >
                        📍
                      </button>
                    </label>
                    <div className='flex border border-t-0 rounded-b'>
                      <input
                        type='text'
                        placeholder='地图选点或手动输入'
                        value={txLatitude}
                        onChange={(e) => setTxLatitude(e.target.value)}
                        className='flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      />
                      <span className='px-3 py-2 bg-gray-50 border-l'>°</span>
                    </div>
                    <p className='text-xs text-gray-500 mt-1'>
                      输入度分秒"xx°xx'xxx"
                      度分秒"xx°xx'xx.xxx"将自动转换成xx.xxxxxx°格式
                    </p>
                  </div>

                  {/* 经度 */}
                  <div className='mb-4'>
                    <label className='flex items-center text-sm font-medium text-gray-700 bg-yellow-100 px-3 py-2 rounded-t border'>
                      经度
                    </label>
                    <div className='flex border border-t-0 rounded-b'>
                      <input
                        type='text'
                        placeholder='地图选点或手动输入'
                        value={txLongitude}
                        onChange={(e) => setTxLongitude(e.target.value)}
                        className='flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      />
                      <span className='px-3 py-2 bg-gray-50 border-l'>°</span>
                    </div>
                  </div>

                  {/* 天线信息 */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 bg-yellow-100 px-3 py-2 rounded-t border'>
                      天线信息
                    </label>
                    <div className='border border-t-0 rounded-b p-3 space-y-3'>
                      <div className='flex items-center space-x-3'>
                        <span className='text-sm'>增益</span>
                        <input
                          type='number'
                          className='border rounded px-2 py-1 w-20'
                        />
                        <span className='text-sm'>dBi</span>
                      </div>
                      <div className='flex items-center space-x-3'>
                        <span className='text-sm'>立杆铁塔高度</span>
                        <input
                          type='number'
                          defaultValue='0'
                          className='border rounded px-2 py-1 w-20'
                        />
                        <span className='text-sm'>m</span>
                      </div>
                    </div>
                  </div>

                  {/* 发射功率 */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 bg-yellow-100 px-3 py-2 rounded-t border'>
                      发射功率(Tx Power)
                    </label>
                    <div className='flex border border-t-0 rounded-b'>
                      <input
                        type='number'
                        className='flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      />
                      <select className='border-l px-3 py-2 bg-gray-50'>
                        <option>dBm</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 接收站 (RX) */}
                <div className='bg-white rounded-lg shadow-sm p-8'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                    接收站(RX)
                  </h3>

                  {/* 名称 */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 bg-yellow-100 px-3 py-2 rounded-t border'>
                      名称
                    </label>
                    <input
                      type='text'
                      className='w-full border border-t-0 rounded-b px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </div>

                  {/* 无线设备类型 */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 bg-yellow-100 px-3 py-2 rounded-t border'>
                      无线设备类型
                    </label>
                    <select className='w-full border border-t-0 rounded-b px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                      <option>自定义设备</option>
                    </select>
                  </div>

                  {/* 纬度 */}
                  <div className='mb-4'>
                    <label className='flex items-center text-sm font-medium text-gray-700 bg-yellow-100 px-3 py-2 rounded-t border'>
                      纬度
                      <button
                        onClick={() => handleMapPinClick('rx')}
                        className='text-orange-500 ml-2 hover:text-orange-600 cursor-pointer'
                        type='button'
                      >
                        📍
                      </button>
                    </label>
                    <div className='flex border border-t-0 rounded-b'>
                      <input
                        type='text'
                        placeholder='地图选点或手动输入'
                        value={rxLatitude}
                        onChange={(e) => setRxLatitude(e.target.value)}
                        className='flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      />
                      <span className='px-3 py-2 bg-gray-50 border-l'>°</span>
                    </div>
                    <p className='text-xs text-gray-500 mt-1'>
                      输入度分秒"xx°xx'xxx"
                      度分秒"xx°xx'xx.xxx"将自动转换成xx.xxxxxx°格式
                    </p>
                  </div>

                  {/* 经度 */}
                  <div className='mb-4'>
                    <label className='flex items-center text-sm font-medium text-gray-700 bg-yellow-100 px-3 py-2 rounded-t border'>
                      经度
                    </label>
                    <div className='flex border border-t-0 rounded-b'>
                      <input
                        type='text'
                        placeholder='地图选点或手动输入'
                        value={rxLongitude}
                        onChange={(e) => setRxLongitude(e.target.value)}
                        className='flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      />
                      <span className='px-3 py-2 bg-gray-50 border-l'>°</span>
                    </div>
                  </div>

                  {/* 天线信息 */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 bg-yellow-100 px-3 py-2 rounded-t border'>
                      天线信息
                    </label>
                    <div className='border border-t-0 rounded-b p-3 space-y-3'>
                      <div className='flex items-center space-x-3'>
                        <span className='text-sm'>增益</span>
                        <input
                          type='number'
                          className='border rounded px-2 py-1 w-20'
                        />
                        <span className='text-sm'>dBi</span>
                      </div>
                      <div className='flex items-center space-x-3'>
                        <span className='text-sm'>立杆铁塔高度</span>
                        <input
                          type='number'
                          defaultValue='0'
                          className='border rounded px-2 py-1 w-20'
                        />
                        <span className='text-sm'>m</span>
                      </div>
                    </div>
                  </div>

                  {/* 接收门限 */}
                  <div className='mb-4'>
                    <label className='flex items-center text-sm font-medium text-gray-700 bg-yellow-100 px-3 py-2 rounded-t border'>
                      接收门限(Rx Threshold)
                    </label>
                    <div className='flex border border-t-0 rounded-b'>
                      <input
                        type='number'
                        defaultValue='-95'
                        className='flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      />
                      <span className='px-3 py-2 bg-gray-50 border-l'>dBm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 其它参数 */}
              <div className='bg-white rounded-lg shadow-sm p-8 mt-6'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                  其它参数
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 bg-yellow-100 px-3 py-2 rounded-t border'>
                      频率
                    </label>
                    <div className='flex border border-t-0 rounded-b'>
                      <input
                        type='number'
                        className='flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      />
                      <span className='px-3 py-2 bg-gray-50 border-l'>MHz</span>
                    </div>
                  </div>
                  <div>
                    <label className='flex items-center text-sm font-medium text-gray-700 bg-yellow-100 px-3 py-2 rounded-t border'>
                      线缆损耗(Tx+Rx)
                    </label>
                    <div className='flex border border-t-0 rounded-b'>
                      <input
                        type='number'
                        defaultValue='0'
                        className='flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      />
                      <span className='px-3 py-2 bg-gray-50 border-l'>dB</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 计算按钮 */}
              <div className='text-center mt-6'>
                <button className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg shadow-lg transition-colors'>
                  传输链路计算
                </button>
                <button className='ml-4 text-orange-500 hover:text-orange-600 text-sm'>
                  🔗 分享数据
                </button>
              </div>
            </div>
          </div>
        )
      case '卫星地图':
        return (
          <div className='h-full rounded-lg overflow-hidden relative'>
            {/* Minimalist Search Box - Floating on Left Corner */}
            <div className='absolute top-[10px] left-16 z-[1000] flex space-x-1'>
              <div className='flex bg-white/90 backdrop-blur-sm border border-gray-300 rounded shadow-sm'>
                <input
                  type='text'
                  value={searchLatitude}
                  onChange={(e) => setSearchLatitude(e.target.value)}
                  onKeyDown={handleSearchCoordinates}
                  placeholder='纬度'
                  className='w-24 bg-transparent px-2 py-1 text-xs focus:outline-none border-none'
                />
                <span className='px-1 py-1 text-xs text-gray-600 bg-gray-50/90 border-l border-gray-300'>
                  N
                </span>
              </div>
              <div className='flex bg-white/90 backdrop-blur-sm border border-gray-300 rounded shadow-sm'>
                <input
                  type='text'
                  value={searchLongitude}
                  onChange={(e) => setSearchLongitude(e.target.value)}
                  onKeyDown={handleSearchCoordinates}
                  placeholder='经度'
                  className='w-24 bg-transparent px-2 py-1 text-xs focus:outline-none border-none'
                />
                <span className='px-1 py-1 text-xs text-gray-600 bg-gray-50/90 border-l border-gray-300'>
                  E
                </span>
              </div>
              <button
                onClick={() => {
                  const lat = parseFloat(searchLatitude.trim())
                  const lng = parseFloat(searchLongitude.trim())

                  if (isNaN(lat) || isNaN(lng)) {
                    alert('请输入有效的数字格式')
                    return
                  }

                  if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
                    setMapCenter({ lat, lng })
                  } else {
                    alert(
                      '请输入有效的坐标范围:\n纬度: -90 到 90\n经度: -180 到 180'
                    )
                  }
                }}
                className='bg-blue-600/90 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors shadow-sm backdrop-blur-sm'
              >
                搜索
              </button>
            </div>

            {coordinateSelectionMode && (
              <div className='absolute top-0 left-0 right-0 z-[1001] bg-blue-600 text-white p-3 text-center'>
                <p className='text-sm'>
                  请在地图上点击选择
                  {coordinateSelectionMode === 'tx' ? '发射站' : '接收站'}
                  的坐标
                </p>
              </div>
            )}

            <LeafletMapComponent
              height='100%'
              onCoordinateSelect={
                coordinateSelectionMode ? handleCoordinateSelection : undefined
              }
              selectedCoordinates={selectedCoordinates}
              mapCenter={mapCenter}
              zoom={8}
            />
          </div>
        )
      case '计算结果':
        return (
          <div className='h-full overflow-y-auto bg-gray-50 rounded-lg'>
            <div className='p-6'>
              {/* Calculation Results Grid */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
                {/* 等效发射功率EIRP */}
                <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm font-medium text-gray-700'>
                      等效发射功率EIRP
                    </span>
                    <span className='text-lg font-bold text-gray-800'>
                      0.00 dBm
                    </span>
                  </div>
                </div>

                {/* 接收端RX端收到的信号强度 */}
                <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm font-medium text-gray-700'>
                      接收端RX端收到的信号强度
                    </span>
                    <span className='text-lg font-bold text-gray-800'>
                      0.00 dBm
                    </span>
                  </div>
                </div>

                {/* 信号衰减余量 */}
                <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm font-medium text-gray-700'>
                      信号衰减余量
                    </span>
                    <span className='text-lg font-bold text-gray-800'>
                      0.00 dB
                    </span>
                  </div>
                </div>

                {/* 直线距离 */}
                <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm font-medium text-gray-700'>
                      直线距离
                    </span>
                    <span className='text-lg font-bold text-gray-800'>
                      0.00 m
                    </span>
                  </div>
                </div>

                {/* 所有路径信号损失 */}
                <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm font-medium text-gray-700'>
                      所有路径信号损失
                    </span>
                    <span className='text-lg font-bold text-gray-800'>
                      0.00 dB
                    </span>
                  </div>
                </div>

                {/* First Fresnel半径区域 */}
                <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm font-medium text-gray-700'>
                      First Fresnel半径区域
                    </span>
                    <span className='text-lg font-bold text-gray-800'>
                      0.00 m
                    </span>
                  </div>
                </div>
              </div>

              {/* Path Analysis Section */}
              <div className='bg-gray-100 border border-gray-200 rounded-lg p-4 mb-6'>
                <div className='flex items-center mb-2'>
                  <Radio
                    size={20}
                    color={COLORS.PRIMARY_BLUE}
                    className='mr-2'
                  />
                  <h3 className='text-lg font-semibold text-gray-800'>
                    无线链路路径分析
                  </h3>
                </div>
                <p className='text-sm text-gray-600'>
                  (依据等高线来评估的初步数据，无法描述地物覆盖情况，市景等独立阻挡因素。工程现场需要专业测量才能准确评估)
                </p>
              </div>

              {/* Chart Section */}
              <div className='bg-white border border-gray-200 rounded-lg p-6'>
                <div className='flex items-center mb-4'>
                  <BarChart3
                    size={20}
                    color={COLORS.PRIMARY_BLUE}
                    className='mr-2'
                  />
                  <h3 className='text-lg font-semibold text-gray-800'>
                    链路预算分析图
                  </h3>
                  <button className='ml-auto flex items-center text-sm text-orange-600 hover:text-orange-800'>
                    <span className='mr-1'>🖨️</span>
                    打印视图
                  </button>
                </div>

                {/* Chart Legend */}
                <div className='flex flex-wrap gap-4 mb-4 text-sm'>
                  <div className='flex items-center'>
                    <div className='w-4 h-4 bg-green-500 rounded mr-2'></div>
                    <span>地面发射功率(含馈线损失)</span>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-4 h-4 bg-blue-500 rounded mr-2'></div>
                    <span>高度增益</span>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-4 h-4 bg-yellow-500 rounded mr-2'></div>
                    <span>First Fresnel区域</span>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-4 h-4 bg-red-500 rounded mr-2'></div>
                    <span>约0dB的First Fresnel区域(无阻塞)</span>
                  </div>
                </div>

                {/* Chart Area */}
                <div className='bg-gray-50 border border-gray-200 rounded p-4 h-96'>
                  <div className='h-full grid grid-cols-12 gap-1'>
                    {/* Y-axis labels */}
                    <div className='col-span-1 flex flex-col justify-between text-xs text-gray-600'>
                      <span>1 m</span>
                      <span>0 m</span>
                    </div>

                    {/* Chart area */}
                    <div className='col-span-11 relative border border-gray-300 bg-white'>
                      {/* Grid lines */}
                      <div className='absolute inset-0 grid grid-cols-10 grid-rows-10 gap-0'>
                        {Array.from({ length: 100 }).map((_, i) => (
                          <div
                            key={i}
                            className='border-r border-b border-gray-200 border-opacity-50'
                          ></div>
                        ))}
                      </div>

                      {/* Horizontal reference line */}
                      <div className='absolute inset-x-0 top-1/2 border-t-2 border-green-500'></div>

                      {/* Sample data line */}
                      <svg className='absolute inset-0 w-full h-full'>
                        <path
                          d='M 0 50% L 100% 50%'
                          stroke='#22c55e'
                          strokeWidth='2'
                          fill='none'
                        />
                      </svg>
                    </div>
                  </div>

                  {/* X-axis labels */}
                  <div className='grid grid-cols-12 gap-1 mt-2'>
                    <div className='col-span-1'></div>
                    <div className='col-span-11 flex justify-between text-xs text-gray-600'>
                      <span>0 m</span>
                      <span>0 m</span>
                      <span>0 m</span>
                      <span>0 m</span>
                      <span>0 m</span>
                      <span>1 m</span>
                      <span>1 m</span>
                      <span>1 m</span>
                      <span>1 m</span>
                      <span>1 m</span>
                      <span>1 m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      className='h-screen flex flex-col'
      style={{ backgroundColor: '#0c2461' }}
    >
      <div className='pt-2 px-2'>
        <Header />
      </div>
      <div
        className='flex-1 overflow-hidden p-2'
        style={{ backgroundColor: '#0c2461' }}
      >
        <div className='h-full'>
          <div
            className='rounded-lg shadow-sm h-full flex flex-col'
            style={{ backgroundColor: '#f3f4f6' }}
          >
            {/* Tab Navigation */}
            <div className='flex border-b border-gray-200 bg-white rounded-t-lg'>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className='flex-1 bg-white rounded-b-lg overflow-hidden'>
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MapView
