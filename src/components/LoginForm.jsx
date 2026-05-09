import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  // 1. 입력 데이터를 관리할 상태 추가 (기존 UI 유지)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // 2. 입력값 변경 감지 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 회원가입 시 비밀번호 일치 확인 (간이 검증)
    if (!isLoginMode && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // 3. 백엔드 API 호출 (설정하신 AuthController 경로와 일치)
    const endpoint = isLoginMode ? '/api/auth/signin' : '/api/auth/signup';
    
    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(isLoginMode ? 'Login Successful' : 'User Registered Successfully');
        onLogin(); // 성공 시 대시보드로 이동
      } else {
        const errorMsg = await response.text();
        alert(`Error: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Connection Error:', error);
      alert('Could not connect to the server.');
    }
  };

  return (
    <div className="login-box">
      <h2>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
      <p className="login-subtitle">
        {isLoginMode 
          ? 'Please enter your credentials.' 
          : 'Sign up to protect your prompts.'}
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Username</label>
          <input 
            name="username" 
            type="text" 
            placeholder="Enter your ID" 
            value={formData.username}
            onChange={handleChange}
            required 
          />
        </div>

        {!isLoginMode && (
          <div className="input-group">
            <label>Email Address</label>
            <input 
              name="email" 
              type="email" 
              placeholder="example@email.com" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
        )}
        
        <div className="input-group">
          <label>Password</label>
          <input 
            name="password" 
            type="password" 
            placeholder="Enter password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>

        {!isLoginMode && (
          <div className="input-group">
            <label>Confirm Password</label>
            <input 
              name="confirmPassword" 
              type="password" 
              placeholder="Confirm password" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required 
            />
          </div>
        )}
        
        <button type="submit" className="btn-login-submit">
          {isLoginMode ? 'Login' : 'Sign Up'}
        </button>
      </form>
      
      <div className="login-footer">
        <span>
          {isLoginMode ? "Don't have an account? " : "Already have an account? "}
        </span>
        <span 
          className="link-signup" 
          onClick={() => setIsLoginMode(!isLoginMode)}
        >
          {isLoginMode ? 'Sign Up' : 'Login'}
        </span>
      </div>
    </div>
  );
};

export default LoginForm;