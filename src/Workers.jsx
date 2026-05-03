import React, { useState } from 'react';
import { useLanguage } from './App';
import { useStore } from './store';

export default function Workers() {
  const { t } = useLanguage();
  const { data, addWorker, updateWorker, deleteWorker } = useStore();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false); // false | 'add' | 'edit'
  const [currentWorker, setCurrentWorker] = useState({ name: '', role: '', dailyWage: '', phone: '' });

  const filteredWorkers = data.workers.filter(w => 
    w.name.toLowerCase().includes(search.toLowerCase()) || 
    w.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showModal === 'add') {
      addWorker({ ...currentWorker, dailyWage: Number(currentWorker.dailyWage) });
    } else if (showModal === 'edit') {
      updateWorker({ ...currentWorker, dailyWage: Number(currentWorker.dailyWage) });
    }
    setCurrentWorker({ name: '', role: '', dailyWage: '', phone: '' });
    setShowModal(false);
  };

  const openEdit = (worker) => {
    setCurrentWorker(worker);
    setShowModal('edit');
  };

  const openAdd = () => {
    setCurrentWorker({ name: '', role: '', dailyWage: '', phone: '' });
    setShowModal('add');
  };

  return (
    <div className="container mt-32">
      <div className="flex justify-between items-center mb-24">
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600 }}>{t.workers.toUpperCase()}</p>
          <h1>{data.workers.length} {t.workers}</h1>
        </div>
        <button 
          onClick={openAdd}
          style={{ background: 'var(--primary)', color: 'white', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span style={{ fontSize: '1.25rem' }}>+</span> {t.addWorker}
        </button>
      </div>

      <div className="card" style={{ marginBottom: '24px', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: 'var(--text-muted)' }}>🔍</span>
        <input 
          type="text" 
          placeholder={t.searchWorkers} 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {filteredWorkers.map(worker => (
          <div key={worker.id} className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0f4f1', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.25rem' }}>
              {worker.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div className="flex justify-between">
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{worker.name}</h3>
                <div className="flex gap-12">
                  <button onClick={() => openEdit(worker)} style={{ color: 'var(--text-muted)', background: 'none' }}>✏️</button>
                  <button onClick={() => deleteWorker(worker.id)} style={{ color: '#C65F5F', background: 'none' }}>🗑️</button>
                </div>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '4px', display: 'flex', gap: '16px' }}>
                <span>💼 {worker.role}</span>
                <span>📞 {worker.phone}</span>
                <span>💸 ₹{worker.dailyWage}/day</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <form onSubmit={handleSubmit} className="card" style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2>{showModal === 'add' ? t.addWorker : 'Edit Worker'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>NAME</label>
              <input 
                placeholder="Name" 
                required 
                value={currentWorker.name} 
                onChange={e => setCurrentWorker({...currentWorker, name: e.target.value})}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>ROLE</label>
              <input 
                placeholder="Role" 
                required 
                value={currentWorker.role} 
                onChange={e => setCurrentWorker({...currentWorker, role: e.target.value})}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>DAILY WAGE</label>
              <input 
                placeholder="Daily Wage" 
                type="number" 
                required 
                value={currentWorker.dailyWage} 
                onChange={e => setCurrentWorker({...currentWorker, dailyWage: e.target.value})}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>PHONE</label>
              <input 
                placeholder="Phone" 
                value={currentWorker.phone} 
                onChange={e => setCurrentWorker({...currentWorker, phone: e.target.value})}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
              />
            </div>
            <div className="flex gap-12 mt-12">
              <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', background: '#eee' }}>Cancel</button>
              <button type="submit" style={{ flex: 1, padding: '12px', background: 'var(--primary)', color: 'white' }}>Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
