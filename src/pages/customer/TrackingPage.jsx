import React, { useState } from 'react';
import { Card, Button } from '../../components/common/UI';

export default function TrackingPage() {
  const [chatMsg, setChatMsg] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'provider', text: 'Hello! I have accepted your booking. I will be there by 10 AM.', time: '9:15 AM' },
    { id: 2, sender: 'customer', text: 'Great, thank you! The issue is with the kitchen sink tap.', time: '9:18 AM' },
    { id: 3, sender: 'provider', text: 'Got it. Do you need me to bring replacement parts?', time: '9:20 AM' },
  ]);

  const steps = [
    { label: 'Requested',   icon: '📋', done: true },
    { label: 'Accepted',    icon: '✅', done: true },
    { label: 'On the way',  icon: '🚗', done: true },
    { label: 'In Progress', icon: '🔧', done: false, active: true },
    { label: 'Completed',   icon: '🎉', done: false },
  ];

  const sendMsg = () => {
    if (!chatMsg.trim()) return;
    setMessages(m => [...m, { id: Date.now(), sender: 'customer', text: chatMsg, time: 'now' }]);
    setChatMsg('');
    setTimeout(() => setMessages(m => [...m, { id: Date.now() + 1, sender: 'provider', text: 'Got it, will handle that too!', time: 'now' }]), 1000);
  };

  return (
    <div style={{ padding: '32px 36px', maxWidth: '1000px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>Live Job Tracking</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Booking #B002 · Electrical · Suresh Babu</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Status Steps */}
          <Card padding="22px">
            <p style={{ fontWeight: 700, marginBottom: '22px', fontSize: '15px', color: 'var(--text-primary)' }}>Job Status</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {steps.map((s, i) => (
                <React.Fragment key={s.label}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', background: s.active ? 'var(--brand-light)' : s.done ? 'var(--success-light)' : 'var(--bg-elevated)', border: `2.5px solid ${s.active ? 'var(--brand)' : s.done ? 'var(--success)' : 'var(--border)'}`, marginBottom: '8px', animation: s.active ? 'pulse 2s infinite' : 'none' }}>{s.icon}</div>
                    <p style={{ fontSize: '10.5px', color: s.active ? 'var(--brand)' : s.done ? 'var(--success)' : 'var(--text-muted)', fontWeight: s.active ? 700 : 400, textAlign: 'center', whiteSpace: 'nowrap' }}>{s.label}</p>
                  </div>
                  {i < steps.length - 1 && <div style={{ flex: 1, height: 2.5, background: steps[i+1].done || s.done ? 'var(--success)' : 'var(--border)', margin: '0 4px', marginTop: '-20px', borderRadius: 2 }} />}
                </React.Fragment>
              ))}
            </div>
          </Card>

          {/* Map */}
          <Card padding="0" style={{ overflow: 'hidden', height: '260px' }}>
            <div style={{ height: '100%', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {[...Array(8)].map((_, i) => <div key={i} style={{ position: 'absolute', left: `${8 + i * 12}%`, top: 0, bottom: 0, width: 1, background: 'var(--border)', opacity: 0.4 }} />)}
              {[...Array(6)].map((_, i) => <div key={i} style={{ position: 'absolute', top: `${8 + i * 16}%`, left: 0, right: 0, height: 1, background: 'var(--border)', opacity: 0.4 }} />)}
              <div style={{ position: 'relative', textAlign: 'center', background: 'var(--bg-card)', padding: '16px 24px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
                <div style={{ fontSize: '36px', marginBottom: '6px', animation: 'pulse 2s infinite' }}>📍</div>
                <p style={{ fontWeight: 700, color: 'var(--brand)', fontSize: '14px' }}>Provider is 1.2 km away</p>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '3px' }}>ETA: ~8 minutes</p>
              </div>
            </div>
          </Card>

          {/* Safety */}
          <Card padding="18px 20px" style={{ background: 'var(--brand-light)', borderColor: '#DDD6FE' }}>
            <p style={{ fontWeight: 700, marginBottom: '10px', color: 'var(--brand)', fontSize: '14px' }}>🛡️ Safety Guidelines</p>
            {['Verify provider ID before allowing entry', 'Keep valuables secured during service', 'Do not make advance payments in cash', 'Rate your experience after completion'].map((tip, i) => (
              <p key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '5px', display: 'flex', gap: '7px' }}>
                <span style={{ color: 'var(--brand)', fontWeight: 700 }}>·</span>{tip}
              </p>
            ))}
          </Card>
        </div>

        {/* Chat */}
        <Card padding="0" style={{ display: 'flex', flexDirection: 'column', height: '580px' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--brand-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700, color: 'var(--brand)' }}>SB</div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>Suresh Babu</p>
              <p style={{ fontSize: '12px', color: 'var(--success)', fontWeight: 500 }}>● Online</p>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-base)' }}>
            {messages.map(m => (
              <div key={m.id} style={{ display: 'flex', justifyContent: m.sender === 'customer' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '78%', padding: '10px 14px', borderRadius: m.sender === 'customer' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: m.sender === 'customer' ? 'var(--brand)' : 'var(--bg-card)', color: m.sender === 'customer' ? '#fff' : 'var(--text-primary)', fontSize: '13.5px', boxShadow: 'var(--shadow-xs)', border: m.sender !== 'customer' ? '1px solid var(--border)' : 'none' }}>
                  <p style={{ lineHeight: 1.5 }}>{m.text}</p>
                  <p style={{ fontSize: '11px', opacity: 0.65, marginTop: '4px', textAlign: 'right' }}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px', background: 'var(--bg-card)' }}>
            <input value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} placeholder="Type a message..."
              style={{ flex: 1, padding: '10px 14px', background: 'var(--bg-input)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '13.5px', outline: 'none' }} />
            <Button onClick={sendMsg} style={{ padding: '10px 16px' }}>Send</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}