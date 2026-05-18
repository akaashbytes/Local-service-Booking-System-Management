import React, { useState, useMemo } from 'react';
import { Card, Button, Input, Avatar, SectionHeader, Badge } from '../../components/common/UI';
import { SERVICE_CATEGORIES, PROVIDERS } from '../../data/mockData';

export default function DiscoverPage() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [selected, setSelected] = useState(null);
  const [booked, setBooked] = useState(false);

  const filtered = useMemo(() => PROVIDERS.filter(p => {
    const catMatch = selectedCat === 'all' || p.service.toLowerCase().includes(selectedCat);
    const searchMatch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.service.toLowerCase().includes(search.toLowerCase());
    const priceMatch = priceRange === 'all' || (priceRange === 'low' && p.price < 500) || (priceRange === 'mid' && p.price >= 500 && p.price < 1000) || (priceRange === 'high' && p.price >= 1000);
    const ratingMatch = ratingFilter === 'all' || p.rating >= parseFloat(ratingFilter);
    const availMatch = !availableOnly || p.available;
    return catMatch && searchMatch && priceMatch && ratingMatch && availMatch;
  }), [selectedCat, search, priceRange, ratingFilter, availableOnly]);

  const confirmBook = () => { setBooked(true); setTimeout(() => { setSelected(null); setBooked(false); }, 2000); };
  const BG = ['#EDE9FE', '#D1FAE5', '#DBEAFE', '#FEF3C7', '#FFE4E6', '#E0F2FE'];

  return (
    <div style={{ padding: '32px 36px', maxWidth: '1140px' }}>
      <SectionHeader title="Discover Services" subtitle="Book trusted professionals near you" />

      {/* Filters */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '24px', boxShadow: 'var(--shadow-xs)' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: '2 1 220px' }}>
            <Input placeholder="Search service or provider..." value={search} onChange={e => setSearch(e.target.value)} icon="🔍" />
          </div>
          <div style={{ flex: '1 1 140px' }}>
            <select value={priceRange} onChange={e => setPriceRange(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-input)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }}>
              <option value="all">Any Price</option>
              <option value="low">Under ₹500</option>
              <option value="mid">₹500–₹1000</option>
              <option value="high">₹1000+</option>
            </select>
          </div>
          <div style={{ flex: '1 1 130px' }}>
            <select value={ratingFilter} onChange={e => setRatingFilter(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-input)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }}>
              <option value="all">Any Rating</option>
              <option value="4.5">4.5+ ★</option>
              <option value="4">4.0+ ★</option>
            </select>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '7px', cursor: 'pointer', fontSize: '13.5px', color: 'var(--text-secondary)', paddingBottom: '2px' }}>
            <input type="checkbox" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)} style={{ accentColor: 'var(--brand)', width: 15, height: 15 }} />
            Available now
          </label>
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {[{ id: 'all', label: 'All', icon: '✦' }, ...SERVICE_CATEGORIES].map(c => {
          const active = selectedCat === c.id;
          return (
            <button key={c.id} onClick={() => setSelectedCat(c.id)}
              style={{ padding: '7px 16px', borderRadius: '20px', cursor: 'pointer', fontSize: '13.5px', fontFamily: 'var(--font-body)', fontWeight: active ? 600 : 400, background: active ? 'var(--brand)' : 'var(--bg-card)', border: `1.5px solid ${active ? 'var(--brand)' : 'var(--border)'}`, color: active ? '#fff' : 'var(--text-secondary)', transition: 'var(--transition)', boxShadow: active ? '0 2px 8px rgba(124,58,237,0.25)' : 'none' }}>
              {c.icon} {c.label}
            </button>
          );
        })}
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginBottom: '18px', fontWeight: 500 }}>{filtered.length} professional{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Provider Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {filtered.map((p, idx) => (
          <Card key={p.id} hover padding="22px" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Avatar initials={p.avatar} size={50} bg={BG[idx % BG.length]} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', marginBottom: '2px' }}>{p.name}</p>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{p.service} · {p.experience}</p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ fontWeight: 800, color: 'var(--brand)', fontSize: '16px' }}>₹{p.price}</p>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>onwards</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                {[1,2,3,4,5].map(i => <span key={i} style={{ color: i <= Math.round(p.rating) ? '#F59E0B' : 'var(--border)', fontSize: '13px' }}>★</span>)}
                <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>{p.rating}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '12.5px' }}>({p.reviews})</span>
              </div>
              <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>📍 {p.location}</span>
            </div>
            <div style={{ height: '1px', background: 'var(--border)' }} />
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {p.tags.map(t => <Badge key={t} color="muted">{t}</Badge>)}
              <Badge color={p.available ? 'success' : 'danger'}>{p.available ? '● Available' : '● Busy'}</Badge>
            </div>
            <Button fullWidth disabled={!p.available} onClick={() => setSelected(p)}>
              {p.available ? 'Book Now' : 'Currently Unavailable'}
            </Button>
          </Card>
        ))}
      </div>

      {/* Booking Modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(17,24,39,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px', animation: 'fadeIn 0.2s ease' }}>
          <Card padding="32px" style={{ width: '100%', maxWidth: '440px', animation: 'fadeInUp 0.3s ease', boxShadow: 'var(--shadow-lg)' }}>
            {booked ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', margin: '0 auto 16px' }}>🎉</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Booking Requested!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>We've notified {selected.name}. Confirmation coming shortly.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)' }}>Confirm Booking</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: 'var(--brand-light)', borderRadius: 'var(--radius-md)', marginBottom: '20px', border: '1px solid #DDD6FE' }}>
                  <Avatar initials={selected.avatar} size={44} />
                  <div>
                    <p style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{selected.name}</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{selected.service} · ₹{selected.price} onwards</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                  <Input label="Preferred Date" type="date" value={new Date().toISOString().split('T')[0]} onChange={() => {}} />
                  <Input label="Preferred Time" type="time" value="10:00" onChange={() => {}} />
                  <Input label="Service Address" placeholder="Enter full address" icon="📍" onChange={() => {}} />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button variant="outline" fullWidth onClick={() => setSelected(null)}>Cancel</Button>
                  <Button fullWidth onClick={confirmBook}>Confirm →</Button>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}