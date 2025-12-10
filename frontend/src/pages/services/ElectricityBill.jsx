import React, { useState } from 'react';
import { Zap, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import ServiceLayout from '../../components/ServiceLayout';
import HoverCard3D from '../../components/premium/HoverCard3D';
import ServiceReceipt from '../../components/ServiceReceipt';
import { LoadingSpinner } from '../../components/StateComponents';

const ElectricityBill = () => {
  const [step, setStep] = useState(1); // 1: Details, 2: Bill Details, 3: Confirm, 4: Receipt
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [billDetails, setBillDetails] = useState(null);
  const [receiptData, setReceiptData] = useState(null);

  const [formData, setFormData] = useState({
    provider: '',
    consumerId: '',
    amount: 0
  });

  const providers = [
    { id: 'bescom', name: 'BESCOM', region: 'Bangalore' },
    { id: 'tsspdcl', name: 'TSSPDCL', region: 'Telangana' },
    { id: 'msedcl', name: 'MSEDCL', region: 'Maharashtra' },
    { id: 'tndscl', name: 'TANGEDCO', region: 'Tamil Nadu' },
    { id: 'bses', name: 'BSES', region: 'Delhi' },
    { id: 'cesc', name: 'CESC', region: 'Kolkata' },
  ];

  const handleFetchBill = async () => {
    if (!formData.provider || !formData.consumerId) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError(null);

    // Mock API call
    setTimeout(() => {
      const mockBill = {
        consumerName: 'Arjun Mehta',
        consumerId: formData.consumerId,
        billNumber: `BILL${Math.random().toString(36).substring(7).toUpperCase()}`,
        billDate: '15 Jan 2025',
        dueDate: '30 Jan 2025',
        amount: Math.floor(Math.random() * 3000) + 500,
        units: Math.floor(Math.random() * 300) + 100,
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
        serviceName: 'Electricity Bill Payment',
        details: [
          { label: 'Consumer Name', value: billDetails.consumerName },
          { label: 'Consumer ID', value: billDetails.consumerId },
          { label: 'Bill Number', value: billDetails.billNumber },
          { label: 'Units Consumed', value: `${billDetails.units} kWh` },
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
      title="Electricity Bill"
      subtitle="Pay your electricity bill"
      icon={Zap}
      iconColor="#F59E0B"
      headerGradient="from-[#F59E0B] via-[#FB923C] to-[#FDBA74]"
    >
      {/* Step 1: Enter Details */}
      {step === 1 && !loading && (
        <HoverCard3D>
          <Card className="p-5 space-y-5">
            <div>
              <Label>Select Provider</Label>
              <select
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              >
                <option value="">Select electricity board</option>
                {providers.map((provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.name} ({provider.region})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="consumerId">Consumer ID / Account Number</Label>
              <Input
                id="consumerId"
                type="text"
                placeholder="Enter your consumer ID"
                value={formData.consumerId}
                onChange={(e) => setFormData({ ...formData, consumerId: e.target.value })}
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-2">
                Consumer ID can be found on your electricity bill
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <Button onClick={handleFetchBill} className="w-full bg-[#F59E0B] hover:bg-[#D97706] h-12">
              Fetch Bill Details
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </HoverCard3D>
      )}

      {loading && step === 1 && <LoadingSpinner message="Fetching bill details..." />}

      {/* Step 2: Bill Details */}
      {step === 2 && billDetails && !loading && (
        <div className="space-y-4">
          <Card className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-amber-600" />
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
                <span className="text-gray-500">Consumer Name</span>
                <span className="font-medium">{billDetails.consumerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Consumer ID</span>
                <span className="font-medium font-mono">{billDetails.consumerId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bill Number</span>
                <span className="font-medium font-mono">{billDetails.billNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bill Date</span>
                <span className="font-medium">{billDetails.billDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Units Consumed</span>
                <span className="font-medium">{billDetails.units} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Address</span>
                <span className="font-medium text-right">{billDetails.address}</span>
              </div>
            </div>
          </Card>

          <Button onClick={handlePayment} className="w-full bg-[#F59E0B] hover:bg-[#D97706] h-12 text-lg font-semibold">
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

export default ElectricityBill;
