import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  ArrowLeft, 
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Download,
  Filter,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { mockTransactions } from '../mockDataPalmPay';

const WalletManagement = () => {
  const navigate = useNavigate();
  const { wallets, selectedWallet, switchWallet, getTotalBalance } = useWallet();
  const [activeTab, setActiveTab] = useState('all');
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpWallet, setTopUpWallet] = useState(null);
  const [topUpAmount, setTopUpAmount] = useState('');

  // Filter transactions by wallet type
  const getFilteredTransactions = () => {
    if (activeTab === 'all') return mockTransactions;
    return mockTransactions.filter(tx => tx.walletType === activeTab);
  };

  const handleTopUp = (wallet) => {
    setTopUpWallet(wallet);
    setShowTopUpModal(true);
  };

  const processTopUp = () => {
    alert(`Top-up of ₹${topUpAmount} to ${topUpWallet.name} initiated!\n\nNote: This is a mock transaction.`);
    setShowTopUpModal(false);
    setTopUpAmount('');
  };

  const getWalletIcon = (type) => {
    const wallet = wallets.find(w => w.type === type);
    return wallet ? wallet.icon : '💳';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#586BFF] via-[#6B7AFF] to-[#8B8FFF] text-white px-5 py-6 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-full transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Wallet Management</h1>
            <p className="text-xs text-white/80">Manage your payment wallets</p>
          </div>
        </div>

        {/* Total Balance Card */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-4">
          <p className="text-white/70 text-xs mb-1">Combined Balance</p>
          <h2 className="text-3xl font-bold mb-3">₹{getTotalBalance().toLocaleString()}</h2>
          <div className="flex gap-2">
            <Button 
              onClick={() => navigate('/add-money')}
              className="flex-1 bg-white text-[#586BFF] h-9 text-sm font-semibold"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Money
            </Button>
            <Button 
              className="flex-1 bg-white/20 hover:bg-white/30 h-9 text-sm font-semibold"
            >
              <Download className="w-4 h-4 mr-1" />
              Withdraw
            </Button>
          </div>
        </Card>
      </div>

      {/* Wallets List */}
      <div className="px-5 py-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Your Wallets</h3>
        <div className="space-y-3">
          {wallets.map((wallet) => (
            <Card 
              key={wallet.id}
              className="p-4 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => switchWallet(wallet.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-3xl">{wallet.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-800">{wallet.name}</h4>
                      {wallet.isSandbox && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-bold">
                          {wallet.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">₹{wallet.balance.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {wallet.issuer ? `Issued by ${wallet.issuer}` : 'Primary wallet'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {(wallet.type === 'e-money' || wallet.type === 'cbdc') && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTopUp(wallet);
                      }}
                      className="bg-[#586BFF] h-8 text-xs px-3"
                    >
                      Top-up
                    </Button>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Wallet Features */}
              <div className="mt-3 flex flex-wrap gap-2">
                {wallet.features.map((feature, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Info Cards */}
        <div className="mt-6 space-y-3">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-gray-800 mb-1">About e-Money Wallet</p>
                <p className="text-xs text-gray-600">
                  e-Money is a stored pre-paid balance that works like cash. Top-up from your bank and use for fast payments.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-amber-50 border-amber-200">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-gray-800 mb-1">About CBDC Wallet (Sandbox)</p>
                <p className="text-xs text-gray-600">
                  Central Bank Digital Currency is a digital rupee issued by RBI. This is a test environment for trying CBDC features.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Transaction History */}
      <div className="px-5 py-6 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Transaction History</h3>
          <button className="flex items-center gap-1 text-sm text-[#586BFF] font-semibold">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Wallet Type Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All', icon: '💳' },
            { id: 'upi', label: 'UPI', icon: '💳' },
            { id: 'e-money', label: 'e-Money', icon: '💰' },
            { id: 'cbdc', label: 'CBDC', icon: '🏛️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#586BFF] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Transactions */}
        <div className="space-y-2">
          {getFilteredTransactions().slice(0, 10).map((transaction) => (
            <Card key={transaction.id} className="p-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'received' || transaction.type === 'topup' 
                      ? 'bg-green-100' 
                      : 'bg-blue-100'
                  }`}>
                    {transaction.type === 'received' || transaction.type === 'topup' ? (
                      <ArrowDownLeft className="w-5 h-5 text-green-600" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-800 text-sm truncate">
                        {transaction.recipient}
                      </p>
                      {transaction.walletType && (
                        <span className="text-xs">
                          {getWalletIcon(transaction.walletType)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {transaction.date} • {transaction.time}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">{transaction.method}</p>
                  </div>
                </div>
                <div className="text-right ml-3">
                  <p className={`font-bold text-sm ${
                    transaction.type === 'received' || transaction.type === 'topup'
                      ? 'text-green-600' 
                      : 'text-gray-800'
                  }`}>
                    {transaction.type === 'received' || transaction.type === 'topup' ? '+' : '-'}₹{transaction.amount}
                  </p>
                  <p className="text-xs text-green-600 capitalize">{transaction.status}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Top-up Modal */}
      {showTopUpModal && topUpWallet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50">
          <Card className="max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{topUpWallet.icon}</div>
              <div>
                <h3 className="font-bold text-gray-800">Top-up {topUpWallet.name}</h3>
                <p className="text-xs text-gray-600">Current balance: ₹{topUpWallet.balance.toLocaleString()}</p>
              </div>
            </div>

            {topUpWallet.type === 'cbdc' && (
              <Card className="p-3 bg-amber-50 border-amber-200">
                <div className="flex gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-700">
                    <strong>KYC Required:</strong> CBDC top-ups require verified KYC. This is a sandbox environment.
                  </p>
                </div>
              </Card>
            )}

            <div>
              <label className="text-sm font-semibold text-gray-800 mb-2 block">Enter Amount</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">₹</span>
                <Input
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  placeholder="0"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Offline limit: ₹{topUpWallet.offlineLimit.toLocaleString()}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setShowTopUpModal(false);
                  setTopUpAmount('');
                }}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={processTopUp}
                disabled={!topUpAmount || parseFloat(topUpAmount) <= 0}
                className="flex-1 bg-[#586BFF]"
              >
                Top-up Now
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WalletManagement;
