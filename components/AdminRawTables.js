'use client';

import { useState } from 'react';
import { formatDate } from '../lib/api';

const tabs = [['microcontrollers','Microcontrollers'],['fuelSensors','Fuel sensors'],['gpsSensors','GPS sensors'],['rfidSensors','RFID sensors'],['microcontrollerLogs','Controller logs'],['a22Logs','A22 logs'],['rfidLogs','RFID logs'],['gpsLogs','GPS logs']];
const value = (row, key) => { const item = row[key]; if (item === null || item === undefined || item === '') return '—'; if (key.toLowerCase().includes('at') || key.toLowerCase().includes('time') || key === 'scannedAt' || key === 'measuredAt') return formatDate(item); if (typeof item === 'object') return JSON.stringify(item); return String(item); };
export default function AdminRawTables({ tables }) {
  const [active, setActive] = useState('microcontrollers'); const rows = tables[active] || [];
  return <section className="admin-raw panel"><div className="admin-tabs">{tabs.map(([key, label]) => <button key={key} className={`filter-button ${active === key ? 'admin-tab-active' : ''}`} onClick={() => setActive(key)}>{label}</button>)}</div><div className="section-heading"><div><h2>{tabs.find(([key]) => key === active)?.[1]}</h2><p>{rows.length} raw PostgreSQL records</p></div></div>{rows.length ? <div className="raw-table-wrap">{rows.slice(0, 100).map((row) => { const keys = Object.keys(row).filter((key) => !['transId','dataJson','lastDataJson','lastPacket','dataPacket'].includes(key)).slice(0, 6); return <div className="raw-record" key={row.transId}><strong className="mono">{row.transId}</strong>{keys.map((key) => <span key={key}><small>{key}</small>{value(row, key)}</span>)}</div>; })}</div> : <div className="live-empty"><span>⌁</span><strong>No records in this table</strong><p>Data will appear here when the connected device or admin workflow creates it.</p></div>}</section>;
}
