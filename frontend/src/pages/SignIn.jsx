import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Rocket, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Logo = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="56" height="56" rx="16" fill="url(#grad2)" />
    <path d="M28 10L14 17v11c0 9.4 5.9 18.1 14 21 8.1-2.9 14-11.6 14-21V17L28 10z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
    <circle cx="28" cy="27" r="5" fill="white" fillOpacity="0.9"/>
    <path d="M18 42c0-5.5 4.5-9 10-9s10 3.5 10 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <defs>
      <linearGradient id="grad2" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366f1"/>
        <stop offset="1" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
  </svg>
);

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Parity check failed (Passwords do not match)');
    }
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, {
        email: formData.email,
        password: formData.password
      });
      toast.success('System Linked! Coordinates saved.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signal lost (Registration failed)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="zero-g-container">
      <div className="cosmos-bg">
        <div className="nebula" style={{ top: '20%', left: '10%' }}></div>
        <div className="nebula" style={{ bottom: '20%', right: '10%', background: 'radial-gradient(circle, var(--secondary-glow) 0%, transparent 70%)' }}></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="anti-g-card"
      >
        <div className="logo-container">
          <Logo />
        </div>
        <h1>ZenCTech</h1>
        <p className="subtitle">An AI Powered platform</p>
        <form onSubmit={handleSubmit}>
          <div className="floating-field">
            <input type="email" name="email" placeholder=" " required value={formData.email} onChange={handleChange} />
            <label><Mail size={16} /> Email Coordinates</label>
          </div>
          <div className="floating-field">
            <input type="password" name="password" placeholder=" " required value={formData.password} onChange={handleChange} />
            <label><Lock size={16} /> Security Key</label>
          </div>
          <div className="floating-field">
            <input type="password" name="confirmPassword" placeholder=" " required value={formData.confirmPassword} onChange={handleChange} />
            <label><Lock size={16} /> Confirm Key</label>
          </div>
          <button type="submit" className="btn-launch" disabled={loading}>
            {loading ? <div className="spinner"></div> : <><Rocket size={20} /> Launch Sequence</>}
          </button>
        </form>
        <p className="link-text">
          Already linked? <Link to="/login">Initialize Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
