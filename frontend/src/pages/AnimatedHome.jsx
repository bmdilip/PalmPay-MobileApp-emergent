import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  QrCode,
  Zap,
  Bell,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronDown,
  Smartphone,
  Repeat,
  Wifi,
  Droplet,
  Truck,
  Shield,
  TrendingUp,
  Sparkles,
  Gift,
  Plane,
  Users,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { mockUser, mockTransactions, mockNotifications } from '../mockDataPalmPay';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import Logo from '../components/Logo';
import NotificationPanel from '../components/NotificationPanel';
import { SkeletonHome } from '../components/Skeleton';

// Animated Background Components
import MeshGradientBackground from '../components/animated/MeshGradientBackground';
import DotGridBackground from '../components/animated/DotGridBackground';
import ParticleField from '../components/animated/ParticleField';

// Premium Components
import { 
  FloatingActionButton,
  GlowButton,
  SpotlightCard,
  AdvertisementBanner
} from '../components/premium';
import HoverCard3D from '../components/premium/HoverCard3D';
import UseCaseGrid from '../components/premium/UseCaseGrid';
import { Copy } from 'lucide-react';
import PalmNFCIcon from '../components/icons/PalmNFCIcon';

// Animation presets
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem,
  hoverScale,
  tapScale,
  pulseAnimation
} from '../lib/animations';

const AnimatedHome = () => {
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [showWalletSelector, setShowWalletSelector] = useState(false);
  const [copiedPalmId, setCopiedPalmId] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedHand, setSelectedHand] = useState('right'); // 'left' or 'right'
  const [showPalmIdSection, setShowPalmIdSection] = useState(true); // Palm ID section visibility
  const navigate = useNavigate();
  const { selectedWallet, wallets, switchWallet, getTotalBalance } = useWallet();
  
  // Generate Palm IDs for both hands
  const palmIdLeft = `PLM-${mockUser.id.toUpperCase().slice(0, 8)}-L${Date.now().toString().slice(-3)}`;
  const palmIdRight = `PLM-${mockUser.id.toUpperCase().slice(0, 8)}-R${Date.now().toString().slice(-3)}`;
  
  // Mock data for palm registration status
  const leftPalmRegistered = mockUser.palmEnabled; // You can customize this
  const rightPalmRegistered = mockUser.palmEnabled; // You can customize this
  
  const handleCopyPalmId = () => {
    const idToCopy = selectedHand === 'left' ? palmIdLeft : palmIdRight;
    navigator.clipboard.writeText(idToCopy);
    setCopiedPalmId(true);
    setTimeout(() => setCopiedPalmId(false), 2000);
  };

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-hide Palm ID section after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPalmIdSection(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  // Quick actions are now defined inline with premium styling

  const rechargeServices = [
    { id: 'mobile', label: 'Mobile Recharge', icon: Smartphone, color: '#586BFF', path: '/services/mobile-recharge' },
    { id: 'electricity', label: 'Electricity Bill', icon: Zap, color: '#FF6B35', path: '/services/electricity' },
    { id: 'dth', label: 'DTH', icon: Repeat, color: '#9B62FF', path: '/services/dth' },
    { id: 'broadband', label: 'Broadband', icon: Wifi, color: '#64E8FF', path: '/services/broadband' },
  ];

  const financialServices = [
    { id: 'mutual', label: 'Mutual Funds', desc: 'SIPs & Investments', icon: TrendingUp, color: '#586BFF', path: '/services/mutual-funds' },
    { id: 'gold', label: 'Digital Gold', desc: 'Save ₹10 daily', icon: Sparkles, color: '#D4AF37', path: '/services/digital-gold' },
    { id: 'limits', label: 'Limit Settings', desc: 'Payment & Palm limits', icon: Shield, color: '#9B62FF', path: '/limit-settings' },
    { id: 'rewards', label: 'Rewards', desc: 'Cashback & Offers', icon: Gift, color: '#FF6B35', path: '/cashback-rewards' },
  ];

  if (loading) {
    return <SkeletonHome />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative overflow-x-hidden">
      {/* SECTION 1: Background Layers */}
      <MeshGradientBackground />
      <DotGridBackground />
      <ParticleField count={20} />

      {/* SECTION 2: Hero Header with Spotlight Card */}
      <motion.div 
        className={`bg-gradient-to-br from-[#586BFF] via-[#6B7AFF] to-[#8B8FFF] text-white px-5 rounded-b-[2rem] shadow-2xl relative overflow-hidden transition-all duration-500 ${
          scrolled ? 'pt-6 pb-4' : 'pt-12 pb-8'
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Animated decorative circles */}
        <motion.div 
          className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <div className="relative z-10">
          {/* Top Bar */}
          <motion.div 
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Logo size={scrolled ? "sm" : "md"} withGlow={false} />
            <motion.button 
              onClick={() => setShowNotifications(true)}
              className="relative p-2.5 hover:bg-white/10 rounded-full transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              {notifications.filter(n => n.unread).length > 0 && (
                <motion.span 
                  className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"
                  {...pulseAnimation}
                />
              )}
            </motion.button>
          </motion.div>

          {/* User Greeting */}
          <AnimatePresence>
            {!scrolled && (
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.p 
                  className="text-white/80 text-sm mb-1"
                  {...fadeInUp}
                >
                  Welcome back,
                </motion.p>
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold tracking-tight">
                    {mockUser.name}
                  </h2>
                  <motion.button
                    onClick={() => setShowPalmIdSection(!showPalmIdSection)}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      animate={{ rotate: showPalmIdSection ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                </motion.div>
                
                {/* Collapsible Palm ID Section */}
                <AnimatePresence>
                  {showPalmIdSection && (
                    <>
                      {/* Palm Status Badge with Animation */}
                      <motion.button 
                        onClick={() => navigate(mockUser.palmEnabled ? '/device-center' : '/palm-enrollment')}
                        className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: -20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className={`w-2 h-2 rounded-full ${mockUser.palmEnabled ? 'bg-green-400' : 'bg-red-400'}`}
                          {...pulseAnimation}
                        />
                        <span className="text-xs font-medium">
                          {mockUser.palmEnabled 
                            ? `Palm Registered • Last used ${mockUser.lastDeviceUsed || '2h ago'}` 
                            : 'Palm Not Registered • Register Now'}
                        </span>
                        <ChevronRight className="w-3 h-3" />
                      </motion.button>
                      
                      {/* Palm ID Display - Shows both Left & Right Palms */}
                      {mockUser.palmEnabled ? (
                  <motion.div 
                    className="mt-3 bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl p-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <PalmNFCIcon className="w-3.5 h-3.5" style={{ filter: 'brightness(0) invert(1) opacity(0.8)' }} />
                        <span className="text-xs font-semibold text-white/90">Your Palm ID</span>
                      </div>
                      <span className="text-[10px] font-medium text-green-300 bg-green-500/20 px-2 py-0.5 rounded-full">
                        ✓ Verified
                      </span>
                    </div>
                    
                    {/* Hand Selector */}
                    <div className="flex gap-2 mb-2">
                      <motion.button
                        onClick={() => setSelectedHand('left')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-semibold transition-all ${
                          selectedHand === 'left' 
                            ? 'bg-[#00C8D6] text-white' 
                            : 'bg-white/10 text-white/60 hover:bg-white/20'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        🤚 Left Palm
                      </motion.button>
                      <motion.button
                        onClick={() => setSelectedHand('right')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-semibold transition-all ${
                          selectedHand === 'right' 
                            ? 'bg-[#00C8D6] text-white' 
                            : 'bg-white/10 text-white/60 hover:bg-white/20'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Right Palm 🤚
                      </motion.button>
                    </div>
                    
                    <div className="flex items-center justify-between bg-white/10 rounded-lg p-2">
                      <div className="flex-1">
                        <p className="text-[10px] text-white/60 mb-0.5">
                          {selectedHand === 'left' ? 'Left' : 'Right'} Palm ID
                        </p>
                        <p className="text-xs font-mono font-bold text-white tracking-wide">
                          {selectedHand === 'left' ? palmIdLeft : palmIdRight}
                        </p>
                      </div>
                      <motion.button
                        onClick={handleCopyPalmId}
                        className="ml-2 p-1.5 hover:bg-white/20 rounded-md transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {copiedPalmId ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-300" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-white/80" />
                        )}
                      </motion.button>
                    </div>
                    
                    <p className="text-[10px] text-white/60 mt-2">
                      Registered: Nov 15, 2024 • {selectedHand === 'left' ? 'Left' : 'Right'} Palm
                    </p>
                  </motion.div>
                ) : (
                  /* Unregistered State - Dark Card with Register Button */
                  <motion.div 
                    className="mt-3 bg-[#0A0F1F]/80 backdrop-blur-sm border border-red-400/30 rounded-xl p-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-white/60">Palmpay Left ID:</p>
                        <p className="text-xs font-semibold text-red-400">Not Registered</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-white/60">Palmpay Right ID:</p>
                        <p className="text-xs font-semibold text-red-400">Not Registered</p>
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={() => navigate('/device-locator')}
                      className="w-full py-2 px-3 bg-[#00C8D6] hover:bg-[#00B8C6] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <PalmNFCIcon className="w-4 h-4" />
                      Register Palm
                    </motion.button>
                  </motion.div>
                )}
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SPOTLIGHT BALANCE CARD with Number Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card 
              className="bg-white/10 backdrop-blur-xl border-white/20 p-5 shadow-xl hover:shadow-2xl transition-all duration-300 relative group"
              style={{
                backdropFilter: 'blur(20px)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)'
              }}
            >
              {/* Spotlight effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>

              {/* Wallet Selector with Animation */}
              <div className="mb-4 relative z-10">
                <motion.button
                  onClick={() => setShowWalletSelector(!showWalletSelector)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-all text-xs font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{selectedWallet.icon}</span>
                  <span>{selectedWallet.name}</span>
                  {selectedWallet.isSandbox && (
                    <span className="px-1.5 py-0.5 bg-amber-400/90 text-amber-900 rounded text-[10px] font-bold">
                      {selectedWallet.badge}
                    </span>
                  )}
                  <motion.div
                    animate={{ rotate: showWalletSelector ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-3 h-3" />
                  </motion.div>
                </motion.button>

                {/* Animated Wallet Dropdown */}
                <AnimatePresence>
                  {showWalletSelector && (
                    <>
                      {/* Backdrop - Full Screen Overlay */}
                      <motion.div 
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        style={{ zIndex: 99999 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowWalletSelector(false)}
                      />
                      
                      {/* Dropdown Modal - Centered */}
                      <motion.div 
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md max-h-[70vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border-2 border-[#586BFF]"
                        style={{ zIndex: 100000 }}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, type: 'spring' }}
                      >
                        <div className="px-5 py-4 border-b-2 border-gray-100">
                          <p className="text-sm font-bold text-gray-800">Select Wallet</p>
                          <p className="text-xs text-gray-500 mt-0.5">Choose your payment wallet</p>
                        </div>
                        <div className="p-3">
                          {wallets.map((wallet, index) => (
                          <motion.button
                            key={wallet.id}
                            onClick={() => {
                              switchWallet(wallet.id);
                              setShowWalletSelector(false);
                            }}
                            className={`
                              w-full px-4 py-4 mb-2 last:mb-0
                              flex items-center gap-4 
                              rounded-xl border-2
                              transition-all duration-200
                              ${selectedWallet.id === wallet.id 
                                ? 'bg-[#00C8D6]/10 border-[#00C8D6]' 
                                : 'bg-white border-gray-200 hover:border-[#00C8D6]/50 hover:bg-gray-50'
                              }
                            `}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className={`
                              w-14 h-14 rounded-2xl 
                              bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 
                              flex items-center justify-center flex-shrink-0
                              shadow-lg
                            `}>
                              <span className="text-white text-2xl font-bold">
                                {wallet.emoji}
                              </span>
                            </div>
                            <div className="flex-1 text-left">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-bold text-gray-800 text-base">{wallet.name}</p>
                                {wallet.isSandbox && (
                                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-md text-[10px] font-bold">
                                    {wallet.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm font-semibold text-[#00C8D6]">₹{wallet.balance.toLocaleString()}</p>
                            </div>
                            {selectedWallet.id === wallet.id && (
                              <motion.div 
                                className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500 }}
                              >
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Balance Display with Number Ticker Effect */}
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-white/70 text-xs mb-1 font-medium">
                    {selectedWallet.name} Balance
                  </p>
                  <div className="flex items-center gap-3 mb-2">
                    <motion.h3 
                      className="text-3xl font-bold tracking-tight"
                      key={selectedWallet.balance}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {showBalance ? `₹${selectedWallet.balance.toLocaleString()}` : '₹****'}
                    </motion.h3>
                    <motion.button 
                      onClick={() => setShowBalance(!showBalance)}
                      className="p-1.5 hover:bg-white/10 rounded-full transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </motion.button>
                  </div>
                  <motion.p 
                    className="text-white/60 text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Total: {showBalance ? `₹${getTotalBalance().toLocaleString()}` : '₹****'}
                  </motion.p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={() => navigate('/add-money')}
                    className="bg-white text-[#586BFF] hover:bg-white/90 font-semibold text-sm px-4 h-9 shadow-lg"
                  >
                    + Add Money
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* SECTION 3: Premium Quick Actions with Professional Icons */}
      <motion.div 
        className="mx-5 mt-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="grid grid-cols-4 gap-3"
          variants={staggerContainer}
        >
          {[
            { 
              id: 'send', 
              label: 'Send Money', 
              icon: ArrowUpRight, 
              gradient: 'from-[#667eea] via-[#764ba2] to-[#667eea]',
              shadow: 'shadow-[0_8px_30px_rgba(102,126,234,0.4)]',
              glow: 'group-hover:shadow-[0_8px_40px_rgba(102,126,234,0.6)]',
              path: '/send' 
            },
            { 
              id: 'request', 
              label: 'Request', 
              icon: ArrowDownLeft, 
              gradient: 'from-[#11998e] via-[#38ef7d] to-[#11998e]',
              shadow: 'shadow-[0_8px_30px_rgba(17,153,142,0.4)]',
              glow: 'group-hover:shadow-[0_8px_40px_rgba(17,153,142,0.6)]',
              path: '/collect' 
            },
            { 
              id: 'scan', 
              label: 'Scan QR', 
              icon: QrCode, 
              gradient: 'from-[#8E2DE2] via-[#4A00E0] to-[#8E2DE2]',
              shadow: 'shadow-[0_8px_30px_rgba(142,45,226,0.4)]',
              glow: 'group-hover:shadow-[0_8px_40px_rgba(142,45,226,0.6)]',
              path: '/scan' 
            },
            { 
              id: 'palm-circle', 
              label: 'Palm Circle', 
              icon: Users, 
              gradient: 'from-[#ec4899] via-[#f43f5e] to-[#ec4899]',
              shadow: 'shadow-[0_8px_30px_rgba(236,72,153,0.4)]',
              glow: 'group-hover:shadow-[0_8px_40px_rgba(236,72,153,0.6)]',
              path: '/use-cases/palm-circle' 
            }
          ].map((action) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                variants={staggerItem}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2 group"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className={`
                    relative w-16 h-16 rounded-2xl 
                    bg-gradient-to-br ${action.gradient} 
                    flex items-center justify-center 
                    ${action.shadow} ${action.glow}
                    transition-all duration-300
                    before:absolute before:inset-0 before:rounded-2xl 
                    before:bg-white/20 before:opacity-0 
                    group-hover:before:opacity-100 before:transition-opacity
                  `}
                  whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-8 h-8 text-white relative z-10" strokeWidth={2.5} />
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent opacity-50" />
                </motion.div>
                <span className="text-[11px] font-semibold text-gray-700 text-center leading-tight">{action.label}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>

      {/* SECTION 3.5: Advertisement Banner - NEW (Revenue Generation) */}
      <AdvertisementBanner 
        onClose={() => console.log('Ad closed')}
        onClick={(ad) => {
          console.log('Ad clicked:', ad);
          navigate(ad.link);
        }}
      />

      {/* SECTION 4: Promotional Banner with Animation */}
      <motion.div 
        className="px-5 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          onClick={() => navigate('/cashback-rewards')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-0 p-6 shadow-lg overflow-hidden relative cursor-pointer">
            <motion.div 
              className="absolute top-0 right-0 w-32 h-32 bg-orange-200/30 rounded-full -translate-y-16 translate-x-16"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-200/30 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Gift className="w-5 h-5 text-orange-600" />
                </motion.div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">Exclusive Offer</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Get ₹100 Cashback</h3>
              <p className="text-sm text-gray-600 mb-3">On your first bill payment of ₹500 or more</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-9 text-sm font-semibold shadow-lg">
                  Pay Now
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* SECTION 5: Recharge & Bills with Direction-Aware Hover */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <motion.h3 
            className="text-lg font-bold text-gray-800"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            Recharge & Bills
          </motion.h3>
          <motion.button 
            onClick={() => navigate('/all-services')}
            className="text-sm font-semibold text-[#586BFF] flex items-center gap-1"
            whileHover={{ gap: "0.5rem" }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            View All <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
        <motion.div 
          className="grid grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {rechargeServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.button
                key={service.id}
                className="flex flex-col items-center gap-2 group relative"
                onClick={() => navigate(service.path)}
                variants={staggerItem}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-2xl shadow-md flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: `${service.color}15` }}
                  whileHover={{
                    boxShadow: `0 10px 30px ${service.color}40`
                  }}
                >
                  {/* Direction-aware hover gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <Icon className="w-7 h-7 relative z-10" style={{ color: service.color }} />
                </motion.div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                  {service.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* SECTION 6: PalmPe Use-Case Grid */}
      <UseCaseGrid />

      {/* SECTION 7: Recent Transactions with Staggered List */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <motion.h3 
            className="text-lg font-bold text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            Recent Transactions
          </motion.h3>
          <motion.button 
            onClick={() => navigate('/history')}
            className="text-sm font-semibold text-[#586BFF] flex items-center gap-1"
            whileHover={{ gap: "0.5rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            View All <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
        <Card className="border-0 shadow-lg divide-y divide-gray-100 overflow-hidden">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {mockTransactions.slice(0, 4).map((transaction, index) => (
              <motion.div 
                key={transaction.id} 
                className="p-4 flex items-center justify-between hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent cursor-pointer group relative overflow-hidden"
                variants={staggerItem}
                whileHover={{ x: 5 }}
              >
                {/* Glow border on hover */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#586BFF] to-[#9B62FF]"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="flex items-center gap-3 flex-1">
                  <motion.div 
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      transaction.type === 'received' ? 'bg-green-50' : 'bg-blue-50'
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {transaction.type === 'received' ? 
                      <ArrowDownLeft className="w-5 h-5 text-green-600" /> : 
                      <ArrowUpRight className="w-5 h-5 text-blue-600" />
                    }
                  </motion.div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{transaction.recipient}</p>
                    <p className="text-xs text-gray-500">{transaction.date} • {transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <motion.p 
                    className={`font-bold text-sm ${
                      transaction.type === 'received' ? 'text-green-600' : 'text-gray-800'
                    }`}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {transaction.type === 'received' ? '+' : '-'}₹{transaction.amount}
                  </motion.p>
                  <p className="text-xs text-green-600 capitalize">{transaction.status}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Card>
      </div>

      {/* SECTION 8: Refer & Earn with 3D Effect */}
      <div className="px-5 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.02, rotateX: 2 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Card 
            className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 border-0 p-5 shadow-xl text-white overflow-hidden relative cursor-pointer"
            onClick={() => navigate('/referral')}
          >
            <motion.div 
              className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Users className="w-5 h-5" />
                  </motion.div>
                  <span className="text-xs font-bold uppercase tracking-wide">Refer & Earn</span>
                </div>
                <p className="text-sm mb-1 font-semibold">Invite friends and earn ₹100</p>
                <p className="text-xs text-white/80">For each successful referral</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-white text-purple-600 hover:bg-white/90 font-semibold text-sm px-4 h-9 shadow-lg">
                  Invite
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* SECTION 9: Floating Action Button (Help) */}
      <FloatingActionButton 
        onClick={() => navigate('/support')}
        icon={<HelpCircle className="w-6 h-6" />}
      />

      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
      />
    </div>
  );
};

export default AnimatedHome;
