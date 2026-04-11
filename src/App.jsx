import { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

// 💡 이미지를 영문 파일명으로 import 합니다.
import HeroImage from "./assets/hero-image.png"; 

function App() {
  const [counts, setCounts] = useState({ total: 0, risks: 0, score: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setCounts({
        total: Math.floor(easeOut * 1284),
        risks: Math.floor(easeOut * 12),
        score: Math.floor(easeOut * 98)
      });
      if (frame === totalFrames) clearInterval(timer);
    }, frameRate);

    return () => clearInterval(timer);
  }, []);

  const scrollToDashboard = () => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
    setIsNavOpen(false);
  };

  return (
    <div className="branding-container">
      {/* 1. Login/Signup Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-x" onClick={() => setIsModalOpen(false)}>×</button>
            <LoginForm onLogin={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}

      {/* 2. Side Navigation */}
      <aside className={`side-nav ${isNavOpen ? 'open' : ''}`}>
        <button className="side-nav-close" onClick={() => setIsNavOpen(false)}>×</button>
        <div className="side-nav-header">
          <span className="logo-icon">🛡️</span>
          <h2>Menu</h2>
        </div>
        <ul className="side-nav-list">
          <li onClick={() => { setIsModalOpen(true); setIsNavOpen(false); }}>Login/Sign in</li>
          <li onClick={scrollToDashboard}>DashBoard</li>
          <li>Policy</li>
          <li>Help</li>
        </ul>
      </aside>
      {isNavOpen && <div className="side-nav-overlay" onClick={() => setIsNavOpen(false)}></div>}

      {/* 3. Header */}
      <nav className="site-header">
        <div className="logo-text">
          <span className="logo-icon">🛡️</span>
          PreSend Guard
        </div>
        <ul className="nav-categories desktop-only">
          <li onClick={() => setIsModalOpen(true)}>Login/Sign in</li>
          <li onClick={scrollToDashboard}>DashBoard</li>
          <li>Policy</li>
          <li>Help</li>
        </ul>
        <div className="header-right">
          <button className="advanced-hamburger" onClick={() => setIsNavOpen(!isNavOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* 4. Hero Section */}
      <main className="hero-main">
        <div className="hero-text-content">
          <h1 className="hero-title">PreSend Guard:<br />AI Prompt Protector</h1>
          <p className="hero-description">
            AI 프롬프트의 개인정보 유출을 실시간으로 차단하고<br />
            위험 점수를 분석하여 소중한 데이터를 안전하게 보호합니다.
          </p>
          <div className="button-group">
            <button className="btn-go-back">이전으로</button>
            <button className="btn-get-started" onClick={scrollToDashboard}>
              <span className="btn-icon">▶</span> 시작하기
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-mockup">
            <img src={HeroImage} alt="AI Security" className="mockup-screenshot" />
          </div>
        </div>
      </main>

      {/* 5. Dashboard Section */}
      <section className="dashboard-section" id="dashboard">
        <div className="section-header">
          <h2>Security Dashboard</h2>
          <p>실시간 보안 모니터링 현황</p>
        </div>
        <div className="stats-grid">
          <div className="stat-card"><h3>전체 프롬프트</h3><p className="stat-number">{counts.total.toLocaleString()}</p></div>
          <div className="stat-card danger"><h3>차단된 위험</h3><p className="stat-number">{counts.risks}</p></div>
          <div className="stat-card highlight"><h3>보안 점수</h3><p className="stat-number">{counts.score}%</p></div>
        </div>
      </section>
    </div>
  );
}

export default App;