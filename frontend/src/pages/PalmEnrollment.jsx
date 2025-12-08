import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Hand, Smartphone, Wifi, AlertCircle, CheckCircle2, Loader2, X } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Logo from '../components/Logo';

const PalmEnrollment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: hand selection, 2: device connection, 3: scanning, 4: success
  const [selectedHand, setSelectedHand] = useState('right');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [deviceConnected, setDeviceConnected] = useState(false);

  // Auto-progress through steps for demo
  useEffect(() => {
    if (step === 2 && isConnecting) {
      setTimeout(() => {
        setDeviceConnected(true);
        setIsConnecting(false);
        setStep(3);
      }, 2500);
    }
  }, [step, isConnecting]);

  useEffect(() => {
    if (step === 3 && isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(4), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step, isScanning]);

  const handleHandSelect = (hand) => {
    setSelectedHand(hand);
  };

  const handleStartEnrollment = () => {
    setStep(2);
    setIsConnecting(true);
  };

  const handleStartScan = () => {
    setIsScanning(true);
  };

  const handleComplete = () => {
    navigate('/home');
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
          className="absolute bottom-20 -right-20 w-96 h-96 bg-[#64E8FF] rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 py-8">
        {/* Back Button & Logo */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/device-center')}
            className="p-2 text-white/60 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <Logo size="sm" withGlow={true} />
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <motion.div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s === step ? 'w-8 bg-[#64E8FF]' : s < step ? 'w-4 bg-green-500' : 'w-4 bg-white/20'
              }`}
              initial={{ width: 16 }}
              animate={{ width: s === step ? 32 : 16 }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {/* Step 1: Hand Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-md"
              >
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl p-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#586BFF] to-[#64E8FF] flex items-center justify-center"
                  >
                    <Hand className="w-10 h-10 text-white" />
                  </motion.div>

                  <h2 className="text-2xl font-bold text-white text-center mb-2">
                    Palm Registration
                  </h2>
                  <p className="text-white/60 text-sm text-center mb-8">
                    Choose which hand(s) you want to register
                  </p>

                  {/* Hand Selection */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <motion.button
                      onClick={() => handleHandSelect('left')}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        selectedHand === 'left'
                          ? 'border-[#64E8FF] bg-[#64E8FF]/10'
                          : 'border-white/20 bg-white/5'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-6xl mb-2">🖐️</div>
                      <p className="text-white font-semibold text-sm">Left Hand</p>
                      {selectedHand === 'left' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-2"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#64E8FF] mx-auto" />
                        </motion.div>
                      )}
                    </motion.button>

                    <motion.button
                      onClick={() => handleHandSelect('right')}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        selectedHand === 'right'
                          ? 'border-[#64E8FF] bg-[#64E8FF]/10'
                          : 'border-white/20 bg-white/5'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-6xl mb-2 scale-x-[-1]">🖐️</div>
                      <p className="text-white font-semibold text-sm">Right Hand</p>
                      {selectedHand === 'right' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-2"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#64E8FF] mx-auto" />
                        </motion.div>
                      )}
                    </motion.button>
                  </div>

                  <Button
                    onClick={handleStartEnrollment}
                    className="w-full py-6 bg-gradient-to-r from-[#586BFF] to-[#64E8FF] hover:from-[#4a5ceb] hover:to-[#5ad4eb] text-white font-semibold rounded-lg text-base"
                  >
                    Continue →
                  </Button>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Device Connection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-md"
              >
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl p-8">
                  <motion.div
                    animate={{ rotate: deviceConnected ? 0 : 360 }}
                    transition={{ duration: 2, repeat: deviceConnected ? 0 : Infinity, ease: 'linear' }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#586BFF] to-[#64E8FF] flex items-center justify-center"
                  >
                    {deviceConnected ? (
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    ) : (
                      <Smartphone className="w-10 h-10 text-white" />
                    )}
                  </motion.div>

                  <h2 className="text-2xl font-bold text-white text-center mb-2">
                    {deviceConnected ? 'Device Connected!' : 'Connecting to Device'}
                  </h2>
                  <p className="text-white/60 text-sm text-center mb-8">
                    {deviceConnected 
                      ? 'PalmPe device is ready for enrollment'
                      : 'Establishing secure connection to PalmPe device...'
                    }
                  </p>

                  {/* Connection Status */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${deviceConnected ? 'bg-green-500' : 'bg-yellow-500'} ${!deviceConnected && 'animate-pulse'}`} />
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">PalmPe Device</p>
                        <p className="text-white/60 text-xs">MG Road Terminal</p>
                      </div>
                      <Wifi className={`w-5 h-5 ${deviceConnected ? 'text-green-500' : 'text-yellow-500'}`} />
                    </div>

                    {deviceConnected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex items-center gap-3 p-4 bg-green-500/10 rounded-lg border border-green-500/30"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <div className="flex-1">
                          <p className="text-green-400 text-sm font-medium">Ready to Scan</p>
                          <p className="text-green-300/60 text-xs">Device is active and waiting</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Scanning */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-md"
              >
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl p-8">
                  <h2 className="text-2xl font-bold text-white text-center mb-2">
                    Registering your {selectedHand.toUpperCase()} hand
                  </h2>
                  <p className="text-white/60 text-sm text-center mb-8">
                    Place your {selectedHand} hand on the scanner
                  </p>

                  {/* Scanning Area */}
                  <div className="relative mb-8">
                    <motion.div 
                      className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-white/30 bg-white/5 flex items-center justify-center overflow-hidden"
                      animate={{
                        borderColor: isScanning ? ['rgba(255,255,255,0.3)', 'rgba(100,232,255,0.8)', 'rgba(255,255,255,0.3)'] : 'rgba(255,255,255,0.3)'
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {/* Hand Icon */}
                      <motion.div
                        animate={{
                          scale: isScanning ? [1, 1.05, 1] : 1,
                          rotate: selectedHand === 'left' ? 0 : 0
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-8xl opacity-30"
                      >
                        {selectedHand === 'left' ? '🖐️' : <span className="inline-block scale-x-[-1]">🖐️</span>}
                      </motion.div>

                      {/* Scanning Beam */}
                      {isScanning && (
                        <motion.div
                          className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-[#64E8FF]/50 to-transparent"
                          animate={{
                            top: ['0%', '100%']
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear'
                          }}
                        />
                      )}

                      {/* Corner Brackets */}
                      <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-[#64E8FF]" />
                      <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-[#64E8FF]" />
                      <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-[#64E8FF]" />
                      <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-[#64E8FF]" />
                    </motion.div>

                    {/* Device Active Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-green-500 rounded-full flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span className="text-white text-xs font-semibold">Device Active</span>
                    </motion.div>
                  </div>

                  {/* Status */}
                  {!isScanning ? (
                    <div className="text-center mb-6">
                      <p className="text-white/80 text-sm mb-4">
                        Place your palm flat on the scanner when ready
                      </p>
                      <Button
                        onClick={handleStartScan}
                        className="w-full py-4 bg-gradient-to-r from-[#586BFF] to-[#64E8FF] hover:from-[#4a5ceb] hover:to-[#5ad4eb] text-white font-semibold rounded-lg"
                      >
                        Start Scanning
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Progress Bar */}
                      <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#586BFF] to-[#64E8FF]"
                          initial={{ width: 0 }}
                          animate={{ width: `${scanProgress}%` }}
                        />
                      </div>

                      {/* Progress Text */}
                      <div className="text-center">
                        <p className="text-white font-semibold text-lg mb-1">{scanProgress}%</p>
                        <p className="text-white/60 text-sm">
                          {scanProgress < 30 && 'Initializing palm scanner...'}
                          {scanProgress >= 30 && scanProgress < 60 && 'Capturing palm print...'}
                          {scanProgress >= 60 && scanProgress < 90 && 'Analyzing biometric data...'}
                          {scanProgress >= 90 && 'Almost done...'}
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-full max-w-md"
              >
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
                  >
                    <Check className="w-12 h-12 text-white" strokeWidth={3} />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold text-white mb-3"
                  >
                    Enrollment Complete!
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/80 mb-8"
                  >
                    Your {selectedHand} palm has been successfully registered with PalmPe™
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white/5 rounded-xl p-6 mb-8"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white/60 text-sm">Palm ID</span>
                      <span className="text-white font-mono font-semibold">PLM-{Date.now().toString().slice(-8)}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white/60 text-sm">Registered Hand</span>
                      <span className="text-white font-semibold capitalize">{selectedHand}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Status</span>
                      <span className="text-green-400 font-semibold flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Active
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Button
                      onClick={handleComplete}
                      className="w-full py-4 bg-gradient-to-r from-[#586BFF] to-[#64E8FF] hover:from-[#4a5ceb] hover:to-[#5ad4eb] text-white font-semibold rounded-lg text-base mb-3"
                    >
                      Continue to Home
                    </Button>
                    <button
                      onClick={() => {
                        setStep(1);
                        setSelectedHand('right');
                        setScanProgress(0);
                        setIsScanning(false);
                        setDeviceConnected(false);
                      }}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      Register Another Hand
                    </button>
                  </motion.div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
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

export default PalmEnrollment;
