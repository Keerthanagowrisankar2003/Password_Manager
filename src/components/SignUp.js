// SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.scss';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/signup', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/manager');
    } catch (error) {
      console.error('Error signing up', error);
    }
  };

  return (
    <div className="Signup">
    <form className="signup-form" onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
      <div className="login-link">
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </form>
    </div>
  );
}

export default SignUp;
