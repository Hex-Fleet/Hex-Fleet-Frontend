'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import SystemStatus from './SystemStatus';

const primaryNav = [
  { href: '/', label: 'Overview', icon: '◈' },
  { href: '/devices', label: 'Devices', icon: '⌁' },
  { href: '/students', label: 'Students', icon: '◌' },
  { href: '/attendance', label: 'Attendance', icon: '✓' }
];

const SECTION_LABELS = {
  '/': 'Overview',
  '/devices': 'Devices',
  '/students': 'Students',
  '/attendance': 'Attendance',
  '/settings': 'Settings'
};

function sectionLabel(pathname) {
  if (!pathname || pathname === '/') return 'Overview';
  const match = Object.keys(SECTION_LABELS).find((href) => href !== '/' && pathname.startsWith(href));
  return match ? SECTION_LABELS[match] : 'Overview';
}

function NavItem({ item, collapsed }) {
  const pathname = usePathname();
  const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
  return <Link href={item.href} className={`nav-item ${active ? 'nav-item-active' : ''}`} title={collapsed ? item.label : undefined}>
    <span className="nav-icon">{item.icon}</span><span className={collapsed ? 'sr-only' : ''}>{item.label}</span>
  </Link>;
}

export default function AppShell({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const current = sectionLabel(pathname);
  return <div className="app-frame">
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="brand-row"><Link href="/" className="brand-mark"><span className="brand-hex">H</span><span className={collapsed ? 'sr-only' : ''}>HEX<span>FLEET</span></span></Link><button className="collapse-button" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">{collapsed ? '→' : '←'}</button></div>
      <div className={`workspace-switch ${collapsed ? 'justify-center' : ''}`}><span className="workspace-dot" />{collapsed ? <span className="sr-only">HexTorq Mobility</span> : <><span>HexTorq Mobility</span><span className="chevron">⌄</span></>}</div>
      <div className={`nav-label ${collapsed ? 'sr-only' : ''}`}>Workspace</div>
      <nav className="nav-list">{primaryNav.map((item) => <NavItem key={item.href} item={item} collapsed={collapsed} />)}</nav>
      <div className={`nav-label mt-auto ${collapsed ? 'sr-only' : ''}`}>System</div>
      <nav className="nav-list"><NavItem item={{ href: '/settings', label: 'Settings', icon: '⚙' }} collapsed={collapsed} /></nav>
      <div className={`sidebar-footer ${collapsed ? 'justify-center' : ''}`}><div className="avatar">HF</div>{!collapsed && <div><p className="user-name">HexFleet</p><p className="user-role">Fleet operator</p></div>}</div>
    </aside>
    <div className="main-column">
      <header className="topbar"><div className="breadcrumbs"><span className="mobile-brand">HEX<span>FLEET</span></span><span className="breadcrumb-muted">Control room</span><span>/</span><span>{current}</span></div><div className="topbar-actions"><SystemStatus /><button className="icon-button" aria-label="Notifications">◔<span className="notification-dot" /></button><div className="top-avatar" title="HexFleet">HF</div></div></header>
      <main className="page-content">{children}</main>
    </div>
  </div>;
}
