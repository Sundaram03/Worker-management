import React, { useState } from 'react';
import { useLanguage } from './App';
import { useStore } from './store';

export default function Login() {
  const { t, lang, setLang } = useLanguage();
  const { login, loginWithGoogle } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">📖</div>
          <h1 className="login-title">{t.loginTitle}</h1>
          <p className="login-subtitle">{t.loginSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">{t.email}</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="name@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <div className="flex justify-between items-center" style={{ marginBottom: '8px' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>{t.password}</label>
              <a href="#" className="login-link" style={{ fontSize: '0.8rem' }}>{t.forgotPassword}</a>
            </div>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            {t.loginButton}
          </button>
        </form>

        <div className="divider">OR</div>

        <button onClick={loginWithGoogle} className="google-btn">
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
            <path fill="#1976D2" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          {t.googleLogin}
        </button>

        <div className="login-footer">
          {t.dontHaveAccount} <a href="#" className="login-link">{t.signUp}</a>
        </div>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button 
            onClick={() => setLang(lang === 'en' ? 'ta' : 'en')} 
            style={{ background: 'transparent', color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600 }}
          >
            🌐 {lang === 'en' ? 'தமிழ்' : 'English'}
          </button>
        </div>
      </div>
    </div>
  );
}
