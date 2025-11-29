import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Copy, Share2, QrCode } from 'lucide-react';

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState('upi');
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabBarRef = useRef(null);

  const tabs = [
    { id: 'upi', label: 'UPI ID', icon: '📱' },
    { id: 'emoney', label: 'e-Money Wallet', icon: '💳' }
  ];

  const updateIndicator = (tabId) => {
    const button = document.querySelector(`[data-tab="${tabId}"]`);
    if (button && tabBarRef.current) {
      const parentRect = tabBarRef.current.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      setIndicatorStyle({
        left: buttonRect.left - parentRect.left,
        width: buttonRect.width
      });
    }
  };

  useEffect(() => {
    updateIndicator(activeTab);
    window.addEventListener('resize', () => updateIndicator(activeTab));
    return () => window.removeEventListener('resize', () => updateIndicator(activeTab));
  }, [activeTab]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // Show toast notification
  };

  return (
    <div className="px-5 py-6">
      {/* Tab Bar */}
      <div ref={tabBarRef} className="relative border-b border-gray-200 mb-6">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-tab={tab.id}
              className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors relative ${
                activeTab === tab.id ? 'text-[#00C8D6]' : 'text-gray-500'
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        <motion.div
          className="absolute bottom-0 h-0.5 bg-[#00C8D6] rounded-full"
          initial={false}
          animate={indicatorStyle}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'upi' && <UPITabContent onCopy={handleCopy} />}
        {activeTab === 'emoney' && <EMoneyTabContent />}
      </motion.div>
    </div>
  );
};

// UPI Tab Content
const UPITabContent = ({ onCopy }) => {
  const upiId = 'arjun@okhdfcbank';

  return (
    <div className="space-y-6">
      {/* UPI ID Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
        <p className="text-xs text-gray-600 mb-2 font-medium">Your UPI ID</p>
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-bold text-gray-800">{upiId}</p>
          <button
            onClick={() => onCopy(upiId)}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <Copy className="w-5 h-5 text-blue-600" />
          </button>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 py-2 px-4 bg-white border border-blue-200 rounded-lg text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors">
            <Copy className="w-4 h-4 inline mr-2" />
            Copy
          </button>
          <button className="flex-1 py-2 px-4 bg-white border border-blue-200 rounded-lg text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors">
            <Share2 className="w-4 h-4 inline mr-2" />
            Share
          </button>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
        <div className="w-48 h-48 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-4">
          <QrCode className="w-32 h-32 text-gray-400" />
        </div>
        <p className="text-sm text-gray-600 mb-4">Share this QR code to receive money instantly</p>
        <button className="w-full py-3 bg-gradient-to-r from-[#00C8D6] to-[#008B95] text-white rounded-lg font-semibold hover:shadow-lg transition-shadow">
          Download QR Code
        </button>
      </div>

      {/* Request Money Button */}
      <button className="w-full py-3 bg-gradient-to-r from-[#00C8D6] to-[#008B95] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow">
        Request Money
      </button>
    </div>
  );
};

// e-Money Tab Content
const EMoneyTabContent = () => {
  const balance = 2500;

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
        <p className="text-xs text-gray-600 mb-2 font-medium">e-Money Balance</p>
        <p className="text-3xl font-bold text-purple-600 mb-4">₹{balance.toLocaleString()}</p>
        <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow">
          + Add Money
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-2xl mb-2">💸</p>
          <p className="text-sm font-semibold text-gray-800">Send Money</p>
          <p className="text-xs text-gray-500">Instant transfers</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-2xl mb-2">🔄</p>
          <p className="text-sm font-semibold text-gray-800">Request</p>
          <p className="text-xs text-gray-500">Get paid fast</p>
        </div>
      </div>

      {/* Transactions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Recent Transactions</h3>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-lg">💰</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Added to wallet</p>
                  <p className="text-xs text-gray-500">Today, 10:30 AM</p>
                </div>
              </div>
              <p className="text-sm font-bold text-green-600">+₹500</p>
            </div>
          ))}
        </div>
      </div>

      {/* Withdraw Button */}
      <button className="w-full py-3 border-2 border-purple-200 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
        Withdraw to Bank
      </button>
    </div>
  );
};

export default TabsComponent;