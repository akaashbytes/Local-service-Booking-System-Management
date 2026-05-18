import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
const ROLE_CONFIG = {
  customer: {
    icon: '🏠',
    label: 'Customer',
    desc: 'Book home services, track jobs, manage payments',
    color: '#7C3AED',
    features: [
      'Browse 200+ professionals',
      'Real-time job tracking',
      'Secure payments & invoices',
    ],
  },
  provider: {
    icon: '🔧',
    label: 'Service Provider',
    desc: 'Manage jobs, set schedule, track earnings',
    color: '#059669',
    features: [
      'View & accept job requests',
      'Manage weekly schedule',
      'Track payouts & earnings',
    ],
  },
  admin: {
    icon: '⚙️',
    label: 'Administrator',
    desc: 'Full platform control & analytics',
    color: '#DC2626',
    features: [
      'Platform-wide analytics',
      'Provider verification',
      'Dispute resolution',
    ],
  },
};
export default function RoleSelectionPage() {
  const { pendingUser, selectRole, 
          logout, isPending } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isPending) {
      navigate('/login', { replace: true });
    }
  }, [isPending, navigate]);

  if (!isPending) return null;

  const firstName = pendingUser?.name
    ?.split(' ')[0] || 'User';
  const allowedRole = pendingUser?.role;
  useEffect(() => {
  if (!isPending) {
    navigate('/login', { replace: true });
  }
}, [isPending, navigate]);
  const handleConfirm = async () => {
    if (!selected) {
      setError('Please select a role to continue.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      const user = selectRole(selected);
      navigate(`/${user.role}`, { replace: true });
    } catch (err) {
      setError(err.message);
      setSelected(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    logout();
    navigate('/login', { replace: true });
  };
}