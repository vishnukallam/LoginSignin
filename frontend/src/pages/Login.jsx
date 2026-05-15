import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ShieldCheck, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Logo = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="56" height="56" rx="16" fill="url(#grad)" />
    <path d="M28 10L14 17v11c0 9.4 5.9 18.1 14 21 8.1-2.9 14-11.6 14-21V17L28 10z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
    <path d="M22 28l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="grad" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366f1"/>
        <stop offset="1" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
  </svg>
);

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, formData);
      localStorage.setItem('token', res.data.token);
      toast.success('Access Granted. Welcome to ZenCTech.');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unauthorized entry (Login failed)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="zero-g-container">
      <div className="cosmos-bg">
        <div className="nebula" style={{ top: '15%', right: '15%' }}></div>
        <div className="nebula" style={{ bottom: '15%', left: '15%', background: 'radial-gradient(circle, var(--secondary-glow) 0%, transparent 70%)' }}></div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="anti-g-card"
      >
        <div className="logo-container">
          <Logo />
        </div>
        <h1>ZenCTech</h1>
        <p className="subtitle">Secure terminal login</p>
        <form onSubmit={handleSubmit}>
          <div className="floating-field">
            <input type="email" name="email" placeholder=" " required value={formData.email} onChange={handleChange} />
            <label><Mail size={16} /> Email Coordinates</label>
          </div>
          <div className="floating-field">
            <input type="password" name="password" placeholder=" " required value={formData.password} onChange={handleChange} />
            <label><Lock size={16} /> Security Key</label>
          </div>
          <button type="submit" className="btn-launch" disabled={loading}>
            {loading ? <div className="spinner"></div> : <><ShieldCheck size={20} /> Authorize Entry</>}
          </button>
        </form>
        <p className="link-text">
          New Explorer? <Link to="/register">Register Identity</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
