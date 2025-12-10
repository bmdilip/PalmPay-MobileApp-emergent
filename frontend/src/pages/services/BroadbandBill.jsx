import React, { useState } from 'react';
import { Wifi, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import ServiceLayout from '../../components/ServiceLayout';
import HoverCard3D from '../../components/premium/HoverCard3D';
import ServiceReceipt from '../../components/ServiceReceipt';
import { LoadingSpinner } from '../../components/StateComponents';

const BroadbandBill = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [billDetails, setBillDetails] = useState(null);
  const [receiptData, setReceiptData] = useState(null);

  const [formData, setFormData] = useState({
    provider: '',
    accountNumber: '',
    amount: 0
  });

  const providers = [
    { id: 'airtel', name: 'Airtel Fiber' },
    { id: 'jio', name: 'Jio Fiber' },
    { id: 'bsnl', name: 'BSNL Broadband' },
    { id: 'act', name: 'ACT Fibernet' },
    { id: 'hathway', name: 'Hathway' },
    { id: 'tikona', name: 'Tikona' },
  ];

  const handleFetchBill = async () => {
    if (!formData.provider || !formData.accountNumber) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      const mockBill = {
        accountName: 'Arjun Mehta',
        accountNumber: formData.accountNumber,
        billNumber: `BB${Math.random().toString(36).substring(7).toUpperCase()}`,
        billDate: '10 Jan 2025',
        dueDate: '25 Jan 2025',
        amount: Math.floor(Math.random() * 1500) + 500,
        plan: '100 Mbps Unlimited',
        address: '123, MG Road, Bangalore - 560001'
      };
      setBillDetails(mockBill);
      setFormData({ ...formData, amount: mockBill.amount });
      setLoading(false);
      setStep(2);
    }, 2000);
  };

  const handlePayment = async () => {
    setLoading(true);
    setTimeout(() => {
      const receipt = {
        transactionId: `TXN${Date.now()}`,
        date: new Date().toLocaleDateString('en-IN'),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        amount: formData.amount,
        serviceName: 'Broadband Bill Payment',
        details: [
          { label: 'Account Name', value: billDetails.accountName },
          { label: 'Account Number', value: billDetails.accountNumber },
          { label: 'Bill Number', value: billDetails.billNumber },
          { label: 'Plan', value: billDetails.plan },
          { label: 'Provider', value: providers.find(p => p.id === formData.provider)?.name }
        ]
      };
      setReceiptData(receipt);
      setLoading(false);
      setStep(4);
    }, 2000);
  };

  if (step === 4 && receiptData) {
    return <ServiceReceipt {...receiptData} />;
  }

  return (
    <ServiceLayout
      title="Broadband Bill"
      subtitle="Pay your broadband bill"
      icon={Wifi}
      iconColor="#64E8FF"
      headerGradient="from-[#64E8FF] via-[#7BE9FF] to-[#91EBFF]"
    >
      {step === 1 && !loading && (
        <Card className="p-5 space-y-5">
          <div>
            <Label>Select Provider</Label>
            <select
              value={formData.provider}
              onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#64E8FF]"
            >
              <option value="">Select broadband provider</option>
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="accountNumber">Account Number / Customer ID</Label>
            <Input
              id="accountNumber"
              type="text"
              placeholder="Enter your account number"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              className="mt-2"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <Button onClick={handleFetchBill} className="w-full bg-[#64E8FF] hover:bg-[#50D5E8] text-gray-900 h-12">
            Fetch Bill Details
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>
      )}

      {loading && step === 1 && <LoadingSpinner message="Fetching bill details..." />}

      {step === 2 && billDetails && !loading && (
        <div className="space-y-4">
          <Card className="p-5 bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                <Wifi className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Bill Amount</p>
                <p className="text-3xl font-bold text-gray-800">₹{billDetails.amount.toLocaleString('en-IN')}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Due Date</span>
                <span className="font-medium text-red-600">{billDetails.dueDate}</span>
              </div>
            </div>
          </Card>

          <Card className="p-5 space-y-3">
            <h3 className="font-bold text-gray-800 mb-3">Bill Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Account Name</span>
                <span className="font-medium">{billDetails.accountName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Account Number</span>
                <span className="font-medium font-mono">{billDetails.accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bill Number</span>
                <span className="font-medium font-mono">{billDetails.billNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Plan</span>
                <span className="font-medium">{billDetails.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bill Date</span>
                <span className="font-medium">{billDetails.billDate}</span>
              </div>
            </div>
          </Card>

          <Button onClick={handlePayment} className="w-full bg-[#64E8FF] hover:bg-[#50D5E8] text-gray-900 h-12 text-lg font-semibold">
            Pay ₹{billDetails.amount.toLocaleString('en-IN')}
          </Button>

          <Button onClick={() => setStep(1)} variant="outline" className="w-full">
            Change Details
          </Button>
        </div>
      )}

      {loading && step === 2 && <LoadingSpinner message="Processing payment..." />}
    </ServiceLayout>
  );
};

export default BroadbandBill;