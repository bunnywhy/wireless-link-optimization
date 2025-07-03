'use client'

import React, { useState } from 'react'
import { Radio, Calculator, Target, TrendingDown, Cable } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import { COLORS } from '../constants/colors'

const RFLinkCalculator: React.FC = () => {
  const [linkInputs, setLinkInputs] = useState({
    frequency: '2440', // MHz
    transmitPower: '23', // dBm
    txCableLoss: '0.9', // dB
    transmitAntennaGain: '9', // dB
    distance: '10.0', // km or miles
    receiveAntennaGain: '24', // dB
    rxCableLoss: '0.9', // dB
    receiveSensitivity: '-90', // dBm
    fadeMargin: '24.0', // dB
    unitType: 'metric', // 'metric' or 'imperial'
    calculationType: 'fadeMargin' // 'fadeMargin', 'distance', 'transmitPower'
  })

  const [linkResults, setLinkResults] = useState({
    fadeMargin: '24.0', // dB
    freeSpaceLoss: '120.2', // dB
    receivedSignalStrength: '-66.0' // dBm
  })

  // Calculate free space loss
  const calculateFreeSpaceLoss = (
    frequency: number,
    distance: number
  ): number => {
    // Formula: FSL (dB) = 20*log10(distance) + 20*log10(frequency) + 32.44
    // distance in km, frequency in MHz
    return 20 * Math.log10(distance) + 20 * Math.log10(frequency) + 32.44
  }

  // Calculate RF link budget
  const calculateLinkBudget = () => {
    const freq = parseFloat(linkInputs.frequency) || 0
    const txPower = parseFloat(linkInputs.transmitPower) || 0
    const txCableLoss = parseFloat(linkInputs.txCableLoss) || 0
    const txAntennaGain = parseFloat(linkInputs.transmitAntennaGain) || 0
    const dist = parseFloat(linkInputs.distance) || 0
    const rxAntennaGain = parseFloat(linkInputs.receiveAntennaGain) || 0
    const rxCableLoss = parseFloat(linkInputs.rxCableLoss) || 0
    const rxSensitivity = parseFloat(linkInputs.receiveSensitivity) || 0

    // Convert distance to km if needed
    const distanceInKm =
      linkInputs.unitType === 'imperial' ? dist * 1.60934 : dist

    // Calculate free space loss
    const fsl = calculateFreeSpaceLoss(freq, distanceInKm)

    // Calculate received signal strength
    // RSL = TxPower - TxCableLoss + TxAntennaGain - FSL + RxAntennaGain - RxCableLoss
    const rsl =
      txPower - txCableLoss + txAntennaGain - fsl + rxAntennaGain - rxCableLoss

    // Calculate fade margin
    // Fade Margin = RSL - Receiver Sensitivity
    const fadeMargin = rsl - rxSensitivity

    setLinkResults({
      fadeMargin: fadeMargin.toFixed(1),
      freeSpaceLoss: fsl.toFixed(1),
      receivedSignalStrength: rsl.toFixed(1)
    })
  }

  const handleLinkInputChange = (key: string, value: string) => {
    setLinkInputs((prev) => ({ ...prev, [key]: value }))
  }

  const handleCalculate = () => {
    calculateLinkBudget()
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
                <Radio size={24} color={COLORS.PRIMARY_BLUE} className='mr-3' />
                <h1 className='text-2xl font-semibold text-gray-800'>
                  射频链路预算计算器
                </h1>
              </div>
              <div className='text-sm text-gray-600'>
                <p>
                  射频链路计算器可让您快速计算任意频段的空间损失、接收信号灵敏度、衰减余量、距离等，顺带的上同轴电缆射频损耗计算器，方便如载各种同轴电缆的损耗参数。
                </p>
              </div>
            </div>

            {/* RF Link Budget Calculator */}
            <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Input Section */}
                <div className='lg:col-span-2'>
                  <div className='border border-gray-300 rounded p-4'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                      输入参数
                    </h3>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          频率
                        </label>
                        <div className='flex'>
                          <input
                            type='number'
                            value={linkInputs.frequency}
                            onChange={(e) =>
                              handleLinkInputChange('frequency', e.target.value)
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
                          发射功率
                        </label>
                        <div className='flex'>
                          <input
                            type='number'
                            value={linkInputs.transmitPower}
                            onChange={(e) =>
                              handleLinkInputChange(
                                'transmitPower',
                                e.target.value
                              )
                            }
                            className='flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                          />
                          <span className='px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm'>
                            dBm
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Tx 电缆衰减
                        </label>
                        <div className='flex'>
                          <input
                            type='number'
                            value={linkInputs.txCableLoss}
                            onChange={(e) =>
                              handleLinkInputChange(
                                'txCableLoss',
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
                          发射天线增益
                        </label>
                        <div className='flex'>
                          <input
                            type='number'
                            value={linkInputs.transmitAntennaGain}
                            onChange={(e) =>
                              handleLinkInputChange(
                                'transmitAntennaGain',
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
                          距离
                        </label>
                        <div className='flex'>
                          <input
                            type='number'
                            value={linkInputs.distance}
                            onChange={(e) =>
                              handleLinkInputChange('distance', e.target.value)
                            }
                            className='flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                          />
                          <span className='px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm'>
                            {linkInputs.unitType === 'metric' ? '公里' : '英里'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          接收天线增益
                        </label>
                        <div className='flex'>
                          <input
                            type='number'
                            value={linkInputs.receiveAntennaGain}
                            onChange={(e) =>
                              handleLinkInputChange(
                                'receiveAntennaGain',
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
                          Rx 电缆衰减
                        </label>
                        <div className='flex'>
                          <input
                            type='number'
                            value={linkInputs.rxCableLoss}
                            onChange={(e) =>
                              handleLinkInputChange(
                                'rxCableLoss',
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
                          接收灵敏度
                        </label>
                        <div className='flex'>
                          <input
                            type='number'
                            value={linkInputs.receiveSensitivity}
                            onChange={(e) =>
                              handleLinkInputChange(
                                'receiveSensitivity',
                                e.target.value
                              )
                            }
                            className='flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                          />
                          <span className='px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm'>
                            dBm
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          衰减余量
                        </label>
                        <div className='flex'>
                          <input
                            type='number'
                            value={linkInputs.fadeMargin}
                            onChange={(e) =>
                              handleLinkInputChange(
                                'fadeMargin',
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
                    </div>
                  </div>
                </div>

                {/* Options and Results Section */}
                <div className='space-y-6 flex flex-col'>
                  {/* Options */}
                  <div className='border border-gray-300 rounded p-4'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                      选项
                    </h3>

                    <div className='space-y-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          单位
                        </label>
                        <div className='space-y-2'>
                          <label className='flex items-center'>
                            <input
                              type='radio'
                              name='unitType'
                              value='metric'
                              checked={linkInputs.unitType === 'metric'}
                              onChange={(e) =>
                                handleLinkInputChange(
                                  'unitType',
                                  e.target.value
                                )
                              }
                              className='mr-2'
                            />
                            <span className='text-sm'>公里/米</span>
                          </label>
                          <label className='flex items-center'>
                            <input
                              type='radio'
                              name='unitType'
                              value='imperial'
                              checked={linkInputs.unitType === 'imperial'}
                              onChange={(e) =>
                                handleLinkInputChange(
                                  'unitType',
                                  e.target.value
                                )
                              }
                              className='mr-2'
                            />
                            <span className='text-sm'>英里/英尺</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          计算
                        </label>
                        <div className='space-y-2'>
                          <label className='flex items-center'>
                            <input
                              type='radio'
                              name='calculationType'
                              value='fadeMargin'
                              checked={
                                linkInputs.calculationType === 'fadeMargin'
                              }
                              onChange={(e) =>
                                handleLinkInputChange(
                                  'calculationType',
                                  e.target.value
                                )
                              }
                              className='mr-2'
                            />
                            <span className='text-sm'>衰减余量</span>
                          </label>
                          <label className='flex items-center'>
                            <input
                              type='radio'
                              name='calculationType'
                              value='distance'
                              checked={
                                linkInputs.calculationType === 'distance'
                              }
                              onChange={(e) =>
                                handleLinkInputChange(
                                  'calculationType',
                                  e.target.value
                                )
                              }
                              className='mr-2'
                            />
                            <span className='text-sm'>距离</span>
                          </label>
                          <label className='flex items-center'>
                            <input
                              type='radio'
                              name='calculationType'
                              value='transmitPower'
                              checked={
                                linkInputs.calculationType === 'transmitPower'
                              }
                              onChange={(e) =>
                                handleLinkInputChange(
                                  'calculationType',
                                  e.target.value
                                )
                              }
                              className='mr-2'
                            />
                            <span className='text-sm'>发射功率</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className='border border-gray-300 rounded p-4 flex-1 flex flex-col'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                      结果
                    </h3>

                    <div className='space-y-3 flex-1'>
                      <div className='flex justify-between items-center'>
                        <span className='text-sm font-medium'>衰减余量:</span>
                        <span className='text-sm font-bold'>
                          {linkResults.fadeMargin} dB
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='text-sm font-medium'>
                          自由空间损失:
                        </span>
                        <span className='text-sm font-bold'>
                          {linkResults.freeSpaceLoss} dB
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='text-sm font-medium'>
                          接收信号强度:
                        </span>
                        <span className='text-sm font-bold'>
                          {linkResults.receivedSignalStrength} dBm
                        </span>
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
                <div className='w-2 h-2 bg-blue-500 rounded-full mr-2'></div>
                <h2 className='text-lg font-semibold text-gray-800'>说明</h2>
              </div>

              <div className='space-y-4 text-base text-gray-700 leading-relaxed'>
                <div>
                  <span className='font-medium text-gray-800'>概述：</span>{' '}
                  计算器工具假定两个站点之间存在射频链路。站点1被视为发射器Tx，站点2被视为接收器Rx。在每个站点，您都有一个通过射频电缆连接到天线的无线电。计算器假设您在两个天线之间是"可视"的。
                </div>

                <div>
                  <span className='font-medium text-gray-800'>计算模式：</span>{' '}
                  输入任何一组数值，计算器开始计算接收器Rx的自由空间损耗和信号强度。此外，您可以在选项中选择衰减余量、距离和发射功率作为输出选项。全方便用户在设计无线电链路时针对需求快速得到答案：距离（在保持可接受的衰减余量的情况下，所能获得的最远传输距离）、衰减余量（指定距离的无线链路时，我将获得多少衰减余量）、发射功率（在指定距离和衰减余量时，需要多大的发射功率）。
                </div>

                <div>
                  <span className='font-medium text-gray-800'>发射功率：</span>{' '}
                  AP/网桥的发射功率，以dBm为单位。
                </div>

                <div>
                  <span className='font-medium text-gray-800'>
                    接收灵敏度：
                  </span>{' '}
                  接收灵敏度是指无线设备正常工作所需的天线口的最小信号接收功率。系统间的干扰会导致无线设备灵敏度的下降，影响信号的正常接收，因此通常以无线设备灵敏度准则作为被干扰系统的保护准则。这是一个被普遍运行家经常忽略的重要参数。您可以理解为AP的听力等级，耳朵越灵敏越听得越清楚，即灵敏度越高，接收灵敏度是一个负值，负数越小则听得越清楚。普通家用无线路由器，802.11g的接收灵敏度通常为-85dBm，专业的AP可以最高到-105dBm。在表格中输入接收灵敏度时，需要输入您预期速率对应的灵敏度，如您无线网桥在满速时的接收灵敏度为-65dBm，如果您想要获得最大的传输速率则输入65；如果无线网桥最小接收灵敏度为-90（通常用不了，因为还存在各种噪声，在此只是举例方便用户理解，设计时可提高此值），则输入90即可计算只要能连上时的衰减余量或距离等结果。
                </div>

                <div>
                  <span className='font-medium text-gray-800'>衰减余量：</span>{' '}
                  译见衰减余量Fade
                  Margin,为避免一些移动物或计划外的因素影响，预留的冗余信号空间。比如大雾大雪或季节性长出来的树叶影响，要保证正常传输所需增加的衰减值。
                </div>

                <div>
                  <span className='font-medium text-gray-800'>
                    自由空间损失：
                  </span>{' '}
                  自由空间损失是指信号强度随着信号从其源向外辐射而降低。当您每次将距离增加一倍时没有障碍物时，信号会减少4倍。这相当于从您的信号强度中减去6dB。自由空间损失假设链接路径中没有障碍物，有时称为"视距"，但是要注意"视距"是指至少第一菲涅尔区的60%没有任何障碍物。
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

export default RFLinkCalculator
