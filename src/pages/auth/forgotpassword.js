import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../service/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleReset} className="auth-form">
        <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit" className="auth-button">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
