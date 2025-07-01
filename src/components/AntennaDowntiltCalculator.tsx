'use client'

import React, { useState } from 'react'
import { Calculator, Target, TrendingDown } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import { COLORS } from '../constants/colors'

const AntennaDowntiltCalculator: React.FC = () => {
  const [inputs, setInputs] = useState({
    txHeight: '', // TX发射端高度
    rxHeight: '', // RX接收端高度
    distance: '', // 距离 (m)
    beamWidth: '', // 波束宽度 (度)
    inputType: 'distance', // 输入类型: 'distance' 或 'downtilt'
    globalUnit: 'meter' // 全局长度单位
  })

  const [results, setResults] = useState({
    downtiltAngle: '', // 下倾角
    innerCoverageRadius: '', // 内覆盖半径 (ft)
    outerCoverageRadius: '' // 外覆盖半径 (ft)
  })

  // 单位转换函数 - 转换为米
  const convertToMeters = (value: number, unit: string): number => {
    switch (unit) {
      case 'meter':
        return value
      case 'feet':
        return value * 0.3048
      case 'kilometer':
        return value * 1000
      case 'mile':
        return value * 1609.34
      case 'yard':
        return value * 0.9144
      case 'inch':
        return value * 0.0254
      case 'centimeter':
        return value * 0.01
      default:
        return value
    }
  }

  // 单位转换函数 - 从米转换为指定单位
  const convertFromMeters = (value: number, unit: string): number => {
    switch (unit) {
      case 'meter':
        return value
      case 'feet':
        return value / 0.3048
      case 'kilometer':
        return value / 1000
      case 'mile':
        return value / 1609.34
      case 'yard':
        return value / 0.9144
      case 'inch':
        return value / 0.0254
      case 'centimeter':
        return value / 0.01
      default:
        return value
    }
  }

  // 获取单位显示文本
  const getUnitText = (unit: string): string => {
    switch (unit) {
      case 'meter':
        return '米(m)'
      case 'feet':
        return '英尺(ft)'
      case 'kilometer':
        return '千米(km)'
      case 'mile':
        return '英里(mi)'
      case 'yard':
        return '码(yd)'
      case 'inch':
        return '英寸(in)'
      case 'centimeter':
        return '厘米(cm)'
      default:
        return '米(m)'
    }
  }

  // 计算天线下倾角或接收距离
  const calculateDowntilt = () => {
    const { txHeight, rxHeight, distance, beamWidth, inputType, globalUnit } =
      inputs

    // 检查输入是否有效
    const txHeightNum = parseFloat(txHeight as string) || 0
    const rxHeightNum = parseFloat(rxHeight as string) || 0
    const distanceNum = parseFloat(distance as string) || 0
    const beamWidthNum = parseFloat(beamWidth as string) || 0

    if (
      txHeightNum <= 0 ||
      rxHeightNum < 0 ||
      distanceNum <= 0 ||
      beamWidthNum <= 0
    ) {
      alert('请输入有效的数值')
      return
    }

    // 转换高度为米
    const txHeightInMeters = convertToMeters(txHeightNum, globalUnit)
    const rxHeightInMeters = convertToMeters(rxHeightNum, globalUnit)
    const heightDiff = txHeightInMeters - rxHeightInMeters

    let downtiltAngle: number
    let calculatedDistance: number

    if (inputType === 'distance') {
      // 用户输入距离，计算下倾角
      const distanceInMeters = convertToMeters(distanceNum, globalUnit)
      downtiltAngle = Math.atan(heightDiff / distanceInMeters) * (180 / Math.PI)
      calculatedDistance = distanceInMeters
    } else {
      // 用户输入下倾角，计算距离
      downtiltAngle = distanceNum // 下倾角已经是度数
      const downtiltAngleRad = (downtiltAngle * Math.PI) / 180
      calculatedDistance = heightDiff / Math.tan(downtiltAngleRad)
    }

    // 覆盖半径计算 (基于波束宽度)
    const beamWidthRad = (beamWidthNum * Math.PI) / 180
    const downtiltAngleRad = (Math.abs(downtiltAngle) * Math.PI) / 180

    const innerRadiusMeters =
      txHeightInMeters * Math.tan(downtiltAngleRad - beamWidthRad / 2)
    const outerRadiusMeters =
      txHeightInMeters * Math.tan(downtiltAngleRad + beamWidthRad / 2)

    // 转换结果到匹配的单位
    const targetUnit = globalUnit
    const innerRadiusConverted = convertFromMeters(
      Math.abs(innerRadiusMeters),
      targetUnit
    )
    const outerRadiusConverted = convertFromMeters(
      Math.abs(outerRadiusMeters),
      targetUnit
    )

    // 设置结果
    const primaryResult =
      inputType === 'distance'
        ? downtiltAngle.toFixed(2)
        : convertFromMeters(Math.abs(calculatedDistance), targetUnit).toFixed(2)

    setResults({
      downtiltAngle: primaryResult,
      innerCoverageRadius: innerRadiusConverted.toFixed(2),
      outerCoverageRadius: outerRadiusConverted.toFixed(2)
    })
  }

  // Removed automatic calculation - now triggered by button click

  const handleInputChange = (key: string, value: string | number) => {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  const handleCalculate = () => {
    calculateDowntilt()
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
        <div className='h-full overflow-y-auto'>
          <div
            className='rounded-lg shadow-sm p-6 min-h-full flex flex-col'
            style={{ backgroundColor: '#f3f4f6' }}
          >
            {/* Page Title */}
            <div className='border-b border-gray-200 pb-6 mb-8'>
              <div className='flex items-center mb-3'>
                <Calculator
                  size={24}
                  color={COLORS.PRIMARY_BLUE}
                  className='mr-3'
                />
                <h1 className='text-2xl font-semibold text-gray-800'>
                  天线下倾角和覆盖范围计算器
                </h1>
              </div>
              <div className='text-sm text-gray-600 space-y-2'>
                <p>
                  输入天线的高度和它们之间的距离，计算正确的天线下倾角。该计算器将帮助您确定发射天线的大致向下角度，以便在最佳覆盖范围内传播信号。除了倾斜的角度外，该工具还将根据天线的波束宽度为您提供覆盖范围的内半径和外半径。
                </p>
                <p className='text-xs'>结果单位将自动匹配您选择的输入单位。</p>
              </div>
            </div>

            {/* Input Section */}
            <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
              <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center'>
                  <Target
                    size={20}
                    color={COLORS.PRIMARY_BLUE}
                    className='mr-2'
                  />
                  <h2 className='text-lg font-semibold text-gray-800'>输入</h2>
                </div>
                <div className='flex items-center'>
                  <label className='text-sm font-medium text-gray-700 mr-2'>
                    长度单位:
                  </label>
                  <select
                    value={inputs.globalUnit}
                    onChange={(e) =>
                      handleInputChange('globalUnit', e.target.value)
                    }
                    className='px-3 py-1 border border-gray-300 rounded-md bg-gray-50 text-sm'
                  >
                    <option value='meter'>米(m)</option>
                    <option value='feet'>英尺(ft)</option>
                    <option value='kilometer'>千米(km)</option>
                    <option value='mile'>英里(mi)</option>
                    <option value='yard'>码(yd)</option>
                    <option value='inch'>英寸(in)</option>
                    <option value='centimeter'>厘米(cm)</option>
                  </select>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6'>
                {/* TX发射端高度 */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    TX发射端高度
                  </label>
                  <div className='flex'>
                    <input
                      type='number'
                      value={inputs.txHeight}
                      onChange={(e) =>
                        handleInputChange('txHeight', e.target.value)
                      }
                      className='flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder='输入发射端天线高度'
                    />
                    <span className='px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm'>
                      {getUnitText(inputs.globalUnit)}
                    </span>
                  </div>
                </div>

                {/* RX接收端高度 */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    RX接收端高度
                  </label>
                  <div className='flex'>
                    <input
                      type='number'
                      value={inputs.rxHeight}
                      onChange={(e) =>
                        handleInputChange('rxHeight', e.target.value)
                      }
                      className='flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder='输入接收端高度'
                    />
                    <span className='px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm'>
                      {getUnitText(inputs.globalUnit)}
                    </span>
                  </div>
                </div>

                {/* 距离/下倾角 */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {inputs.inputType === 'distance' ? '距离' : '下倾角'}
                  </label>
                  <div className='flex'>
                    <select
                      value={inputs.inputType}
                      onChange={(e) =>
                        handleInputChange('inputType', e.target.value)
                      }
                      className='px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50'
                    >
                      <option value='distance'>距离</option>
                      <option value='downtilt'>下倾角</option>
                    </select>
                    <input
                      type='number'
                      value={inputs.distance}
                      onChange={(e) =>
                        handleInputChange('distance', e.target.value)
                      }
                      className='flex-1 px-3 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder={
                        inputs.inputType === 'distance'
                          ? '输入距离'
                          : '输入下倾角'
                      }
                    />
                    {inputs.inputType === 'distance' ? (
                      <span className='px-3 py-2 border border-gray-300 rounded-r-md bg-gray-50 text-sm'>
                        {getUnitText(inputs.globalUnit)}
                      </span>
                    ) : (
                      <span className='px-3 py-2 border border-gray-300 rounded-r-md bg-gray-50 text-sm'>
                        °(度)
                      </span>
                    )}
                  </div>
                </div>

                {/* 波束宽度 */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    波束宽度
                  </label>
                  <div className='flex'>
                    <input
                      type='number'
                      value={inputs.beamWidth}
                      onChange={(e) =>
                        handleInputChange('beamWidth', e.target.value)
                      }
                      className='flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder='输入天线波束宽度'
                    />
                    <span className='px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm'>
                      °(度)
                    </span>
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                className='px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors'
              >
                计算
              </button>
            </div>

            {/* Results Section */}
            <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
              <div className='flex items-center mb-6'>
                <TrendingDown
                  size={20}
                  color={COLORS.PRIMARY_BLUE}
                  className='mr-2'
                />
                <h2 className='text-lg font-semibold text-gray-800'>结果</h2>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* Downtilt Angle or Receiver Distance */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {inputs.inputType === 'distance'
                      ? 'Downtilt Angle'
                      : 'Receiver Distance'}
                  </label>
                  <div className='flex'>
                    <input
                      type='text'
                      value={`${results.downtiltAngle}`}
                      readOnly
                      className='flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50'
                    />
                    <span className='px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-100 text-sm'>
                      {inputs.inputType === 'distance'
                        ? '°(度)'
                        : getUnitText(inputs.globalUnit)}
                    </span>
                  </div>
                </div>

                {/* 内覆盖半径 */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    内覆盖半径
                  </label>
                  <div className='flex'>
                    <input
                      type='text'
                      value={`${results.innerCoverageRadius}`}
                      readOnly
                      className='flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50'
                    />
                    <span className='px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-100 text-sm'>
                      {getUnitText(inputs.globalUnit)}
                    </span>
                  </div>
                </div>

                {/* 外覆盖半径 */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    外覆盖半径
                  </label>
                  <div className='flex'>
                    <input
                      type='text'
                      value={`${results.outerCoverageRadius}`}
                      readOnly
                      className='flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50'
                    />
                    <span className='px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-100 text-sm'>
                      {getUnitText(inputs.globalUnit)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Card */}
            <div className='bg-white rounded-lg shadow-sm p-6 flex-1 flex flex-col'>
              <div className='flex items-center mb-4'>
                <div className='w-2 h-2 bg-blue-500 rounded-full mr-2'></div>
                <h2 className='text-lg font-semibold text-gray-800'>说明</h2>
              </div>

              <div className='flex gap-6 flex-1'>
                <div className='space-y-4 text-base text-gray-700 leading-relaxed flex-1'>
                  <div>
                    <span className='font-medium text-gray-800'>
                      内覆盖半径:
                    </span>{' '}
                    该区域的客户端难以连接到AP时，不属天线信号主覆盖区（塔下黑区域）
                  </div>

                  <div>
                    <span className='font-medium text-gray-800'>
                      外覆盖半径:
                    </span>{' '}
                    天线的最大半径覆盖范围
                  </div>

                  <div>
                    <span className='font-medium text-gray-800'>
                      垂直波束宽度:
                    </span>{' '}
                    天线的垂直发射波束宽度，通常天线参数中可查到
                  </div>

                  <div>
                    <span className='font-medium text-gray-800'>H:</span>{' '}
                    发射端天线安装高度
                  </div>

                  <div className='w-full h-px bg-gray-200 my-4'></div>

                  <div className='pt-2'>
                    <p>
                      <span className='font-medium text-gray-800'>
                        施工时，
                      </span>
                      大多是向下倾斜，因为要获得更好的覆盖面通常都要安装在较高位置。如果输入的接收端高度&gt;发射端高度时计算结果为负则为向上倾斜。
                    </p>
                  </div>
                </div>

                <div className='flex-shrink-0 -mt-12'>
                  <img
                    src='/wlan-downtilt.png'
                    alt='天线下倾角示意图'
                    className='w-[500px] h-auto rounded-lg shadow-sm'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AntennaDowntiltCalculator
