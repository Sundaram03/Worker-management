import React from 'react';
import { useLanguage } from './App';
import { useStore } from './store';

export default function Report() {
  const { t } = useLanguage();
  const { data } = useStore();

  const calculateReport = (workerId) => {
    let presentCount = 0;
    let halfDayCount = 0;
    let absentCount = 0;
    let gross = 0;
    
    // Simple calculation for May 2026 for demo
    Object.keys(data.attendance).forEach(date => {
      const status = data.attendance[date][workerId];
      const worker = data.workers.find(w => w.id === workerId);
      if (status === 'present') {
        presentCount++;
        gross += worker.dailyWage;
      } else if (status === 'half-day') {
        halfDayCount++;
        gross += worker.dailyWage / 2;
      } else if (status === 'absent') {
        absentCount++;
      }
    });

    const entries = data.moneyEntries.filter(m => m.workerId === workerId);
    const bonus = entries.filter(m => m.type === 'bonus').reduce((acc, m) => acc + m.amount, 0);
    const advance = entries.filter(m => m.type === 'advance').reduce((acc, m) => acc + m.amount, 0);
    const deduction = entries.filter(m => m.type === 'deduction').reduce((acc, m) => acc + m.amount, 0);
    
    const netPayable = gross + bonus - advance - deduction;

    return { presentCount, halfDayCount, absentCount, gross, bonus, advance, deduction, netPayable };
  };

  return (
    <div className="container mt-32">
      <div className="flex justify-between items-center mb-24">
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600 }}>{t.report.toUpperCase()}</p>
          <h1>{t.monthlyReport}</h1>
        </div>
        <div className="flex gap-12">
          <button style={{ padding: '8px 16px', background: 'white', border: '1px solid var(--border)' }}>📥 {t.csv}</button>
          <button style={{ padding: '8px 16px', background: 'var(--primary)', color: 'white' }}>🖨️ {t.print}</button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="flex items-center gap-12" style={{ fontWeight: 600 }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>PICK MONTH</span>
          <span>May, 2026</span>
        </div>
        <span>📅</span>
      </div>

      <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8f9f7', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '16px 20px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.name}</th>
              <th style={{ padding: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>PRESENT</th>
              <th style={{ padding: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>HALF-DAY</th>
              <th style={{ padding: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>ABSENT</th>
              <th style={{ padding: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.gross}</th>
              <th style={{ padding: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.bonus}</th>
              <th style={{ padding: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.advance}</th>
              <th style={{ padding: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.deduction}</th>
              <th style={{ padding: '16px 20px', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>{t.netPayable}</th>
            </tr>
          </thead>
          <tbody>
            {data.workers.map(worker => {
              const stats = calculateReport(worker.id);
              return (
                <tr key={worker.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 600 }}>{worker.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{worker.role}</div>
                  </td>
                  <td style={{ padding: '16px' }}>{stats.presentCount}</td>
                  <td style={{ padding: '16px' }}>{stats.halfDayCount}</td>
                  <td style={{ padding: '16px' }}>{stats.absentCount}</td>
                  <td style={{ padding: '16px' }}>₹{stats.gross}</td>
                  <td style={{ padding: '16px' }}>₹{stats.bonus}</td>
                  <td style={{ padding: '16px' }}>₹{stats.advance}</td>
                  <td style={{ padding: '16px' }}>₹{stats.deduction}</td>
                  <td style={{ padding: '16px 20px', textAlign: 'right', fontWeight: 700 }}>₹{stats.netPayable}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
