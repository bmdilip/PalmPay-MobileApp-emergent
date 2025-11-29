import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  ArrowLeft, 
  Search, 
  User, 
  CheckCircle2,
  ArrowRight,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockContacts } from '../mockDataPalmPay';
import { useWallet } from '../contexts/WalletContext';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem,
  modalBackdrop,
  modalContent,
  successCheck
} from '../lib/animations';

const AnimatedSendMoney = () => {
  const navigate = useNavigate();
  const { selectedWallet } = useWallet();
  const [step, setStep] = useState(1); // 1: Contact, 2: Amount, 3: Review, 4: Success
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.upiId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setStep(2);
  };

  const handleAmountSubmit = () => {
    if (amount && parseFloat(amount) > 0) {
      setStep(3);
    }
  };

  const handlePaymentConfirm = () => {
    // Simulate payment processing
    setTimeout(() => {
      setStep(4);
      setShowConfetti(true);
    }, 1500);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedContact(null);
    setAmount('');
    setNote('');
    setShowConfetti(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-br from-[#586BFF] via-[#6B7AFF] to-[#8B8FFF] text-white px-5 py-6 shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-4">
          <motion.button 
            onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)}
            className="p-2 hover:bg-white/10 rounded-full transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold">Send Money</h1>
            <motion.p 
              className="text-xs text-white/80"
              key={step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {step === 1 && 'Select recipient'}
              {step === 2 && 'Enter amount'}
              {step === 3 && 'Review payment'}
              {step === 4 && 'Payment successful'}
            </motion.p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 mt-4">
          {[1, 2, 3, 4].map((s) => (
            <motion.div
              key={s}
              className="flex-1 h-1 rounded-full bg-white/20"
              initial={{ scaleX: 0 }}
              animate={{ 
                scaleX: s <= step ? 1 : 0,
                backgroundColor: s <= step ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)'
              }}
              transition={{ duration: 0.3, delay: s * 0.1 }}
              style={{ transformOrigin: 'left' }}
            />
          ))}
        </div>
      </motion.div>

      {/* Step 1: Contact Selection */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            className="px-5 py-6"
            {...fadeInUp}
            exit={{ opacity: 0, x: -100 }}
          >
            {/* Animated Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search by name or UPI ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </Card>
            </motion.div>

            {/* Contacts List with Stagger */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-2"
            >
              {filteredContacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  variants={staggerItem}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className="p-4 cursor-pointer hover:shadow-lg transition-all"
                    onClick={() => handleContactSelect(contact)}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-[#586BFF] to-[#9B62FF] flex items-center justify-center text-white font-bold"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {contact.name.charAt(0)}
                      </motion.div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{contact.name}</p>
                        <p className="text-xs text-gray-500">{contact.upiId}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Step 2: Amount Entry */}
        {step === 2 && (
          <motion.div
            key="step2"
            className="px-5 py-6"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            {/* Selected Contact */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#586BFF] to-[#9B62FF] flex items-center justify-center text-white font-bold">
                    {selectedContact.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{selectedContact.name}</p>
                    <p className="text-xs text-gray-500">{selectedContact.upiId}</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Amount Input with Number Ticker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 mb-4 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#586BFF]/5 to-[#9B62FF]/5"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative z-10">
                  <p className="text-sm text-gray-600 mb-2">Enter Amount</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-gray-800">₹</span>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                      className="text-3xl font-bold border-0 focus:ring-0 p-0 h-auto"
                    />
                  </div>
                  <motion.p 
                    className="text-xs text-gray-500 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Available: ₹{selectedWallet.balance.toLocaleString()}
                  </motion.p>
                </div>
              </Card>
            </motion.div>

            {/* Note Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-4 mb-6">
                <Input
                  placeholder="Add a note (optional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </Card>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleAmountSubmit}
                disabled={!amount || parseFloat(amount) <= 0}
                className="w-full bg-gradient-to-r from-[#586BFF] to-[#9B62FF] h-12 text-base font-semibold shadow-lg"
              >
                Continue
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: Review (3D Flip Card) */}
        {step === 3 && (
          <motion.div
            key="step3"
            className="px-5 py-6"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.5 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <Card className="p-6 mb-6 bg-gradient-to-br from-[#586BFF] to-[#9B62FF] text-white shadow-2xl">
                <h3 className="text-lg font-bold mb-4">Review Payment</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span className="text-white/80">To</span>
                    <div className="text-right">
                      <p className="font-semibold">{selectedContact.name}</p>
                      <p className="text-xs text-white/70">{selectedContact.upiId}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span className="text-white/80">Amount</span>
                    <motion.p 
                      className="text-2xl font-bold"
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      ₹{amount}
                    </motion.p>
                  </div>

                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span className="text-white/80">From</span>
                    <div className="text-right">
                      <p className="font-semibold">{selectedWallet.name}</p>
                      <p className="text-xs text-white/70">Balance: ₹{selectedWallet.balance.toLocaleString()}</p>
                    </div>
                  </div>

                  {note && (
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Note</span>
                      <p className="text-sm">{note}</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="w-full h-12"
                >
                  Edit
                </Button>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handlePaymentConfirm}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 h-12 font-semibold shadow-lg"
                >
                  Confirm & Pay
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Success with Confetti */}
        {step === 4 && (
          <motion.div
            key="step4"
            className="px-5 py-6 flex flex-col items-center justify-center min-h-[60vh]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {/* Confetti Effect */}
            {showConfetti && (
              <div className="fixed inset-0 pointer-events-none z-50">
                {[...Array(50)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: ['#586BFF', '#9B62FF', '#00C8D6', '#FFD700'][i % 4],
                      left: `${Math.random() * 100}%`,
                      top: '-10%'
                    }}
                    animate={{
                      y: ['0vh', '110vh'],
                      x: [0, (Math.random() - 0.5) * 200],
                      rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                      opacity: [1, 0]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      delay: Math.random() * 0.5,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </div>
            )}

            {/* Success Checkmark */}
            <motion.div
              variants={successCheck}
              initial="initial"
              animate="animate"
              className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-6 shadow-2xl"
            >
              <CheckCircle2 className="w-16 h-16 text-white" />
            </motion.div>

            <motion.h2 
              className="text-2xl font-bold text-gray-800 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Payment Successful!
            </motion.h2>

            <motion.p 
              className="text-gray-600 mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ₹{amount} sent to {selectedContact.name}
            </motion.p>

            <motion.div
              className="w-full space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                onClick={() => navigate('/history')}
                className="w-full bg-gradient-to-r from-[#586BFF] to-[#9B62FF] h-12"
              >
                View Transaction
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full h-12"
              >
                Send Again
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedSendMoney;
