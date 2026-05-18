import React, { useState } from 'react';
import { Card, Button, Badge, SectionHeader } from '../../components/common/UI';
import { INVOICES, PROMO_CODES } from '../../data/mockData';

export default function PaymentsPage() {
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(null);
  const [promoError, setPromoError] = useState('');

  const applyPromo = () => {
    const code = PROMO_CODES[promo.toUpperCase()];
    if (code) { setDiscount(code); setPromoError(''); }
    else { setPromoError('Invalid code. Try: FIRST50, CLEAN200, SUMMER10, PEST299'); setDiscount(null); }
  };

  return (
    <div style={{ padding: '32px 36px', maxWidth: '860px' }}>
      <SectionHeader title="Payments & Billing" subtitle="Track invoices, apply promos, and manage payments" />

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <Card style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', border: 'none' }} padding="22px">
          <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Spent</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: '#fff' }}>₹8,400</p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '6px' }}>↑ +₹400 this month</p>
        </Card>
        <Card style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', border: 'none' }} padding="22px">
          <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Amount Due</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: '#fff' }}>₹400</p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '6px' }}>1 pending invoice</p>
        </Card>
      </div>

      {/* Promo */}
      <Card padding="22px" style={{ marginBottom: '20px' }}>
        <p style={{ fontWeight: 700, marginBottom: '14px', fontSize: '15px', color: 'var(--text-primary)' }}>🎟️ Apply Promo Code</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input value={promo} onChange={e => setPromo(e.target.value.toUpperCase())} placeholder="Enter code (e.g. FIRST50)"
            style={{ flex: 1, padding: '10px 14px', background: 'var(--bg-input)', border: `1.5px solid ${promoError ? 'var(--danger)' : 'var(--border)'}`, borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '14px', outline: 'none', letterSpacing: '1.5px', fontWeight: 600 }} />
          <Button onClick={applyPromo}>Apply</Button>
        </div>
        {promoError && <p style={{ fontSize: '12.5px', color: 'var(--danger)', marginTop: '8px' }}>{promoError}</p>}
        {discount && <div style={{ marginTop: '10px', padding: '10px 14px', background: 'var(--success-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--success)', color: '#065F46', fontSize: '13.5px', fontWeight: 500 }}>✅ {discount.desc} applied!</div>}
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px' }}>Available: FIRST50 · CLEAN200 · SUMMER10 · PEST299</p>
      </Card>

      {/* Payment Methods */}
      <Card padding="22px" style={{ marginBottom: '20px' }}>
        <p style={{ fontWeight: 700, marginBottom: '14px', fontSize: '15px', color: 'var(--text-primary)' }}>💳 Payment Methods</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[{ icon: '📱', label: 'UPI', sub: 'Instant transfer' }, { icon: '💳', label: 'Card', sub: 'Visa/Mastercard' }, { icon: '👛', label: 'Wallet', sub: 'Stored balance' }].map(m => (
            <div key={m.label} style={{ padding: '14px 20px', background: 'var(--bg-elevated)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: 'var(--transition)', flex: 1, minWidth: '120px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand)'; e.currentTarget.style.background = 'var(--brand-light)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-elevated)'; }}>
              <span style={{ fontSize: '22px' }}>{m.icon}</span>
              <div>
                <p style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--text-primary)' }}>{m.label}</p>
                <p style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{m.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Invoices */}
      <p style={{ fontWeight: 700, marginBottom: '12px', fontSize: '16px', color: 'var(--text-primary)' }}>Invoice History</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {INVOICES.map(inv => (
          <Card key={inv.id} padding="18px 22px">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--brand-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🧾</div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '2px' }}>{inv.service} — {inv.id}</p>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>📅 {inv.date} · {inv.method} · GST: ₹{inv.tax}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <p style={{ fontWeight: 800, fontSize: '17px', color: 'var(--brand)' }}>₹{inv.total}</p>
                <Badge color={inv.status === 'Paid' ? 'success' : 'warning'}>{inv.status}</Badge>
                {inv.status === 'Due' && <Button size="sm">Pay Now</Button>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}