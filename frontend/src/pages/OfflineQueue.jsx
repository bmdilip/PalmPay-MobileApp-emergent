import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  ArrowLeft, 
  WifiOff,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OfflineQueue = () => {
  const navigate = useNavigate();
  
  const mockQueuedTransactions = [
    {
      id: 'offline1',
      type: 'payment',
      merchant: 'Cafe Coffee Day',
      amount: 250,
      status: 'queued',
      timestamp: '10 mins ago',
      retryCount: 0
    },
    {
      id: 'offline2',
      type: 'recharge',
      service: 'Mobile Recharge',
      amount: 299,
      status: 'waiting_for_device',
      timestamp: '25 mins ago',
      retryCount: 1
    },
    {
      id: 'offline3',
      type: 'bill',
      service: 'Electricity Bill',
      amount: 1200,
      status: 'authorized',
      timestamp: '1 hour ago',
      retryCount: 0
    },
    {
      id: 'offline4',
      type: 'transfer',
      recipient: 'Priya Sharma',
      amount: 500,
      status: 'failed',
      timestamp: '2 hours ago',
      retryCount: 3,
      error: 'Network timeout'
    },
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'queued':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'waiting_for_device':
        return <WifiOff className="w-5 h-5 text-blue-600" />;
      case 'authorized':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'queued':
        return 'bg-orange-100 text-orange-700';
      case 'waiting_for_device':
        return 'bg-blue-100 text-blue-700';
      case 'authorized':
        return 'bg-green-100 text-green-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'queued':
        return 'Queued';
      case 'waiting_for_device':
        return 'Waiting for Device';
      case 'authorized':
        return 'Authorized';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  const handleRetry = (txnId) => {
    console.log('Retrying transaction:', txnId);
    alert('Retrying transaction...');
  };

  const handleCancel = (txnId) => {
    if (window.confirm('Cancel this offline transaction?')) {
      console.log('Cancelling:', txnId);
    }
  };

  const handleSyncAll = () => {
    alert('Syncing all queued transactions...');
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] text-white px-5 py-6 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#586BFF] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">Offline Queue</h1>
              <p className="text-xs text-white/80">Manage offline transactions</p>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-[#586BFF]/20 to-[#9B62FF]/20 backdrop-blur-xl border border-white/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm mb-1">Queued Transactions</p>
                <p className="text-2xl font-bold text-white">
                  {mockQueuedTransactions.filter(t => t.status === 'queued' || t.status === 'waiting_for_device').length}
                </p>
              </div>
              <Button 
                onClick={handleSyncAll}
                className="bg-white text-[#586BFF] hover:bg-gray-100"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync All
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
        {/* Info Banner */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">About Offline Payments</p>
              <p className="text-xs text-gray-600">
                When network is unavailable, payments are queued locally. They will automatically sync when connection is restored or when you're near a PalmPe device.
              </p>
            </div>
          </div>
        </Card>

        {/* Queue List */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Transaction Queue</h3>
          
          <div className="space-y-3">
            {mockQueuedTransactions.map((txn) => (
              <Card key={txn.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    txn.status === 'queued' ? 'bg-orange-100' :
                    txn.status === 'waiting_for_device' ? 'bg-blue-100' :
                    txn.status === 'authorized' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {getStatusIcon(txn.status)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-800">
                          {txn.merchant || txn.service || txn.recipient}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{txn.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">₹{txn.amount}</p>
                        <p className="text-xs text-gray-400">{txn.timestamp}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(txn.status)}`}>
                        {getStatusText(txn.status)}
                      </span>
                      {txn.retryCount > 0 && (
                        <span className="text-xs text-gray-500">
                          Retry {txn.retryCount}/3
                        </span>
                      )}
                    </div>

                    {txn.error && (
                      <p className="text-xs text-red-600 mb-2">⚠️ {txn.error}</p>
                    )}

                    {(txn.status === 'queued' || txn.status === 'failed') && (
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleRetry(txn.id)}
                          variant="outline"
                          className="flex-1 h-9 text-sm border-[#586BFF] text-[#586BFF]"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Retry Now
                        </Button>
                        <Button 
                          onClick={() => handleCancel(txn.id)}
                          variant="outline"
                          className="flex-1 h-9 text-sm border-red-500 text-red-500"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}

                    {txn.status === 'authorized' && (
                      <div className="p-2 bg-green-50 rounded text-xs text-green-700">
                        ✓ Will be finalized automatically
                      </div>
                    )}

                    {txn.status === 'waiting_for_device' && (
                      <div className="p-2 bg-blue-50 rounded text-xs text-blue-700">
                        ⏳ Visit a PalmPe device to complete
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {mockQueuedTransactions.length === 0 && (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium mb-2">All Clear!</p>
            <p className="text-sm text-gray-500">No offline transactions in queue</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OfflineQueue;
