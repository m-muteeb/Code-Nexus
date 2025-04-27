import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../service/firebase';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    console.log("SignUp started with:", { name, email });

    // Basic form validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error('Please fill all fields correctly!');
      console.warn("Validation failed: empty fields");
      return;
    }
    if (password.length < 6) {
      toast.error('Password should be at least 6 characters.');
      console.warn("Validation failed: password too short");
      return;
    }

    setLoading(true);
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", userCredential.user);

      // Update user profile
      await updateProfile(userCredential.user, { displayName: name });
      console.log("Profile updated with name:", name);

      toast.success('User registered successfully!');

      // Clear form fields
      setName('');
      setEmail('');
      setPassword('');

      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error("Error during sign up:", error);

      // Handle Firebase errors better
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email is already in use. Try logging in.');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address.');
      } else {
        toast.error(error.message || 'Something went wrong!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <div className="auth-form">
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password (min 6 chars)" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button 
          type="button" 
          className="auth-button" 
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
