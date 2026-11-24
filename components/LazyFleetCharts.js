'use client';

import dynamic from 'next/dynamic';

const FleetCharts = dynamic(() => import('./FleetCharts'), { ssr: false, loading: () => <div className="skeleton chart-loading" aria-label="Loading chart" /> });
export default function LazyFleetCharts(props) { return <FleetCharts {...props} />; }
