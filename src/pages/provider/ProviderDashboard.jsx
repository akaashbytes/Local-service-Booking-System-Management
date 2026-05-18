import React, { useState } from 'react';
import { useAuth } from '../../components/context/AuthContext';
import { Card, StatCard, StatusBadge, Button, Badge, SectionHeader, Avatar } from '../../components/common/UI';
import { PROVIDER_JOBS, MONTHLY_REVENUE } from '../../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function JobCard({ job }) {
  const [status, setStatus] = useState(job.status);
  const actions = {
    'Requested':   [{ label: 'Accept ✓', variant: 'primary', next: 'Accepted' }, { label: 'Decline', variant: 'danger', next: 'Cancelled' }],
    'Accepted':    [{ label: 'Start Job →', variant: 'primary', next: 'In Progress' }],
    'In Progress': [{ label: 'Mark Complete ✓', variant: 'soft', next: 'Completed' }],
  };
  const btns = actions[status] || [];

  return (
    <Card padding="18px 22px" style={status === 'Requested' ? { borderColor: '#DDD6FE', background: 'var(--brand-light)' } : {}}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Avatar initials={job.customerName.split(' ').map(n => n[0]).join('')} size={44} bg="#FEF3C7" color="#92400E" />
          <div>
            <p style={{ fontWeight: 700, fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '3px' }}>{job.customerName}</p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>📅 {job.date} · ⏰ {job.time}</p>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>📍 {job.address}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontWeight: 800, color: 'var(--brand)', fontSize: '17px' }}>₹{job.amount}</p>
            <StatusBadge status={status} />
          </div>
          {btns.length > 0 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {btns.map(b => <Button key={b.label} variant={b.variant} size="sm" onClick={() => setStatus(b.next)}>{b.label}</Button>)}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default function ProviderDashboard() {
  const { user } = useAuth();

  return (
    <div style={{ padding: '32px 36px', maxWidth: '1100px' }}>
      <div style={{ marginBottom: '26px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)' }}>
          Welcome back, <span style={{ color: 'var(--brand)' }}>{user?.name?.split(' ')[0]}</span> 🔧
        </h1>
        <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
          <Badge color="brand">✓ Verified Provider</Badge>
          <Badge color="warning">⭐ 4.8 Rating</Badge>
          <Badge color="muted">Plumbing</Badge>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        <StatCard label="Jobs Completed"  value="312"    icon="✅" change="+12 this month" iconBg="#D1FAE5" color="var(--success)" />
        <StatCard label="Total Earnings"  value="₹84.5k" icon="💰" change="+₹8.2k this month" iconBg="#FEF3C7" color="#D97706" />
        <StatCard label="Avg Rating"      value="4.8"    icon="⭐" iconBg="#FEF3C7" color="#D97706" />
        <StatCard label="Completion Rate" value="96%"    icon="📊" iconBg="#EDE9FE" color="var(--brand)" />
      </div>

      <SectionHeader title="Job Requests" subtitle="Review and respond to incoming bookings" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
        {PROVIDER_JOBS.map(job => <JobCard key={job.id} job={job} />)}
      </div>

      <Card padding="24px">
        <p style={{ fontWeight: 700, marginBottom: '20px', fontSize: '16px', color: 'var(--text-primary)' }}>Monthly Earnings</p>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={MONTHLY_REVENUE}>
            <defs>
              <linearGradient id="earningGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#7C3AED" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
            <YAxis stroke="var(--text-muted)" fontSize={12} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-primary)' }} formatter={v => [`₹${v.toLocaleString()}`, 'Revenue']} />
            <Area type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={2.5} fill="url(#earningGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}