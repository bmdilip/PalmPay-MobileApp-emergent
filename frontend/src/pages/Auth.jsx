import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Lock, Eye, EyeOff, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import Logo from '../components/Logo';
import { useAuth } from '../contexts/AuthContext';
import HoverCard3D from '../components/premium/HoverCard3D';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState('mobile'); // 'mobile' or 'email'
  const [loginType, setLoginType] = useState('otp'); // 'otp' or 'password'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    countryCode: '+91',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Country codes
  const countryCodes = [
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+1', country: 'USA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));

    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 25;
    setPasswordStrength(strength);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (authMethod === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    }

    if (authMethod === 'mobile') {
      if (!formData.mobile.trim()) {
        newErrors.mobile = 'Mobile number is required';
      } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
        newErrors.mobile = 'Invalid mobile number (10 digits required)';
      }
    }

    // Password validation only for password login type or signup
    if (loginType === 'password' || !isLogin) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      if (!isLogin && formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      if (loginType === 'otp' && isLogin) {
        // Navigate to OTP verification for both mobile and email
        navigate('/verify-otp', { 
          state: { 
            identifier: authMethod === 'mobile' 
              ? formData.countryCode + formData.mobile
              : formData.email,
            authMethod: authMethod
          } 
        });
      } else {
        // For password login or signup
        const mockUser = {
          id: 'user-' + Date.now(),
          name: formData.name || 'User',
          email: formData.email || formData.countryCode + formData.mobile,
          mobile: formData.countryCode + formData.mobile
        };
        const mockToken = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('palmpay_user', JSON.stringify(mockUser));
        localStorage.setItem('palmpay_token', mockToken);
        navigate('/palm-register');
      }
      setIsLoading(false);
    }, 1500);
  };

  // Get password strength color
  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return '#ef4444';
    if (passwordStrength < 50) return '#f59e0b';
    if (passwordStrength < 75) return '#eab308';
    return '#22c55e';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div 
          className="absolute top-20 -left-20 w-96 h-96 bg-[#586BFF] rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-20 -right-20 w-96 h-96 bg-[#9B62FF] rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Logo */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Logo size="xl" withGlow={true} />
        </motion.div>

        {/* Auth Card with 3D Hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <HoverCard3D intensity={8} shadow={true}>
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl overflow-hidden">
              {/* Tab Toggle */}
              <div className="p-6 pb-4">
                <div className="flex gap-2 p-1 bg-white/5 rounded-xl mb-6">
                  <motion.button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      isLogin
                        ? 'bg-gradient-to-r from-[#586BFF] to-[#9B62FF] text-white shadow-lg'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Login
                  </motion.button>
                  <motion.button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      !isLogin
                        ? 'bg-gradient-to-r from-[#586BFF] to-[#9B62FF] text-white shadow-lg'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign Up
                  </motion.button>
                </div>

                {/* Auth Method Toggle */}
                <div className="flex gap-2 mb-4">
                  <motion.button
                    onClick={() => setAuthMethod('mobile')}
                    className={`flex-1 py-2 px-4 rounded-lg text-xs font-medium transition-all ${
                      authMethod === 'mobile'
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone className="w-3 h-3 inline mr-1" />
                    Mobile
                  </motion.button>
                  <motion.button
                    onClick={() => setAuthMethod('email')}
                    className={`flex-1 py-2 px-4 rounded-lg text-xs font-medium transition-all ${
                      authMethod === 'email'
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail className="w-3 h-3 inline mr-1" />
                    Email
                  </motion.button>
                </div>

                {/* Login Type Toggle (OTP or Password) - Only for Login */}
                {isLogin && (
                  <motion.div 
                    className="flex gap-2 mb-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <motion.button
                      onClick={() => setLoginType('otp')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        loginType === 'otp'
                          ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                          : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      🔐 OTP Login
                    </motion.button>
                    <motion.button
                      onClick={() => setLoginType('password')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        loginType === 'password'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                          : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      🔑 Password Login
                    </motion.button>
                  </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <AnimatePresence mode="wait">
                    {/* Name field (signup only) */}
                    {!isLogin && (
                      <motion.div
                        key="name"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#586BFF] focus:ring-2 focus:ring-[#586BFF]/50 transition-all"
                        />
                        {errors.name && (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-xs mt-1 flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3" />
                            {errors.name}
                          </motion.p>
                        )}
                      </motion.div>
                    )}

                    {/* Mobile Number */}
                    {authMethod === 'mobile' && (
                      <motion.div
                        key="mobile"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Mobile Number
                        </label>
                        <div className="flex gap-2">
                          <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            className="px-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#586BFF] transition-all"
                          >
                            {countryCodes.map(({ code, country, flag }) => (
                              <option key={code} value={code} className="bg-[#1a1f3a]">
                                {flag} {code}
                              </option>
                            ))}
                          </select>
                          <div className="flex-1">
                            <input
                              type="tel"
                              name="mobile"
                              value={formData.mobile}
                              onChange={handleChange}
                              placeholder="10 digit mobile number"
                              maxLength="10"
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#586BFF] focus:ring-2 focus:ring-[#586BFF]/50 transition-all"
                            />
                          </div>
                        </div>
                        {errors.mobile && (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-xs mt-1 flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3" />
                            {errors.mobile}
                          </motion.p>
                        )}
                      </motion.div>
                    )}

                    {/* Email */}
                    {authMethod === 'email' && (
                      <motion.div
                        key="email"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#586BFF] focus:ring-2 focus:ring-[#586BFF]/50 transition-all"
                          />
                        </div>
                        {errors.email && (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-xs mt-1 flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </motion.p>
                        )}
                      </motion.div>
                    )}

                    {/* Password (for password login type or signup) */}
                    {(loginType === 'password' || !isLogin) && (
                      <motion.div
                        key="password"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="w-full pl-11 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#586BFF] focus:ring-2 focus:ring-[#586BFF]/50 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        {errors.password && (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-xs mt-1 flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3" />
                            {errors.password}
                          </motion.p>
                        )}
                        
                        {/* Password Strength Indicator */}
                        {!isLogin && formData.password && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-2"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-white/60">Password Strength</span>
                              <span 
                                className="text-xs font-semibold"
                                style={{ color: getPasswordStrengthColor() }}
                              >
                                {getPasswordStrengthText()}
                              </span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: getPasswordStrengthColor() }}
                                initial={{ width: 0 }}
                                animate={{ width: `${passwordStrength}%` }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}

                    {/* Confirm Password (signup only) */}
                    {!isLogin && (
                      <motion.div
                        key="confirmPassword"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter password"
                            className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#586BFF] focus:ring-2 focus:ring-[#586BFF]/50 transition-all"
                          />
                          {formData.confirmPassword && formData.password === formData.confirmPassword && (
                            <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
                          )}
                        </div>
                        {errors.confirmPassword && (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-xs mt-1 flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3" />
                            {errors.confirmPassword}
                          </motion.p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Forgot Password (login + password mode only) */}
                  {isLogin && loginType === 'password' && (
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => navigate('/forgot-password')}
                        className="text-xs text-[#64E8FF] hover:text-[#64E8FF]/80 transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isLoading ? 1 : 1.02, boxShadow: '0 10px 30px rgba(88, 107, 255, 0.4)' }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        {isLogin ? (loginType === 'otp' ? 'Send OTP' : 'Login') : 'Create Account'}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-white/5 border-t border-white/10">
                <p className="text-center text-xs text-white/60">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                  {' '}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-[#64E8FF] hover:text-[#64E8FF]/80 font-semibold transition-colors"
                  >
                    {isLogin ? 'Sign Up' : 'Login'}
                  </button>
                </p>
              </div>
            </Card>
          </HoverCard3D>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-white/40 mt-6 text-center max-w-md"
        >
          By continuing, you agree to PalmPay's Terms of Service and Privacy Policy
        </motion.p>
      </div>
    </div>
  );
};

export default Auth;
