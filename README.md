# 无线链路优化系统 (Wireless Link Optimization Platform)

A modern wireless link optimization dashboard built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **System Overview Dashboard** - Real-time monitoring of wireless network performance
- **Interactive Network Map** - Visual representation of network topology with live status indicators
- **Parameter Control Panel** - Adjustable sliders for frequency, power, antenna settings, and more
- **Optimization Analytics** - Radar chart for performance analysis and optimization recommendations
- **Responsive Design** - Works seamlessly across desktop and mobile devices

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Recharts** - Charting library for data visualization

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── components/
    ├── Dashboard.tsx
    ├── Header.tsx
    ├── Sidebar.tsx
    ├── MainContent.tsx
    ├── MetricsCards.tsx
    ├── NetworkMap.tsx
    ├── ControlPanel.tsx
    └── OptimizationChart.tsx
```

## Key Components

- **MetricsCards**: Displays key performance indicators (link quality, system efficiency, etc.)
- **NetworkMap**: Interactive network topology visualization with node status
- **ControlPanel**: Adjustable parameters for wireless optimization
- **OptimizationChart**: Radar chart and recommendations for performance optimization

## License

MIT License
