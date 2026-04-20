import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

const navMain = [
  {
    to: '/dashboard', label: 'Dashboard',
    icon: <svg className="nav-icon" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="5" height="5" rx="1"/><rect x="8" y="1" width="5" height="5" rx="1"/><rect x="1" y="8" width="5" height="5" rx="1"/><rect x="8" y="8" width="5" height="5" rx="1"/></svg>
  },
  {
    to: '/fleet', label: 'Vehicles',
    icon: <svg className="nav-icon" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="7" cy="4" rx="4" ry="2.5"/><path d="M3 4v6c0 1.4 1.8 2.5 4 2.5s4-1.1 4-2.5V4"/></svg>
  },
  {
    to: '/jobs', label: 'Jobs',
    icon: <svg className="nav-icon" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 2.5h12M1 7h8M1 11.5h5"/></svg>
  },
  {
    to: '/quotations', label: 'Quotations',
    icon: <svg className="nav-icon" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1.5" y="1.5" width="11" height="11" rx="2"/><path d="M4.5 7h5M4.5 9.5h3"/></svg>
  },
  {
    to: '/invoices', label: 'Invoices',
    icon: <svg className="nav-icon" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1.5" y="1.5" width="11" height="11" rx="2"/><path d="M7 5v4M5 7h4"/></svg>
  },
  {
    to: '/inspections', label: 'Inspections',
    icon: <svg className="nav-icon" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="5.5"/><path d="M4.5 7l2 2 3-3"/></svg>
  },
]

const navAnalytics = [
  {
    to: '/spend-analytics', label: 'Spend Analytics',
    icon: <svg className="nav-icon" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 11 4.5 7l3 3L11 4.5"/></svg>
  },
  {
    to: '/maintenance', label: 'Maintenance',
    icon: <svg className="nav-icon" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1.5" y="3" width="11" height="9" rx="1.5"/><path d="M5 3V1.5M9 3V1.5M1.5 6.5h11"/></svg>
  },
  {
    to: '/issues', label: 'Issues',
    icon: <svg className="nav-icon" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="5.5"/><path d="M7 4v3.5L9 9"/></svg>,
    badge: '5'
  },
  {
    to: '/performance', label: 'Performance',
    icon: <svg className="nav-icon" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 10l3-4 3 2 2.5-4L12 1.5"/></svg>
  },
]

const pageTitle: Record<string, { title: string; sub: string }> = {
  '/dashboard': { title: 'Dashboard', sub: 'April 18, 2026' },
  '/fleet': { title: 'Vehicles', sub: 'Manage your fleet' },
  '/jobs': { title: 'Jobs', sub: 'Manage active repairs' },
  '/quotations': { title: 'Quotations', sub: 'Estimates and approvals' },
  '/invoices': { title: 'Invoices', sub: 'Billing and payments' },
  '/spend-analytics': { title: 'Spend Analytics', sub: 'Financial insights' },
  '/settings': { title: 'Settings', sub: 'Manage your preferences' },
}

export default function Layout() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const meta = pageTitle[location.pathname] ?? { title: 'Repyar', sub: '' }

  return (
    <div className="shell">
      <div className="sidebar">
        <div className="logo">
          <div className="logo-name">Repyar</div>
          <div className="logo-tag">Business Portal · v2</div>
        </div>

        <div className="nav-section">
          <span className="nav-lbl">Main</span>
          {navMain.map(({ to, label, icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              {icon}{label}
            </NavLink>
          ))}
        </div>

        <div className="nav-section">
          <span className="nav-lbl">Analytics</span>
          {navAnalytics.map(({ to, label, icon, badge }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              {icon}{label}
              {badge && <span className="nav-badge">{badge}</span>}
            </NavLink>
          ))}
        </div>

        <div style={{ marginTop: 'auto' }}>
          <div className="nav-section">
            <NavLink to="/settings" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              <svg className="nav-icon" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="2"/><path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.9 2.9l1.4 1.4M9.7 9.7l1.4 1.4M2.9 11.1l1.4-1.4M9.7 4.3l1.4-1.4"/></svg>
              Settings
            </NavLink>
            <NavLink to="/support" className="nav-item">
              <svg className="nav-icon" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="5" r="2.5"/><path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5"/></svg>
              Support
            </NavLink>
          </div>
        </div>

        <div className="sidebar-foot">
          <div className="u-avatar">MN</div>
          <div>
            <div className="u-name">mnz</div>
            <div className="u-role">admin</div>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div>
              <div className="topbar-title">{meta.title}</div>
              <div className="topbar-date">{meta.sub}</div>
            </div>
            <div className="search-box">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: .4 }}><circle cx="6" cy="6" r="5"/><path d="M10 10l3 3"/></svg>
              <input type="text" placeholder="Search vehicles, jobs, quotes..." />
            </div>
          </div>
          <div className="topbar-r">
            <div className="icon-btn" onClick={toggleTheme} title="Toggle theme">
              {theme === 'dark'
                ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--text-2)" strokeWidth="1.5"><circle cx="7" cy="7" r="3"/><path d="M7 1v1M7 12v1M1 7h1M12 7h1M2.8 2.8l.7.7M10.5 10.5l.7.7M2.8 11.2l.7-.7M10.5 3.5l.7-.7"/></svg>
                : <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--text-2)" strokeWidth="1.5"><path d="M11.5 8.5A5 5 0 1 1 5.5 2.5a5.5 5.5 0 1 0 6 6z"/></svg>
              }
            </div>
            <div className="icon-btn">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--text-2)" strokeWidth="1.5"><path d="M7 1A4.5 4.5 0 0 0 2.5 5.5c0 1.5-.7 2.7-1.5 3.5h12c-.8-.8-1.5-2-1.5-3.5A4.5 4.5 0 0 0 7 1zM5.5 12a1.5 1.5 0 0 0 3 0"/></svg>
              <div className="dot" />
            </div>
            <div className="icon-btn">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--text-2)" strokeWidth="1.5"><circle cx="7" cy="5" r="2.5"/><path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5"/></svg>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  )
}
