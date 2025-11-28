import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle2, Download, Share2, Home, Shield, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServiceReceipt = ({ 
  title = 'Payment Successful',
  amount,
  transactionId,
  date,
  time,
  details = [],
  serviceName,
  status = 'success', // 'success', 'pending', 'failed'
  consentToken = null, // For device-authorized payments
  deviceId = null,
  isDevicePayment = false
}) => {
  const navigate = useNavigate();
  const [copiedToken, setCopiedToken] = useState(false);

  const statusConfig = {
    success: {
      icon: CheckCircle2,
      color: 'text-green-500',
      bg: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    pending: {
      icon: CheckCircle2,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    failed: {
      icon: CheckCircle2,
      color: 'text-red-500',
      bg: 'bg-red-50',
      borderColor: 'border-red-200'
    }
  };

  const config = statusConfig[status] || statusConfig.success;
  const StatusIcon = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center p-5">
      <div className="max-w-md w-full">
        {/* Success Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className={`w-20 h-20 ${config.bg} rounded-full flex items-center justify-center mb-4`}>
            <StatusIcon className={`w-12 h-12 ${config.color}`} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
          {serviceName && (
            <p className="text-sm text-gray-500">{serviceName}</p>
          )}
        </div>

        {/* Amount Card */}
        {amount && (
          <Card className="mb-6 p-6 text-center bg-gradient-to-br from-[#586BFF] to-[#9B62FF] text-white">
            <p className="text-sm opacity-80 mb-1">Amount Paid</p>
            <p className="text-4xl font-bold">₹{amount.toLocaleString('en-IN')}</p>
          </Card>
        )}

        {/* Transaction Details */}
        <Card className="mb-6 divide-y">
          {transactionId && (
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">Transaction ID</span>
              <span className="text-sm font-medium text-gray-800 font-mono">{transactionId}</span>
            </div>
          )}
          {date && (
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">Date</span>
              <span className="text-sm font-medium text-gray-800">{date}</span>
            </div>
          )}
          {time && (
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">Time</span>
              <span className="text-sm font-medium text-gray-800">{time}</span>
            </div>
          )}
          {details.map((detail, index) => (
            <div key={index} className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">{detail.label}</span>
              <span className="text-sm font-medium text-gray-800">{detail.value}</span>
            </div>
          ))}
          <div className="p-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">Status</span>
            <span className={`text-sm font-semibold ${config.color} capitalize`}>{status}</span>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/home')} 
            className="w-full bg-[#586BFF] hover:bg-[#4A5CE6] h-12"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Home
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="border-[#586BFF] text-[#586BFF] hover:bg-[#586BFF]/5"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button 
              variant="outline"
              className="border-[#586BFF] text-[#586BFF] hover:bg-[#586BFF]/5"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceReceipt;
