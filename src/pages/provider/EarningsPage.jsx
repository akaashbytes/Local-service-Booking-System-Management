import React from 'react';
import { Card, StatCard, Badge, SectionHeader } from '../../components/common/UI';
import { MONTHLY_REVENUE } from '../../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EarningsPage() {
  const payouts = [
    { date: '20 Feb 2025', amount: 8400, jobs: 24, status: 'Paid' },
    { date: '20 Jan 2025', amount: 9100, jobs: 28, status: 'Paid' },
    { date: '20 Dec 2024', amount: 7800, jobs: 21, status: 'Paid' },
  ];

  return (
    <div style={{ padding: '32px 36px', maxWidth: '860px' }}>
      <SectionHeader title="Earnings" subtitle="Track your income and payouts" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <StatCard label="This Month"     value="₹14.2k" icon="📈" change="+18% vs last" iconBg="#EDE9FE" color="var(--brand)" />
        <StatCard label="Pending Payout" value="₹4.8k"  icon="⏳" iconBg="#FEF3C7" color="#D97706" />
        <StatCard label="Total Lifetime" value="₹84.5k" icon="💰" iconBg="#D1FAE5" color="var(--success)" />
      </div>

      <Card padding="24px" style={{ marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '20px', fontSize: '15px', color: 'var(--text-primary)' }}>Revenue Trend</p>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={MONTHLY_REVENUE}>
            <defs>
              <linearGradient id="provGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
            <YAxis stroke="var(--text-muted)" fontSize={12} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-primary)' }} />
            <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2.5} fill="url(#provGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <p style={{ fontWeight: 700, marginBottom: '14px', fontSize: '15px', color: 'var(--text-primary)' }}>Recent Payouts</p>
      {payouts.map((p, i) => (
        <Card key={i} padding="16px 22px" style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>💸</div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '2px' }}>Payout — {p.date}</p>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{p.jobs} jobs · Auto transfer</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <p style={{ fontWeight: 800, color: 'var(--success)', fontSize: '18px' }}>₹{p.amount.toLocaleString()}</p>
              <Badge color="success">{p.status}</Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}