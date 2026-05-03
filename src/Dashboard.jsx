import React from 'react';
import { useLanguage } from './App';
import { useStore } from './store';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { t } = useLanguage();
  const { data } = useStore();
  const navigate = useNavigate();

  const today = '2026-05-01';
  const attendanceToday = data.attendance[today] || {};
  const presentToday = Object.values(attendanceToday).filter(s => s === 'present').length;
  const halfDayToday = Object.values(attendanceToday).filter(s => s === 'half-day').length;
  const absentToday = Object.values(attendanceToday).filter(s => s === 'absent').length;

  const calculateMonthly = () => {
    let gross = 0;
    Object.keys(data.attendance).forEach(date => {
      Object.keys(data.attendance[date]).forEach(workerId => {
        const status = data.attendance[date][workerId];
        const worker = data.workers.find(w => w.id === Number(workerId));
        if (worker) {
          if (status === 'present') gross += worker.dailyWage;
          else if (status === 'half-day') gross += worker.dailyWage / 2;
        }
      });
    });

    const bonus = data.moneyEntries.filter(m => m.type === 'bonus').reduce((acc, m) => acc + m.amount, 0);
    const advance = data.moneyEntries.filter(m => m.type === 'advance').reduce((acc, m) => acc + m.amount, 0);
    const deduction = data.moneyEntries.filter(m => m.type === 'deduction').reduce((acc, m) => acc + m.amount, 0);
    
    return { gross, bonus, advance, deduction, netPayable: gross + bonus - advance - deduction };
  };

  const stats = calculateMonthly();

  return (
    <div className="container mt-32">
      <div className="flex justify-between items-center mb-24">
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600 }}>{t.today} • {today}</p>
          <h1>{t.dashboard}</h1>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{t.workers}</h3>
            <p>{data.workers.length}</p>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{ background: '#E8F5E9', color: 'var(--present)' }}>✓</div>
          <div className="stat-info">
            <h3>{t.present}</h3>
            <p>{presentToday}</p>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{ background: '#FFF3E0', color: 'var(--half-day)' }}>◒</div>
          <div className="stat-info">
            <h3>{t.halfDay}</h3>
            <p>{halfDayToday}</p>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{ background: '#FFEBEE', color: 'var(--absent)' }}>✕</div>
          <div className="stat-info">
            <h3>{t.absent}</h3>
            <p>{absentToday}</p>
          </div>
        </div>
      </div>

      <div 
        className="card" 
        onClick={() => navigate('/attendance')}
        style={{ background: 'var(--primary)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
      >
        <div>
          <p style={{ opacity: 0.8, fontSize: '0.875rem', fontWeight: 600 }}>NOT MARKED: {data.workers.length - (presentToday + halfDayToday + absentToday)}</p>
          <h2 style={{ margin: 0 }}>{t.markAttendance}</h2>
        </div>
        <span style={{ fontSize: '1.5rem' }}>→</span>
      </div>

      <div className="mt-32">
        <div className="flex justify-between items-center mb-16">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600 }}>{t.thisMonth} • 2026-05</p>
          <button onClick={() => navigate('/report')} style={{ background: 'none', color: 'var(--primary)', fontWeight: 600 }}>{t.report} →</button>
        </div>
        <div className="stats-grid">
          <div className="card stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>{t.gross}</h3>
              <p>₹{stats.gross}</p>
            </div>
          </div>
          <div className="card stat-card">
            <div className="stat-icon">➖</div>
            <div className="stat-info">
              <h3>{t.advance}</h3>
              <p>₹{stats.advance}</p>
            </div>
          </div>
          <div className="card stat-card">
            <div className="stat-icon">➕</div>
            <div className="stat-info">
              <h3>{t.bonus}</h3>
              <p>₹{stats.bonus}</p>
            </div>
          </div>
          <div className="card stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <h3>{t.netPayable}</h3>
              <p>₹{stats.netPayable}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
