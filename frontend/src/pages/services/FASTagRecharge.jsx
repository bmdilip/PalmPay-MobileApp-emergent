import React, { useState } from 'react';
import { Car, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import ServiceLayout from '../../components/ServiceLayout';
import HoverCard3D from '../../components/premium/HoverCard3D';
import ServiceReceipt from '../../components/ServiceReceipt';
import { LoadingSpinner } from '../../components/StateComponents';

const FASTagRecharge = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [receiptData, setReceiptData] = useState(null);

  const [formData, setFormData] = useState({
    provider: '',
    vehicleNumber: '',
    amount: ''
  });

  const providers = [
    { id: 'paytm', name: 'Paytm Payments Bank', logo: '🏛️' },
    { id: 'icici', name: 'ICICI Bank', logo: '🏛️' },
    { id: 'sbi', name: 'SBI FASTag', logo: '🏛️' },
    { id: 'hdfc', name: 'HDFC Bank', logo: '🏛️' },
    { id: 'axis', name: 'Axis Bank', logo: '🏛️' },
  ];

  const suggestedAmounts = [100, 200, 500, 1000, 2000, 5000];

  const handleFetchDetails = async () => {
    if (!formData.provider || !formData.vehicleNumber) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      const mockDetails = {
        vehicleNumber: formData.vehicleNumber.toUpperCase(),
        ownerName: 'Arjun Mehta',
        tagId: `TAG${Math.random().toString(36).substring(7).toUpperCase()}`,
        currentBalance: Math.floor(Math.random() * 500) + 100,
        status: 'Active',
        vehicleClass: 'Car / Jeep / Van'
      };
      setVehicleDetails(mockDetails);
      setLoading(false);
      setStep(2);
    }, 2000);
  };

  const handlePayment = async () => {
    if (!formData.amount || parseFloat(formData.amount) < 100) {
      setError('Minimum recharge amount is ₹100');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/transportation/fastag/recharge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vehicle_number: formData.vehicleNumber,
          tag_id: vehicleDetails.tagId,
          amount: parseFloat(formData.amount),
          bank: formData.provider
        })
      });
      
      if (!response.ok) {
        throw new Error('Recharge failed');
      }
      
      const data = await response.json();
      
      const receipt = {
        transactionId: data.transaction_id,
        date: new Date(data.timestamp).toLocaleDateString('en-IN'),
        time: new Date(data.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        amount: data.amount,
        serviceName: 'FASTag Recharge',
        status: data.status,
        details: [
          { label: 'Vehicle Number', value: data.details.vehicle_number },
          { label: 'Tag ID', value: data.details.tag_id },
          { label: 'Bank', value: data.details.bank },
          { label: 'New Balance', value: `₹${data.details.new_balance.toFixed(2)}` },
          { label: 'Valid Till', value: data.details.valid_till }
        ]
      };
      setReceiptData(receipt);
      setStep(4);
    } catch (err) {
      setError('Recharge failed. Please try again.');
      console.error('FASTag recharge error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (step === 4 && receiptData) {
    return <ServiceReceipt {...receiptData} />;
  }

  return (
    <ServiceLayout
      title="FASTag Recharge"
      subtitle="Recharge your FASTag"
      icon={Car}
      iconColor="#10B981"
      headerGradient="from-[#10B981] via-[#34D399] to-[#6EE7B7]"
    >
      {/* Step 1: Enter Details */}
      {step === 1 && !loading && (
        <HoverCard3D>
          <Card className="p-5 space-y-5">
          <div>
            <Label>FASTag Provider</Label>
            <select
              value={formData.provider}
              onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            >
              <option value="">Select bank/provider</option>
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="vehicleNumber">Vehicle Registration Number</Label>
            <Input
              id="vehicleNumber"
              type="text"
              placeholder="e.g. KA01AB1234"
              value={formData.vehicleNumber}
              onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value.toUpperCase() })}
              className="mt-2"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <Button onClick={handleFetchDetails} className="w-full bg-[#10B981] hover:bg-[#059669] h-12">
            Fetch Vehicle Details
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>
        </HoverCard3D>
      )}

      {loading && step === 1 && <LoadingSpinner message="Fetching vehicle details..." />}

      {/* Step 2: Vehicle Details & Amount */}
      {step === 2 && vehicleDetails && !loading && (
        <div className="space-y-4">
          <Card className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Car className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Balance</p>
                <p className="text-2xl font-bold text-gray-800">₹{vehicleDetails.currentBalance}</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 space-y-3">
            <h3 className="font-bold text-gray-800 mb-3">Vehicle Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Vehicle Number</span>
                <span className="font-medium font-mono">{vehicleDetails.vehicleNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Owner Name</span>
                <span className="font-medium">{vehicleDetails.ownerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tag ID</span>
                <span className="font-medium font-mono">{vehicleDetails.tagId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Vehicle Class</span>
                <span className="font-medium">{vehicleDetails.vehicleClass}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="font-medium text-green-600">{vehicleDetails.status}</span>
              </div>
            </div>
          </Card>

          <Card className="p-5 space-y-4">
            <div>
              <Label htmlFor="amount">Recharge Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount (min ₹100)"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="mb-2 block">Quick Amount</Label>
              <div className="grid grid-cols-3 gap-2">
                {suggestedAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setFormData({ ...formData, amount: amt.toString() })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.amount === amt.toString()
                        ? 'border-[#10B981] bg-[#10B981]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-semibold text-gray-800">₹{amt}</p>
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <Button onClick={handlePayment} className="w-full bg-[#10B981] hover:bg-[#059669] h-12 text-lg font-semibold">
            Recharge ₹{formData.amount || '0'}
          </Button>

          <Button onClick={() => setStep(1)} variant="outline" className="w-full">
            Change Vehicle
          </Button>
        </div>
      )}

      {loading && step === 2 && <LoadingSpinner message="Processing recharge..." />}
    </ServiceLayout>
  );
};

export default FASTagRecharge;