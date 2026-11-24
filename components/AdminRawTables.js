'use client';

import { useMemo, useState } from 'react';
import { formatDate } from '../lib/api';

const tabs = [['microcontrollers','Microcontrollers'],['fuelSensors','Fuel sensors'],['gpsSensors','GPS sensors'],['rfidSensors','RFID sensors'],['microcontrollerLogs','Controller logs'],['a22Logs','A22 logs'],['rfidLogs','RFID logs'],['gpsLogs','GPS logs']];
const hidden = new Set(['transId','dataJson','lastDataJson','lastPacket','dataPacket']);
const value = (row, key) => { const item = row[key]; if (item === null || item === undefined || item === '') return '—'; if (key.toLowerCase().includes('at') || key.toLowerCase().includes('time') || key === 'scannedAt' || key === 'measuredAt') return formatDate(item); if (typeof item === 'object') return JSON.stringify(item); return String(item); };

function PageControls({ page, pages, pageSize, setPage, setPageSize, search, setSearch, onRefresh }) {
  return <div className="list-controls"><label className="list-search">Search records<input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search UUID, MAC, UID..." /></label><label className="page-size">Rows per page<select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }}><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select></label><button className="secondary-button" type="button" onClick={onRefresh}>Refresh</button><span className="page-count">Page {page} of {pages}</span><button className="secondary-button" type="button" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button><button className="secondary-button" type="button" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button></div>;
}

export default function AdminRawTables({ tables }) {
  const [active, setActive] = useState('microcontrollers'); const [page, setPage] = useState(1); const [pageSize, setPageSize] = useState(25); const [search, setSearch] = useState(''); const [refreshKey, setRefreshKey] = useState(0);
  const allRows = tables[active] || [];
  const filtered = useMemo(() => { const query = search.trim().toLowerCase(); return query ? allRows.filter((row) => JSON.stringify(row).toLowerCase().includes(query)) : allRows; }, [allRows, search, refreshKey]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize)); const safePage = Math.min(page, pages); const rows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  const changeTab = (key) => { setActive(key); setPage(1); setSearch(''); };
  return <section className="admin-raw panel"><div className="admin-tabs">{tabs.map(([key, label]) => <button key={key} className={`filter-button ${active === key ? 'admin-tab-active' : ''}`} onClick={() => changeTab(key)}>{label}</button>)}</div><PageControls page={safePage} pages={pages} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} search={search} setSearch={setSearch} onRefresh={() => setRefreshKey((key) => key + 1)} /><div className="section-heading"><div><h2>{tabs.find(([key]) => key === active)?.[1]}</h2><p>{filtered.length} filtered raw PostgreSQL records</p></div></div>{rows.length ? <div className="raw-table-wrap">{rows.map((row) => { const keys = Object.keys(row).filter((key) => !hidden.has(key)).slice(0, 6); return <article className="raw-record" key={row.transId}><strong className="raw-record-id mono">{row.transId}</strong>{keys.map((key) => <span className="raw-field" key={key}><small>{key}</small><b>{value(row, key)}</b></span>)}</article>; })}</div> : <div className="live-empty"><span>⌁</span><strong>No records match this search</strong><p>Try another search or refresh the live table.</p></div>}</section>;
}
