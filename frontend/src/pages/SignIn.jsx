import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Rocket, Mail, Lock, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
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
        <h1>ANTIGRAVITY</h1>
        <p className="subtitle">Enter the zero-gravity network</p>

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

          <div className="floating-field">
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder=" " 
              required 
              value={formData.confirmPassword} 
              onChange={handleChange} 
            />
            <label><Lock size={16} inline /> Confirm Key</label>
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
