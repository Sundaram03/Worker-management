import React, { useState } from 'react';
import { useLanguage } from './App';
import { useStore } from './store';

export default function Money() {
  const { t } = useLanguage();
  const { data, addMoneyEntry } = useStore();
  const [showAdd, setShowAdd] = useState(false);
  const [entry, setEntry] = useState({ workerId: '', type: 'advance', amount: '', date: '2026-05-01', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addMoneyEntry({ ...entry, amount: Number(entry.amount), workerId: Number(entry.workerId) });
    setShowAdd(false);
    setEntry({ workerId: '', type: 'advance', amount: '', date: '2026-05-01', description: '' });
  };

  return (
    <div className="container mt-32">
      <div className="flex justify-between items-center mb-24">
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600 }}>{t.money.toUpperCase()}</p>
          <h1>{t.addMoneyEntry}</h1>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          style={{ background: 'var(--primary)', color: 'white', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span style={{ fontSize: '1.25rem' }}>+</span> {t.addMoneyEntry}
        </button>
      </div>

      <div className="card" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="flex items-center gap-12" style={{ fontWeight: 600 }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>PICK MONTH</span>
          <span>May, 2026</span>
        </div>
        <span>📅</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {data.moneyEntries.map(m => {
          const worker = data.workers.find(w => w.id === m.workerId);
          return (
            <div key={m.id} className="card flex justify-between items-center">
              <div className="flex gap-16 items-center">
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {m.type === 'bonus' ? '➕' : m.type === 'advance' ? '➖' : '⬆'}
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{worker?.name || 'Unknown'}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{m.type.charAt(0).toUpperCase() + m.type.slice(1)} • {m.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-12">
                <span style={{ fontSize: '1.125rem', fontWeight: 700 }}>₹{m.amount}</span>
                <button style={{ color: '#C65F5F', background: 'none' }}>🗑️</button>
              </div>
            </div>
          );
        })}
      </div>

      {showAdd && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <form onSubmit={handleSubmit} className="card" style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2>{t.addMoneyEntry}</h2>
            <select 
              required 
              value={entry.workerId} 
              onChange={e => setEntry({...entry, workerId: e.target.value})}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
            >
              <option value="">Select Worker</option>
              {data.workers.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
            </select>
            <select 
              value={entry.type} 
              onChange={e => setEntry({...entry, type: e.target.value})}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
            >
              <option value="bonus">{t.bonus}</option>
              <option value="advance">{t.advance}</option>
              <option value="deduction">{t.deduction}</option>
            </select>
            <input 
              placeholder="Amount" 
              type="number" 
              required 
              value={entry.amount} 
              onChange={e => setEntry({...entry, amount: e.target.value})}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
            />
            <input 
              type="date" 
              value={entry.date} 
              onChange={e => setEntry({...entry, date: e.target.value})}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
            />
            <div className="flex gap-12 mt-12">
              <button type="button" onClick={() => setShowAdd(false)} style={{ flex: 1, padding: '12px', background: '#eee' }}>Cancel</button>
              <button type="submit" style={{ flex: 1, padding: '12px', background: 'var(--primary)', color: 'white' }}>Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
