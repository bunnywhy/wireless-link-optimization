'use client'

import React, { useState } from 'react'
import { Cable, Calculator } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import { COLORS } from '../constants/colors'

const CableLossCalculator: React.FC = () => {
  const [cableInputs, setCableInputs] = useState({
    cableType: 'other', // cable type
    frequency: '2440', // MHz
    lossPerHundredMeters: '4.0', // dB per 100m at frequency
    cableLength: '3', // meters
    connectorCount: '1'
  })

  const [cableResults, setCableResults] = useState({
    totalCableLoss: '0.3' // dB
  })

  // Calculate cable loss
  const calculateCableLoss = () => {
    const lossPerHundred = parseFloat(cableInputs.lossPerHundredMeters) || 0
    const length = parseFloat(cableInputs.cableLength) || 0
    const connectors = parseInt(cableInputs.connectorCount) || 0

    // Cable loss = (length / 100) * loss per 100m + connector loss (assume 0.1dB per connector)
    const cableLoss = (length / 100) * lossPerHundred + connectors * 0.1

    setCableResults({
      totalCableLoss: cableLoss.toFixed(1)
    })
  }

  const handleCableInputChange = (key: string, value: string) => {
    setCableInputs((prev) => ({ ...prev, [key]: value }))
  }

  const handleCalculate = () => {
    calculateCableLoss()
  }

  // Update cable loss when cable type changes
  const handleCableTypeChange = (cableType: string) => {
    let defaultLoss = '4.0'
    const freq = parseFloat(cableInputs.frequency) || 2440

    // Set typical loss values for common cable types at different frequencies
    switch (cableType) {
      case 'rg58':
        // RG-58: higher loss, thin coax
        defaultLoss = freq < 1000 ? '20.0' : freq < 2500 ? '30.0' : '35.0'
        break
      case 'rg213':
        // RG-213: medium loss, thick coax
        defaultLoss = freq < 1000 ? '5.0' : freq < 2500 ? '8.0' : '12.0'
        break
      case 'lmr400':
        // LMR-400: low loss
        defaultLoss = freq < 1000 ? '2.0' : freq < 2500 ? '4.0' : '6.0'
        break
      default:
        defaultLoss = '4.0'
    }

    setCableInputs((prev) => ({
      ...prev,
      cableType,
      lossPerHundredMeters: defaultLoss
    }))
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
                <Cable size={24} color={COLORS.PRIMARY_BLUE} className='mr-3' />
                <h1 className='text-2xl font-semibold text-gray-800'>
                  电缆损耗计算器
                </h1>
              </div>
              <div className='text-sm text-gray-600'>
                <p>
                  计算同轴电缆的射频损耗。输入电缆类型、长度和连接器数量，获得准确的信号衰减值。支持常见电缆类型的预设损耗值，也可以手动输入自定义损耗参数。
                </p>
              </div>
            </div>

            {/* Cable Loss Calculator */}
            <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Cable Input Section */}
                <div className='lg:col-span-2 flex flex-col'>
                  <div className='border border-gray-300 rounded p-4 flex-1'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                      输入参数
                    </h3>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          电缆类型
                        </label>
                        <select
                          value={cableInputs.cableType}
                          onChange={(e) =>
                            handleCableTypeChange(e.target.value)
                          }
                          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                          <option value='other'>其他...</option>
                          <option value='rg58'>RG-58 (细同轴电缆)</option>
                          <option value='rg213'>RG-213 (粗同轴电缆)</option>
                          <option value='lmr400'>LMR-400 (低损耗电缆)</option>
                        </select>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          频率
                        </label>
                        <div className='flex'>
                          <input
                            type='number'
                            value={cableInputs.frequency}
                            onChange={(e) =>
                              handleCableInputChange(
                                'frequency',
                                e.target.value
                              )
                            }
                            className='flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                          />
                          <span className='px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm'>
                            MHz
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          每100米衰减 (在{cableInputs.frequency}MHz时)
                        </label>
                        <div className='flex'>
                          <input
                            type='number'
                            value={cableInputs.lossPerHundredMeters}
                            onChange={(e) =>
                              handleCableInputChange(
                                'lossPerHundredMeters',
                                e.target.value
                              )
                            }
                            className='flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                          />
                          <span className='px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm'>
                            dB
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          电缆长度
                        </label>
                        <div className='flex'>
                          <input
                            type='number'
                            value={cableInputs.cableLength}
                            onChange={(e) =>
                              handleCableInputChange(
                                'cableLength',
                                e.target.value
                              )
                            }
                            className='flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                          />
                          <span className='px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm'>
                            米
                          </span>
                        </div>
                      </div>

                      <div className='md:col-span-2'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          连接器数量
                        </label>
                        <input
                          type='number'
                          value={cableInputs.connectorCount}
                          onChange={(e) =>
                            handleCableInputChange(
                              'connectorCount',
                              e.target.value
                            )
                          }
                          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <p className='text-xs text-gray-500 mt-1'>
                          每个连接器约增加0.1dB损耗
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cable Results Section */}
                <div className='space-y-6 flex flex-col'>
                  {/* Cable Results */}
                  <div className='border border-gray-300 rounded p-4 flex-1'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                      计算结果
                    </h3>

                    <div className='space-y-3'>
                      <div className='flex justify-between items-center'>
                        <span className='text-sm font-medium'>电缆总损耗:</span>
                        <span className='text-lg font-bold text-blue-600'>
                          {cableResults.totalCableLoss} dB
                        </span>
                      </div>

                      <div className='text-xs text-gray-500 space-y-1'>
                        <div>
                          • 电缆损耗:{' '}
                          {(
                            ((parseFloat(cableInputs.cableLength) || 0) / 100) *
                            (parseFloat(cableInputs.lossPerHundredMeters) || 0)
                          ).toFixed(1)}{' '}
                          dB
                        </div>
                        <div>
                          • 连接器损耗:{' '}
                          {(
                            (parseInt(cableInputs.connectorCount) || 0) * 0.1
                          ).toFixed(1)}{' '}
                          dB
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Common Cable Types Reference */}
                  <div className='border border-gray-300 rounded p-4'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                      常见电缆参考
                    </h3>

                    <div className='text-xs text-gray-600 space-y-2'>
                      <div>
                        <strong>RG-58:</strong> 细同轴电缆
                        <br />
                        2.4GHz时约30dB/100m
                      </div>
                      <div>
                        <strong>RG-213:</strong> 粗同轴电缆
                        <br />
                        2.4GHz时约8dB/100m
                      </div>
                      <div>
                        <strong>LMR-400:</strong> 低损耗电缆
                        <br />
                        2.4GHz时约4dB/100m
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <div className='mt-6'>
                <button
                  onClick={handleCalculate}
                  className='px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors'
                >
                  计算
                </button>
              </div>
            </div>

            {/* Description Card */}
            <div className='bg-white rounded-lg shadow-sm p-6 flex-1 flex flex-col'>
              <div className='flex items-center mb-4'>
                <div
                  className='w-2 h-2 rounded-full mr-2'
                  style={{ backgroundColor: COLORS.PRIMARY_BLUE }}
                ></div>
                <h3 className='text-lg font-semibold text-gray-800'>说明</h3>
              </div>

              <div className='text-base text-gray-600 space-y-4'>
                <div>
                  <span className='font-medium text-gray-800'>概述：</span>{' '}
                  电缆损耗计算器用于计算射频电缆在特定频率下的信号衰减。损耗主要包括电缆本身的传输损耗和连接器损耗两部分。
                </div>

                <div>
                  <span className='font-medium text-gray-800'>电缆类型：</span>{' '}
                  不同类型的电缆在相同频率下具有不同的损耗特性。RG-58为细同轴电缆，损耗较大但价格便宜；RG-213为粗同轴电缆，损耗中等；LMR-400为低损耗电缆，适用于长距离传输。
                </div>

                <div>
                  <span className='font-medium text-gray-800'>频率特性：</span>{' '}
                  电缆损耗随频率增加而增大。同一电缆在2.4GHz的损耗通常比在900MHz时高30-50%。因此选择电缆时需要考虑工作频率。
                </div>

                <div>
                  <span className='font-medium text-gray-800'>
                    连接器损耗：
                  </span>{' '}
                  每个射频连接器通常会引入0.1-0.3dB的损耗。计算器默认使用0.1dB，这是质量较好连接器的典型值。连接器质量差或接触不良会显著增加损耗。
                </div>

                <div>
                  <span className='font-medium text-gray-800'>应用建议：</span>{' '}
                  在设计射频链路时，应尽量选择低损耗电缆并减少连接器数量。对于长距离传输，即使低损耗电缆的成本较高，但能显著改善系统性能。
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

export default CableLossCalculator
