import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '抽水蓄能电站无线链路设计优化工具',
  description: 'Wireless Link Optimization Platform'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='zh'>
      <body className='font-sans antialiased'>{children}</body>
    </html>
  )
}
