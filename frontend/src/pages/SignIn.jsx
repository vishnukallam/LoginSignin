import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const SignIn = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    occupation: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setLoading(true);
    try {
      const { confirmPassword, ...signupData } = formData;
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, signupData);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-mesh">
        <div className="blob" style={{ top: '10%', left: '10%' }}></div>
        <div className="blob" style={{ bottom: '10%', right: '10%', animationDelay: '-5s' }}></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="m3-card"
      >
        <h1>Create Account</h1>
        <p className="subtitle">Join our premium community</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" name="fullName" placeholder=" " required value={formData.fullName} onChange={handleChange} />
            <label>Full Name</label>
          </div>

          <div className="input-group">
            <input type="email" name="email" placeholder=" " required value={formData.email} onChange={handleChange} />
            <label>Email ID</label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <input type="number" name="age" placeholder=" " required value={formData.age} onChange={handleChange} />
              <label>Age</label>
            </div>
            <div className="input-group">
              <select name="gender" required value={formData.gender} onChange={handleChange}>
                <option value="" disabled hidden></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              <label>Gender</label>
            </div>
          </div>

          <div className="input-group">
            <input type="text" name="occupation" placeholder=" " required value={formData.occupation} onChange={handleChange} />
            <label>Occupation</label>
          </div>

          <div className="input-group">
            <input type={showPassword ? "text" : "password"} name="password" placeholder=" " required value={formData.password} onChange={handleChange} />
            <label>Password</label>
            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="input-group">
            <input type={showPassword ? "text" : "password"} name="confirmPassword" placeholder=" " required value={formData.confirmPassword} onChange={handleChange} />
            <label>Confirm Password</label>
          </div>

          <button type="submit" className="btn-m3" disabled={loading}>
            {loading ? <div className="spinner"></div> : <><UserPlus size={20} /> Sign Up</>}
          </button>
        </form>

        <p className="link-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.div>
    </>
  );
};

export default SignIn;
