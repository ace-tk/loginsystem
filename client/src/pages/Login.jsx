import { useState } from 'react';
import '../styles/auth.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
  };

  return (
    <div className="auth-container">
      {/* Background blobs based on the image */}
      <div className="blob blob-left"></div>
      <div className="blob blob-right"></div>

      <div className="login-content">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email ID</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
            </div>
          </div>

          <div className="action-row">
            <button type="submit" className="login-button">
              Login
            </button>
            <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
          </div>

          <p className="signup-text">
            Don't have an account? <a href="#" onClick={(e) => e.preventDefault()}>Create new</a>
          </p>
        </form>

        <div className="divider">
          <span>Or Login with</span>
        </div>

        <button type="button" className="google-button">
          <svg className="google-icon" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
            />
            <path
              fill="#34A853"
              d="M16.04 18.013c-1.09.303-2.63.496-4.04.496-3.11 0-5.85-1.57-7.46-3.96l-4.04 3.12C3.12 21.43 7.27 24 12 24c3.12 0 5.92-1.12 8.08-2.98l-4.04-3.007Z"
            />
            <path
              fill="#4285F4"
              d="M23.49 12.275c0-.796-.073-1.563-.205-2.291H12v4.341h6.44a5.505 5.505 0 0 1-2.39 3.614l4.04 3.007C22.45 19.11 24 15.93 24 12.275Z"
            />
            <path
              fill="#FBBC05"
              d="M5.266 14.235 1.24 17.35a7.126 7.126 0 0 1-.513-3.115c0-1.077.243-2.113.673-3.04l4.026 3.115a3.978 3.978 0 0 0-.16 1.925Z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;