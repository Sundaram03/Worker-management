import React, { useState } from 'react';
import { useLanguage } from './App';
import { useStore } from './store';

export default function Attendance() {
  const { t } = useLanguage();
  const { data, updateAttendance } = useStore();
  const [date, setDate] = useState('2026-05-01');

  const getStatus = (workerId) => {
    return (data.attendance[date] && data.attendance[date][workerId]) || null;
  };

  return (
    <div className="container mt-32">
      <div className="mb-24">
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600 }}>{t.attendance.toUpperCase()}</p>
        <h1>{t.markAttendance}</h1>
      </div>

      <div className="card" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
        <button onClick={() => {/* handle prev day */}} style={{ background: 'none', fontSize: '1.25rem' }}>‹</button>
        <div className="flex items-center gap-12" style={{ fontWeight: 600 }}>
          📅 <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ border: 'none', font: 'inherit' }} />
        </div>
        <button onClick={() => {/* handle next day */}} style={{ background: 'none', fontSize: '1.25rem' }}>›</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {data.workers.map(worker => {
          const status = getStatus(worker.id);
          return (
            <div key={worker.id} className="card">
              <div className="flex justify-between items-start mb-16">
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{worker.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{worker.role} • ₹{worker.dailyWage}/day</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>AMOUNT</p>
                  <p style={{ fontSize: '1.125rem', fontWeight: 700 }}>₹{status === 'present' ? worker.dailyWage : status === 'half-day' ? worker.dailyWage / 2 : 0}</p>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <button 
                  onClick={() => updateAttendance(date, worker.id, 'present')}
                  style={{ 
                    padding: '12px', 
                    background: status === 'present' ? 'var(--primary)' : 'white', 
                    color: status === 'present' ? 'white' : 'var(--text-main)',
                    border: '1px solid ' + (status === 'present' ? 'var(--primary)' : 'var(--border)')
                  }}
                >
                  ✓ {t.present}
                </button>
                <button 
                  onClick={() => updateAttendance(date, worker.id, 'half-day')}
                  style={{ 
                    padding: '12px', 
                    background: status === 'half-day' ? 'var(--half-day)' : 'white', 
                    color: status === 'half-day' ? 'white' : 'var(--text-main)',
                    border: '1px solid ' + (status === 'half-day' ? 'var(--half-day)' : 'var(--border)')
                  }}
                >
                  ◒ {t.halfDay}
                </button>
                <button 
                  onClick={() => updateAttendance(date, worker.id, 'absent')}
                  style={{ 
                    padding: '12px', 
                    background: status === 'absent' ? 'var(--absent)' : 'white', 
                    color: status === 'absent' ? 'white' : 'var(--text-main)',
                    border: '1px solid ' + (status === 'absent' ? 'var(--absent)' : 'var(--border)')
                  }}
                >
                  ✕ {t.absent}
                </button>
              </div>
              
              <button style={{ background: 'none', color: 'var(--primary)', fontSize: '0.875rem', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                🔗 {t.customWage}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
