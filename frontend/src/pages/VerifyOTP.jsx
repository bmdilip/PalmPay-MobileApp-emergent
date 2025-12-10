import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Check, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';
import Logo from '../components/Logo';
import { useAuth } from '../contexts/AuthContext';
import { setUserLoggedIn, setOnboardingCompleted, isPalmRegistered } from '../utils/auth';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const identifier = location.state?.identifier || '+91-XXXXXXXXXX';
  const authMethod = location.state?.authMethod || 'mobile';

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Auto-verify when 6 digits entered
  useEffect(() => {
    if (otp.length === 6) {
      handleVerify();
    }
  }, [otp]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Please enter 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      // Mock verification - accept any 6-digit OTP
      const mockUser = {
        id: 'user-' + Date.now(),
        name: 'User',
        email: authMethod === 'email' ? identifier : '',
        mobile: authMethod === 'mobile' ? identifier : ''
      };
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Store using old method for compatibility
      localStorage.setItem('palmpay_user', JSON.stringify(mockUser));
      localStorage.setItem('palmpay_token', mockToken);
      
      // Store using new auth system
      setUserLoggedIn(mockUser);
      setOnboardingCompleted();
      
      setIsVerifying(false);
      
      // Check if palm is already registered
      if (isPalmRegistered()) {
        navigate('/home'); // Go straight to home if palm already registered
      } else {
        navigate('/palm-register'); // Show palm registration if not done
      }
    }, 1500);
  };

  const handleResend = () => {
    setCanResend(false);
    setResendTimer(30);
    setOtp('');
    setError('');
    // Simulate resend API call
    console.log('Resending OTP to:', identifier);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div 
          className="absolute top-20 -left-20 w-96 h-96 bg-[#586BFF] rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-20 -right-20 w-96 h-96 bg-[#64E8FF] rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/auth')}
          className="absolute top-6 left-6 p-2 text-white/60 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>

        {/* Logo */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Logo size="md" withGlow={true} />
        </motion.div>

        {/* OTP Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl p-8">
            {/* Icon */}
            <motion.div
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#586BFF] to-[#64E8FF] flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              Verify OTP
            </h2>
            <p className="text-white/60 text-sm text-center mb-8">
              Enter the 6-digit code sent to
              <br />
              <span className="text-white font-medium">{identifier}</span>
            </p>

            {/* OTP Input */}
            <div className="mb-6">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => {
                  setOtp(value);
                  setError('');
                }}
                containerClassName="justify-center"
              >
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="w-12 h-14 text-xl font-bold bg-white/10 border-white/30 text-white focus:border-[#586BFF] focus:ring-[#586BFF]"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center mb-4"
              >
                {error}
              </motion.p>
            )}

            {/* Verify Button */}
            <motion.button
              onClick={handleVerify}
              disabled={isVerifying || otp.length !== 6}
              className="w-full py-3.5 bg-gradient-to-r from-[#586BFF] to-[#64E8FF] hover:from-[#4a5ceb] hover:to-[#5ad4eb] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
              whileHover={{ scale: isVerifying ? 1 : 1.02 }}
              whileTap={{ scale: isVerifying ? 1 : 0.98 }}
            >
              {isVerifying ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  Verifying...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Verify OTP
                </>
              )}
            </motion.button>

            {/* Resend OTP */}
            <div className="text-center">
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="text-[#64E8FF] hover:text-[#64E8FF]/80 text-sm font-semibold transition-colors"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-white/60 text-sm">
                  Resend OTP in{' '}
                  <span className="text-white font-semibold">{resendTimer}s</span>
                </p>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-white/40 mb-4">
            Didn't receive code? Check your SMS inbox
          </p>
          <p className="text-xs text-white/70 font-medium mb-1">
            PalmPe™ | PalmPay™
          </p>
          <p className="text-xs text-white/50">
            © 2025 Lumioria Innovations Pvt. Ltd. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyOTP;
