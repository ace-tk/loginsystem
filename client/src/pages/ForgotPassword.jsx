import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Reset link sent! Redirecting to login...' });
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Error processing request' });
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setMessage({ type: 'error', text: 'Server error. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="blob blob-left"></div>
      <div className="blob blob-right"></div>

      <div className="login-content">
        <h1>Forgot Password</h1>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px', marginTop: '-15px', textAlign: 'center' }}>
          Enter your email and we'll send you a link to reset your password.
        </p>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email ID</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="login-button" disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
            {loading ? 'Sending link...' : 'Send Reset Link'}
          </button>

          <p className="signup-text" style={{ textAlign: 'center', marginTop: '20px' }}>
            Remembered your password? <Link to="/">Back to Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
