'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Bell, BusFront, ChevronDown, ClipboardCheck, Cpu, Database, LayoutDashboard, Menu, Moon, Search, Settings, Sun, Users } from 'lucide-react';
import SystemStatus from './SystemStatus';
import GlobalLoader from './GlobalLoader';
import ToastHost from './ToastHost';
import logo from '../src/logo/Hexfleet Smart Fleet Solutions (1).png';

const navigationGroups = [
  { label: 'Workspace', items: [{ href: '/', label: 'Overview', icon: LayoutDashboard }, { href: '/buses', label: 'Buses', icon: BusFront }, { href: '/devices', label: 'Devices', icon: Cpu }] },
  { label: 'People', items: [{ href: '/students', label: 'Students', icon: Users }, { href: '/attendance', label: 'Attendance', icon: ClipboardCheck }] }
];
const adminNavigation = [{ href: '/admin', label: 'Raw tables', icon: Database }];

const SECTION_LABELS = { '/': 'Overview', '/devices': 'Devices', '/buses': 'Buses', '/students': 'Students', '/attendance': 'Attendance', '/settings': 'Settings', '/admin': 'Admin' };
function sectionLabel(pathname) { if (!pathname || pathname === '/') return 'Overview'; const match = Object.keys(SECTION_LABELS).find((href) => href !== '/' && pathname.startsWith(href)); return match ? SECTION_LABELS[match] : pathname.split('/').filter(Boolean).slice(-1)[0]?.replaceAll('-', ' ') || 'Overview'; }
function NavItem({ item, collapsed, closeMobile }) { const pathname = usePathname(); const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href); const Icon = item.icon; return <Link href={item.href} aria-current={active ? 'page' : undefined} className={`nav-item ${active ? 'nav-item-active' : ''}`} title={collapsed ? item.label : undefined} onClick={closeMobile}><span className="nav-icon"><Icon size={17} strokeWidth={1.8} /></span><span className={collapsed ? 'sr-only' : ''}>{item.label}</span></Link>; }

export default function AppShell({ children }) {
  const [collapsed, setCollapsed] = useState(false); const [mobileOpen, setMobileOpen] = useState(false); const [dark, setDark] = useState(false); const pathname = usePathname(); const current = sectionLabel(pathname); const closeMobile = () => setMobileOpen(false);
  useEffect(() => { const saved = window.localStorage.getItem('hexfleet-theme'); setDark(saved === 'dark'); }, []);
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; window.localStorage.setItem('hexfleet-theme', dark ? 'dark' : 'light'); }, [dark]);
  return <div className="app-frame"><GlobalLoader /><ToastHost />{mobileOpen && <button className="drawer-backdrop" aria-label="Close navigation" onClick={closeMobile} />}<aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''} ${mobileOpen ? 'sidebar-mobile-open' : ''}`}><div className="brand-row"><Link href="/" className="brand-mark" onClick={closeMobile}><Image src={logo} alt="HexFleet" className="brand-logo" priority /><span className={collapsed ? 'sr-only' : ''}>HEX<span>FLEET</span></span></Link><button className="collapse-button" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">{collapsed ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}</button></div><div className={`workspace-switch ${collapsed ? 'justify-center' : ''}`}><span className="workspace-dot" />{collapsed ? <span className="sr-only">RGU Institution</span> : <><span>RGU Institution</span><ChevronDown className="chevron" size={16} /></>}</div>{navigationGroups.map((group) => <div className="nav-group" key={group.label}><div className={`nav-label ${collapsed ? 'sr-only' : ''}`}>{group.label}</div><nav className="nav-list">{group.items.map((item) => <NavItem key={item.href} item={item} collapsed={collapsed} closeMobile={closeMobile} />)}</nav></div>)}<div className={`nav-label mt-auto ${collapsed ? 'sr-only' : ''}`}>System</div><nav className="nav-list"><NavItem item={{ href: '/settings', label: 'Settings', icon: Settings }} collapsed={collapsed} closeMobile={closeMobile} /></nav><div className={`nav-label ${collapsed ? 'sr-only' : ''}`}>Admin</div><nav className="nav-list">{adminNavigation.map((item) => <NavItem key={item.href} item={item} collapsed={collapsed} closeMobile={closeMobile} />)}</nav><div className={`sidebar-footer ${collapsed ? 'justify-center' : ''}`}><div className="avatar">HF</div>{!collapsed && <div><p className="user-name">HexFleet</p><p className="user-role">Fleet operator</p></div>}</div></aside><div className="main-column"><header className="topbar"><div className="breadcrumbs"><button className="mobile-menu-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={19} /></button><span className="mobile-brand">HEX<span>FLEET</span></span><span className="breadcrumb-muted">Institution dashboard</span><span>/</span><span>{current}</span></div><div className="topbar-actions"><label className="global-search"><Search size={15} /><input aria-label="Global search" placeholder="Search fleet" /></label><SystemStatus /><button className="theme-button" onClick={() => setDark(!dark)} aria-label={dark ? 'Use light theme' : 'Use dark theme'}>{dark ? <Sun size={16} /> : <Moon size={16} />}</button><button className="icon-button" aria-label="Notifications"><Bell size={18} /><span className="notification-dot" /></button><div className="top-avatar" title="HexFleet">HF</div></div></header><main className="page-content">{children}</main></div></div>;
}
