import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TabsComponent from '../components/premium/TabsComponent';

const WalletPage = () => {
  const navigate = useNavigate();

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
            <h1 className="text-xl font-bold">My Wallet</h1>
            <p className="text-sm text-white/80">UPI & e-Money</p>
          </div>
        </div>
      </div>

      {/* Tabs Component */}
      <TabsComponent />
    </div>
  );
};

export default WalletPage;