import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../components/context/AuthContext';
import { useTheme } from '../../components/context/ThemeContext';
import { Avatar } from '../common/UI';

const NAV = {
  customer: [
    { path: '/customer',          icon: '⊞',  label: 'Dashboard' },
    { path: '/customer/discover', icon: '🔍', label: 'Discover' },
    { path: '/customer/bookings', icon: '📋', label: 'My Bookings' },
    { path: '/customer/tracking', icon: '📍', label: 'Live Track' },
    { path: '/customer/payments', icon: '💳', label: 'Payments' },
    { path: '/customer/profile',  icon: '👤', label: 'Profile' },
  ],
  provider: [
    { path: '/provider',          icon: '⊞',  label: 'Dashboard' },
    { path: '/provider/jobs',     icon: '🔧', label: 'My Jobs' },
    { path: '/provider/schedule', icon: '📅', label: 'Schedule' },
    { path: '/provider/earnings', icon: '💰', label: 'Earnings' },
    { path: '/provider/profile',  icon: '👤', label: 'Profile' },
  ],
  admin: [
    { path: '/admin',             icon: '⊞',  label: 'Dashboard' },
    { path: '/admin/providers',   icon: '🛡️', label: 'Providers' },
    { path: '/admin/bookings',    icon: '📋', label: 'Bookings' },
    { path: '/admin/analytics',   icon: '📊', label: 'Analytics' },
    { path: '/admin/disputes',    icon: '⚠️', label: 'Disputes' },
    { path: '/admin/settings',    icon: '⚙️', label: 'Settings' },
  ],
};

export default function AppLayout({ children }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const sidebarW = collapsed ? 64 : 240;
  const navItems = NAV[user?.role] || [];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-base)', transition: 'background 0.3s ease' }}>
      <aside style={{ width: sidebarW, minHeight: '100vh', background: 'var(--sidebar-bg)', borderRight: '1px solid var(--sidebar-border)', display: 'flex', flexDirection: 'column', transition: 'width 0.28s ease', flexShrink: 0, position: 'fixed', zIndex: 100, boxShadow: 'var(--shadow-xs)' }}>

        {/* Logo */}
        <div style={{ padding: collapsed ? '18px 15px' : '18px 20px', borderBottom: '1px solid var(--sidebar-border)', display: 'flex', alignItems: 'center', gap: '10px', minHeight: '68px' }}>
          <div style={{ width: 34, height: 34, borderRadius: '9px', background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>🔧</div>
          {!collapsed && <div><p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.2 }}>HandyServe</p><p style={{ fontSize: '10px', color: 'var(--brand)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Pro</p></div>}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          {!collapsed && <p style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 10px 10px' }}>{user?.role === 'customer' ? 'Main Menu' : user?.role === 'provider' ? 'Provider Hub' : 'Admin Panel'}</p>}
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <button key={item.path} onClick={() => navigate(item.path)} title={collapsed ? item.label : undefined}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: collapsed ? 0 : '10px', padding: '9px 10px', borderRadius: 'var(--radius-md)', background: active ? 'var(--brand-light)' : 'transparent', border: 'none', cursor: 'pointer', color: active ? 'var(--brand)' : 'var(--text-secondary)', fontWeight: active ? 600 : 400, fontSize: '13.5px', marginBottom: '2px', transition: 'var(--transition)', justifyContent: collapsed ? 'center' : 'flex-start', position: 'relative' }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--sidebar-item-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}}
              >
                {active && <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 3, borderRadius: '0 3px 3px 0', background: 'var(--brand)' }} />}
                <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid var(--sidebar-border)', padding: '10px 8px' }}>
          <button onClick={toggleTheme} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: collapsed ? 0 : '10px', padding: '9px 10px', borderRadius: 'var(--radius-md)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '13.5px', justifyContent: collapsed ? 'center' : 'flex-start', marginBottom: '6px', transition: 'var(--transition)', fontFamily: 'var(--font-body)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--sidebar-item-hover)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            <span style={{ fontSize: '17px', flexShrink: 0 }}>{isDark ? '☀️' : '🌙'}</span>
            {!collapsed && <span style={{ fontWeight: 500 }}>{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', marginBottom: '4px', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)' }}>
              <Avatar initials={user?.avatar} size={32} />
              <div style={{ overflow: 'hidden', flex: 1 }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</p>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user?.role}</p>
              </div>
            </div>
          )}

          <button onClick={() => { logout(); navigate('/login'); }}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 10px', borderRadius: 'var(--radius-md)', background: 'transparent', border: 'none', color: 'var(--danger)', fontSize: '13.5px', cursor: 'pointer', justifyContent: collapsed ? 'center' : 'flex-start', transition: 'var(--transition)', fontFamily: 'var(--font-body)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--danger-light)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            <span>🚪</span>
            {!collapsed && <span style={{ fontWeight: 500 }}>Logout</span>}
          </button>
        </div>

        {/* Collapse toggle */}
        <button onClick={() => setCollapsed(c => !c)}
          style={{ position: 'absolute', top: '20px', right: '-13px', width: 26, height: 26, borderRadius: '50%', background: 'var(--sidebar-bg)', border: '1.5px solid var(--sidebar-border)', color: 'var(--text-muted)', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)', fontWeight: 700 }}>
          {collapsed ? '›' : '‹'}
        </button>
      </aside>

      <main style={{ flex: 1, marginLeft: sidebarW, minHeight: '100vh', transition: 'margin-left 0.28s ease, background 0.3s ease', background: 'var(--bg-base)' }}>
        {children}
      </main>
    </div>
  );
}