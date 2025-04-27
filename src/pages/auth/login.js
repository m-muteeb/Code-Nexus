import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../service/firebase';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // For button loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email });

    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in all fields.');
      console.warn('Validation failed: Empty email or password.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);

      toast.success('Login successful!');

      // Reset form fields
      setEmail('');
      setPassword('');

      // Navigate to homepage
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);

      // Handle different Firebase errors
      if (error.code === 'auth/user-not-found') {
        toast.error('No account found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password.');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address.');
      } else {
        toast.error(error.message || 'Login failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button 
          type="submit" 
          className="auth-button"
          disabled={loading}
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>
        <p><Link to="/forgot-password">Forgot Password?</Link></p>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default Login;
