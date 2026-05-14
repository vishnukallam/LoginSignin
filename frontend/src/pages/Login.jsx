import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ShieldCheck, Mail, Lock, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

import logo from '../assets/logo.png';

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
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
      toast.success('Access Granted. Welcome to AntiGravity.');
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
          <img src={logo} alt="ZenCTech Logo" className="app-logo" />
        </div>
        <h1>ZenCTech</h1>

        <p className="subtitle">Secure terminal login</p>

        <form onSubmit={handleSubmit}>
          <div className="floating-field">
            <input
              type="email"
              name="email"
              placeholder=" "
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label><Mail size={16} inline /> Email Coordinates</label>
          </div>

          <div className="floating-field">
            <input
              type="password"
              name="password"
              placeholder=" "
              required
              value={formData.password}
              onChange={handleChange}
            />
            <label><Lock size={16} inline /> Security Key</label>
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
