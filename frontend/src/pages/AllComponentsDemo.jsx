import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import all premium components
import {
  PrimaryButton,
  SecondaryButton,
  GlowButton,
  IconButton,
  LoadingButton,
  SpotlightCard,
  GlowBorderCard,
  ThreeDHoverCard,
  ThreeDFlipCard,
  DirectionAwareCard,
  PatentPendingBadge,
  FloatingActionButton,
  ToastNotification,
  AdvertisementBanner,
  PalmVeinScanner,
  TabsComponent,
  LayoutSwitcher,
  Modal,
  ShimmerLoader,
  Spinner,
  ProgressBar,
  ConfettiEffect
} from '../components/premium';

const AllComponentsDemo = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [scannerStatus, setScannerStatus] = useState('scanning');
  const [progress, setProgress] = useState(45);

  const showToastMessage = (type, title, message) => {
    setToastConfig({ type, title, message });
    setShowToast(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#586BFF] to-[#8B8FFF] text-white p-5 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-full transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold">All Components Demo</h1>
            <p className="text-sm text-white/80">Complete component library showcase</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-6 space-y-8">
        {/* Loading Components */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Loading States</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Shimmer Loader</h3>
              <ShimmerLoader count={3} height="80px" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Spinners</h3>
              <div className="flex gap-4 items-center">
                <Spinner size={24} />
                <Spinner size={32} />
                <Spinner size={48} />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Progress Bar</h3>
              <ProgressBar progress={progress} />
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={() => setProgress(Math.max(0, progress - 10))}
                  className="px-3 py-1 bg-gray-200 rounded text-sm"
                >
                  -10%
                </button>
                <button 
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                  className="px-3 py-1 bg-gray-200 rounded text-sm"
                >
                  +10%
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Palm Vein Scanner */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Palm Vein Scanner</h2>
          <div className="bg-white rounded-xl p-4">
            <PalmVeinScanner 
              status={scannerStatus}
              onScanComplete={(result) => {
                setScannerStatus('success');
                setTimeout(() => setScannerStatus('scanning'), 3000);
              }}
            />
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => setScannerStatus('scanning')}
                className="px-3 py-2 bg-blue-500 text-white rounded text-sm"
              >
                Scanning
              </button>
              <button 
                onClick={() => setScannerStatus('success')}
                className="px-3 py-2 bg-green-500 text-white rounded text-sm"
              >
                Success
              </button>
              <button 
                onClick={() => setScannerStatus('error')}
                className="px-3 py-2 bg-red-500 text-white rounded text-sm"
              >
                Error
              </button>
            </div>
          </div>
        </section>

        {/* Modal Demo */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Modal / Dialog</h2>
          <PrimaryButton onClick={() => setShowModal(true)}>
            Open Modal
          </PrimaryButton>
        </section>

        {/* Confetti Demo */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Confetti Effect</h2>
          <GlowButton 
            onClick={() => {
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 3000);
            }}
          >
            Trigger Confetti 🎉
          </GlowButton>
        </section>

        {/* Toast Notifications */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Toast Notifications</h2>
          <div className="space-y-3">
            <PrimaryButton onClick={() => showToastMessage('success', 'Success!', 'Operation completed successfully')}>
              Show Success Toast
            </PrimaryButton>
            <SecondaryButton onClick={() => showToastMessage('error', 'Error!', 'Something went wrong')}>
              Show Error Toast
            </SecondaryButton>
            <GlowButton onClick={() => showToastMessage('warning', 'Warning!', 'Please review your action')}>
              Show Warning Toast
            </GlowButton>
            <PrimaryButton onClick={() => showToastMessage('info', 'Info', 'Here is some information')}>
              Show Info Toast
            </PrimaryButton>
          </div>
        </section>

        {/* Patent Pending Badge */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Patent Pending Badges</h2>
          <PatentPendingBadge />
        </section>

        {/* Advertisement Banner */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Advertisement Banner</h2>
          <AdvertisementBanner 
            onClose={() => console.log('Ad closed')}
            onClick={(ad) => console.log('Ad clicked:', ad)}
          />
        </section>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Demo Modal"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">This is a demo modal with animations and blur backdrop.</p>
          <div className="flex gap-2">
            <PrimaryButton onClick={() => setShowModal(false)} fullWidth>
              Confirm
            </PrimaryButton>
            <SecondaryButton onClick={() => setShowModal(false)} fullWidth>
              Cancel
            </SecondaryButton>
          </div>
        </div>
      </Modal>

      {/* Toast Notification */}
      <ToastNotification
        type={toastConfig.type}
        title={toastConfig.title}
        message={toastConfig.message}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={4000}
      />

      {/* Confetti Effect */}
      <ConfettiEffect active={showConfetti} duration={3000} />

      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => showToastMessage('info', 'Help', 'How can we assist you?')} />
    </div>
  );
};

export default AllComponentsDemo;
