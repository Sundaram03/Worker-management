import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { translations } from './translations';
import { useStore } from './store';

import Dashboard from './Dashboard';
import Workers from './Workers';
import Attendance from './Attendance';
import Money from './Money';
import Report from './Report';
import Login from './Login';

// Language Context
const LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);

export default function App() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const { user, logout } = useStore();

  if (!user) {
    return (
      <LanguageContext.Provider value={{ lang, setLang, t }}>
        <Login />
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <Router>
        <header>
          <div className="container">
            <div className="nav-container">
              <div className="logo">
                <div style={{ background: 'var(--primary)', color: 'white', width: '32px', height: '32px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📖</div>
                Wage Ledger
              </div>
              <div className="flex gap-12">
                <button onClick={() => setLang(lang === 'en' ? 'ta' : 'en')} className="flex items-center gap-12" style={{ padding: '8px 16px', background: '#f0f0f0', border: '1px solid var(--border)', borderRadius: '8px', fontWeight: 600 }}>
                  🌐 {lang === 'en' ? 'EN' : 'தமிழ்'}
                </button>
                <div style={{ background: '#eee', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '0.875rem' }}>
                  {user.name} ({user.role})
                </div>
                <button 
                  onClick={logout}
                  style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px' }}
                >
                  ↪ {t.logout}
                </button>
              </div>
            </div>
            <nav className="nav-menu">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>🎛 {t.dashboard}</NavLink>
              <NavLink to="/workers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>👥 {t.workers}</NavLink>
              <NavLink to="/attendance" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>📅 {t.attendance}</NavLink>
              <NavLink to="/money" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>💵 {t.money}</NavLink>
              <NavLink to="/report" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>📊 {t.report}</NavLink>
            </nav>
          </div>
        </header>

        <main style={{ paddingBottom: '100px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/money" element={<Money />} />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </Router>
    </LanguageContext.Provider>
  );
}

