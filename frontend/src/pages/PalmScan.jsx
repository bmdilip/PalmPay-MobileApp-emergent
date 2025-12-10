import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import PalmNFCIcon from '../components/icons/PalmNFCIcon';
import { mockUser } from '../mockDataPalmPay';

const PalmScan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, recipient, amount, note, returnTo } = location.state || {};
  
  const [scanStatus, setScanStatus] = useState('scanning'); // 'scanning', 'success', 'failed'
  const [scanProgress, setScanProgress] = useState(0);
  const [deductionComplete, setDeductionComplete] = useState(false);

  // Simulate palm scanning
  useEffect(() => {
    if (scanStatus === 'scanning') {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Simulate successful authentication
            setTimeout(() => {
              setScanStatus('success');
              // Simulate wallet deduction
              setTimeout(() => {
                setDeductionComplete(true);
              }, 1000);
            }, 500);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [scanStatus]);

  const handleComplete = () => {
    if (returnTo) {
      navigate(returnTo, { 
        state: { 
          success: true,
          message: `Request sent successfully to ${recipient}` 
        } 
      });
    } else {
      navigate('/home');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] text-white flex flex-col">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#586BFF] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#9B62FF] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 py-6 flex items-center gap-4">
        <button onClick={handleCancel} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl font-bold">Palm Authentication</h1>
          <p className="text-sm text-white/60">Verify your identity</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {scanStatus === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              {/* Palm Scan Animation */}
              <div className="relative w-64 h-64 mb-8 mx-auto">
                {/* Outer Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-[#586BFF]/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Inner Ring */}
                <motion.div
                  className="absolute inset-8 rounded-full border-4 border-[#64E8FF]/50"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Palm Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <PalmNFCIcon className="w-32 h-32" />
                  </motion.div>
                </div>
                
                {/* Scan Line */}
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#64E8FF] to-transparent"
                  animate={{ 
                    top: ['0%', '100%'],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>

              <h2 className="text-2xl font-bold mb-2">Scanning Palm...</h2>
              <p className="text-white/60 mb-6">Please hold your palm steady</p>
              
              {/* Progress Bar */}
              <div className="w-64 mx-auto">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span className="font-bold text-[#64E8FF]">{scanProgress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#586BFF] to-[#64E8FF]"
                    initial={{ width: 0 }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {scanStatus === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-32 h-32 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
              >
                <CheckCircle2 className="w-20 h-20 text-green-400" />
              </motion.div>

              <h2 className="text-2xl font-bold mb-2">Authentication Successful!</h2>
              <p className="text-white/60 mb-8">Your palm has been verified</p>

              {/* Transaction Details */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 mb-6 text-left max-w-md mx-auto">
                <h3 className="text-sm font-semibold text-white/60 mb-4">Request Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/80">To:</span>
                    <span className="font-semibold">{recipient}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Amount:</span>
                    <span className="font-bold text-[#64E8FF] text-xl">₹{amount}</span>
                  </div>
                  {note && (
                    <div className="flex justify-between">
                      <span className="text-white/80">Note:</span>
                      <span className="font-medium">{note}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex justify-between">
                      <span className="text-white/80">Authenticated by:</span>
                      <span className="font-semibold">Palm Biometric</span>
                    </div>
                  </div>
                </div>
              </Card>

              {deductionComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-semibold">Request sent successfully</span>
                  </div>
                </motion.div>
              )}

              <Button
                onClick={handleComplete}
                className="w-full max-w-md bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb] h-14 text-lg font-semibold"
              >
                Done
              </Button>
            </motion.div>
          )}

          {scanStatus === 'failed' && (
            <motion.div
              key="failed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-32 h-32 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center"
              >
                <XCircle className="w-20 h-20 text-red-400" />
              </motion.div>

              <h2 className="text-2xl font-bold mb-2">Authentication Failed</h2>
              <p className="text-white/60 mb-8">Please try again</p>

              <div className="space-y-3 max-w-md mx-auto">
                <Button
                  onClick={() => {
                    setScanStatus('scanning');
                    setScanProgress(0);
                  }}
                  className="w-full bg-gradient-to-r from-[#586BFF] to-[#9B62FF] h-12"
                >
                  Try Again
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 px-6 py-6 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-white/40">
          <AlertCircle className="w-4 h-4" />
          <span>Secure palm biometric authentication</span>
        </div>
      </div>
    </div>
  );
};

export default PalmScan;
