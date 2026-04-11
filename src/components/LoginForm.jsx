import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인/회원가입 로직 처리 후 닫기
    onLogin();
  };

  return (
    <div className="login-box">
      <h2>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
      <p className="login-subtitle">
        {isLoginMode 
          ? '해당 정보를 기입해주세요.' 
          : '프롬프트 보호를 하기 위해서는 회원가입이 필요합니다.'}
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Username</label>
          <input type="text" placeholder="아이디를 입력해주세요" required />
        </div>

        {!isLoginMode && (
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" placeholder="example@email.com" required />
          </div>
        )}
        
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="비밀번호를 입력해주세요" required />
        </div>

        {!isLoginMode && (
          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="비밀번호를 다시 입력해주세요" required />
          </div>
        )}
        
        <button type="submit" className="btn-login-submit">
          {isLoginMode ? '로그인' : '회원가입'}
        </button>
      </form>
      
      <div className="login-footer">
        <span>
          {isLoginMode ? "계정이 없으신가요? " : "이미 계정이 있으신가요? "}
        </span>
        <span 
          className="link-signup" 
          onClick={() => setIsLoginMode(!isLoginMode)}
        >
          {isLoginMode ? '회원가입' : '로그인'}
        </span>
      </div>
    </div>
  );
};

export default LoginForm;