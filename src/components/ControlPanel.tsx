'use client'

import React, { useState } from 'react'
import { COLORS } from '../constants/colors'

const ControlPanel: React.FC = () => {
  // Add styles for slider thumb
  const sliderThumbStyle = `
    .slider::-webkit-slider-thumb {
      appearance: none;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: ${COLORS.PRIMARY_BLUE};
      cursor: pointer;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    .slider::-moz-range-thumb {
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: ${COLORS.PRIMARY_BLUE};
      cursor: pointer;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
  `
  const [controls, setControls] = useState({
    transmitPower: 30,
    antennaGain: 12,
    antennaHeight: 35,
    groundHeight: 865,
    beamAngle: 45,
    elevation: 40,
    noise: 3,
    efficiency: 152
  })

  const handleSliderChange = (key: string, value: number) => {
    setControls((prev) => ({ ...prev, [key]: value }))
  }

  const controlItems = [
    {
      key: 'transmitPower',
      label: '发射功率',
      unit: 'dBm',
      min: 20,
      max: 40,
      step: 1
    },
    {
      key: 'antennaGain',
      label: '天线增益',
      unit: 'dBi',
      min: 0,
      max: 20,
      step: 1
    },
    {
      key: 'antennaHeight',
      label: '安装高度',
      unit: 'm',
      min: 0,
      max: 50,
      step: 1
    },
    {
      key: 'groundHeight',
      label: '地面海拔',
      unit: 'm',
      min: 500,
      max: 1000,
      step: 5
    },
    {
      key: 'beamAngle',
      label: '垂直波角',
      unit: 'm',
      min: 0,
      max: 90,
      step: 5
    },
    {
      key: 'elevation',
      label: '设备高度',
      unit: 'm',
      min: 0,
      max: 90,
      step: 5
    },
    { key: 'noise', label: '粗糙度', unit: '', min: 1, max: 10, step: 0.1 },
    {
      key: 'efficiency',
      label: '方位角',
      unit: '°',
      min: 100,
      max: 200,
      step: 1
    }
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: sliderThumbStyle }} />
      <div className='grid grid-cols-4 md:grid-cols-8 gap-8'>
        {controlItems.map((item) => (
          <div key={item.key} className='space-y-3 text-center'>
            <div className='text-base font-medium text-gray-700'>
              {item.label} ({item.unit})
            </div>
            <div
              className='text-xl font-bold'
              style={{ color: COLORS.PRIMARY_BLUE }}
            >
              {controls[item.key as keyof typeof controls]}
            </div>
            <div className='relative'>
              <input
                type='range'
                min={item.min}
                max={item.max}
                step={item.step}
                value={controls[item.key as keyof typeof controls]}
                onChange={(e) =>
                  handleSliderChange(item.key, parseFloat(e.target.value))
                }
                className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider'
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ControlPanel
