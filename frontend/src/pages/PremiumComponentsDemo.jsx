import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Heart, ShoppingCart, Download, Check } from 'lucide-react';
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
  ToastNotification
} from '../components/premium';

const PremiumComponentsDemo = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({});

  const showToastMessage = (type, title, message) => {
    setToastConfig({ type, title, message });
    setShowToast(true);
  };

  const handleAsyncAction = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        showToastMessage('success', 'Success!', 'Action completed successfully');
      }, 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#586BFF] to-[#8B8FFF] text-white p-5 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-white/10 rounded-full transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Premium Components</h1>
            <p className="text-sm text-white/80">Design System Showcase</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-6 space-y-8">
        {/* Patent Pending Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Patent Pending Badges</h2>
          <PatentPendingBadge />
        </section>

        {/* Buttons Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Premium Buttons</h2>
          <div className="space-y-4">
            {/* Primary Buttons */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Primary Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <PrimaryButton size="sm">Small</PrimaryButton>
                <PrimaryButton size="md">Medium (Default)</PrimaryButton>
                <PrimaryButton size="lg">Large</PrimaryButton>
                <PrimaryButton icon={<Send className="w-4 h-4" />}>
                  With Icon
                </PrimaryButton>
                <PrimaryButton loading>Loading...</PrimaryButton>
              </div>
            </div>

            {/* Secondary Buttons */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Secondary Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <SecondaryButton size="sm">Small</SecondaryButton>
                <SecondaryButton size="md">Medium</SecondaryButton>
                <SecondaryButton size="lg">Large</SecondaryButton>
                <SecondaryButton icon={<Download className="w-4 h-4" />}>
                  Download
                </SecondaryButton>
              </div>
            </div>

            {/* Glow Buttons */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Glow Buttons (Premium Effect)</h3>
              <div className="flex flex-wrap gap-3">
                <GlowButton>Glow Effect</GlowButton>
                <GlowButton size="lg">Large Glow</GlowButton>
                <GlowButton icon={<ShoppingCart className="w-4 h-4" />}>
                  Shop Now
                </GlowButton>
              </div>
            </div>

            {/* Icon Buttons */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Icon Buttons</h3>
              <div className="flex gap-3">
                <IconButton icon={<Heart className="w-5 h-5" />} size="sm" />
                <IconButton icon={<Heart className="w-5 h-5" />} size="md" />
                <IconButton icon={<Heart className="w-5 h-5" />} size="lg" />
                <IconButton 
                  icon={<Heart className="w-5 h-5" />} 
                  variant="primary" 
                />
              </div>
            </div>

            {/* Loading Button */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Loading Button (State Management)</h3>
              <LoadingButton onClick={handleAsyncAction}>
                Click to Test States
              </LoadingButton>
            </div>

            {/* Full Width Example */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Full Width</h3>
              <PrimaryButton fullWidth>Full Width Button</PrimaryButton>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Premium Cards</h2>
          <div className="space-y-4">
            {/* Spotlight Card */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Spotlight Card (Cursor Tracking)</h3>
              <SpotlightCard>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Balance Overview</h3>
                <p className="text-3xl font-bold text-[#00C8D6] mb-1">₹12,450.75</p>
                <p className="text-xs text-gray-500">Available Balance</p>
              </SpotlightCard>
            </div>

            {/* Glow Border Card */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Glow Border Card (Hover Effect)</h3>
              <GlowBorderCard onClick={() => showToastMessage('info', 'Card Clicked', 'Glow border card was clicked')}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Send className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Send Money</h4>
                    <p className="text-xs text-gray-600">Instant transfers</p>
                  </div>
                </div>
              </GlowBorderCard>
            </div>

            {/* 3D Hover Card */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">3D Hover Card (Lift Effect)</h3>
              <ThreeDHoverCard>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Transaction Successful</h4>
                    <p className="text-xs text-gray-600">Payment completed</p>
                  </div>
                </div>
              </ThreeDHoverCard>
            </div>

            {/* Direction Aware Card */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Direction Aware Card</h3>
              <DirectionAwareCard onClick={() => showToastMessage('success', 'Card Selected', 'Direction-aware card interaction')}>
                <div className="text-center py-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Premium Feature</h4>
                  <p className="text-xs text-gray-600">Hover to see direction-aware animation</p>
                </div>
              </DirectionAwareCard>
            </div>

            {/* 3D Flip Card */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">3D Flip Card (Click to Flip)</h3>
              <ThreeDFlipCard
                frontContent={
                  <div className="text-center">
                    <h4 className="font-bold text-gray-800 text-lg mb-2">Card Front</h4>
                    <p className="text-sm text-gray-600">Click to see the back</p>
                  </div>
                }
                backContent={
                  <div className="text-center">
                    <h4 className="font-bold text-white text-lg mb-2">Card Back</h4>
                    <p className="text-sm text-white/90">Hidden information revealed!</p>
                  </div>
                }
                height="150px"
              />
            </div>
          </div>
        </section>

        {/* Toast Demo */}
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

        {/* Color Palette */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Color Palette</h2>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <div className="h-20 bg-[#00C8D6] rounded-lg mb-2"></div>
              <p className="text-xs font-semibold text-gray-700">Teal Primary</p>
              <p className="text-xs text-gray-500">#00C8D6</p>
            </div>
            <div>
              <div className="h-20 bg-[#008B95] rounded-lg mb-2"></div>
              <p className="text-xs font-semibold text-gray-700">Teal Dark</p>
              <p className="text-xs text-gray-500">#008B95</p>
            </div>
            <div>
              <div className="h-20 bg-[#001F3F] rounded-lg mb-2"></div>
              <p className="text-xs font-semibold text-gray-700">Navy Dark</p>
              <p className="text-xs text-gray-500">#001F3F</p>
            </div>
          </div>
        </section>
      </div>

      {/* Toast Notification Component */}
      <ToastNotification
        type={toastConfig.type}
        title={toastConfig.title}
        message={toastConfig.message}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={4000}
      />

      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => showToastMessage('info', 'Help', 'Need assistance?')} />
    </div>
  );
};

export default PremiumComponentsDemo;
