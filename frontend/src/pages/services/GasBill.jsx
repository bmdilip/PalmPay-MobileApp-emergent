import React, { useState } from 'react';
import { Flame, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import ServiceLayout from '../../components/ServiceLayout';
import HoverCard3D from '../../components/premium/HoverCard3D';
import ServiceReceipt from '../../components/ServiceReceipt';
import { LoadingSpinner } from '../../components/StateComponents';

const GasBill = () => {
  const [gasType, setGasType] = useState(null); // 'cylinder' or 'piped'
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [receiptData, setReceiptData] = useState(null);

  const [formData, setFormData] = useState({
    provider: '',
    customerId: '',
    amount: 0
  });

  const cylinderProviders = [
    { id: 'indane', name: 'Indane Gas' },
    { id: 'hp', name: 'HP Gas' },
    { id: 'bharat', name: 'Bharat Gas' },
  ];

  const pipedGasProviders = [
    { id: 'igl', name: 'Indraprastha Gas (IGL)' },
    { id: 'mgl', name: 'Mahanagar Gas (MGL)' },
    { id: 'ggl', name: 'Gujarat Gas' },
    { id: 'agl', name: 'Adani Gas' },
  ];

  const handleTypeSelect = (type) => {
    setGasType(type);
    setStep(2);
  };

  const handleBooking = async () => {
    if (!formData.provider || !formData.customerId) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      const mockBooking = {
        customerName: 'Arjun Mehta',
        customerId: formData.customerId,
        bookingNumber: `GAS${Math.random().toString(36).substring(7).toUpperCase()}`,
        amount: gasType === 'cylinder' ? 850 : Math.floor(Math.random() * 1000) + 500,
        deliveryDate: gasType === 'cylinder' ? 'Within 3-4 days' : 'N/A',
        address: '123, MG Road, Bangalore - 560001'
      };
      setBookingDetails(mockBooking);
      setFormData({ ...formData, amount: mockBooking.amount });
      setLoading(false);
      setStep(3);
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
        serviceName: gasType === 'cylinder' ? 'LPG Cylinder Booking' : 'Piped Gas Bill Payment',
        details: [
          { label: 'Customer Name', value: bookingDetails.customerName },
          { label: 'Customer ID', value: bookingDetails.customerId },
          { label: 'Booking Number', value: bookingDetails.bookingNumber },
          ...(gasType === 'cylinder' ? [{ label: 'Expected Delivery', value: bookingDetails.deliveryDate }] : []),
          { label: 'Provider', value: (gasType === 'cylinder' ? cylinderProviders : pipedGasProviders).find(p => p.id === formData.provider)?.name }
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
      title="Gas Services"
      subtitle="Book cylinder or pay piped gas bill"
      icon={Flame}
      iconColor="#EF4444"
      headerGradient="from-[#EF4444] via-[#F87171] to-[#FCA5A5]"
    >
      {/* Step 1: Select Gas Type */}
      {step === 1 && (
        <div className="space-y-4">
          <Card
            className="p-6 cursor-pointer transition-all hover:shadow-lg hover:border-[#EF4444]"
            onClick={() => handleTypeSelect('cylinder')}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                <Flame className="w-7 h-7 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">LPG Cylinder</h3>
                <p className="text-sm text-gray-500">Book new cylinder</p>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </div>
          </Card>

          <Card
            className="p-6 cursor-pointer transition-all hover:shadow-lg hover:border-[#EF4444]"
            onClick={() => handleTypeSelect('piped')}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                <Flame className="w-7 h-7 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">Piped Gas</h3>
                <p className="text-sm text-gray-500">Pay piped gas bill</p>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </div>
          </Card>
        </div>
      )}

      {/* Step 2: Enter Details */}
      {step === 2 && !loading && (
        <Card className="p-5 space-y-5">
          <div>
            <Label>Select Provider</Label>
            <select
              value={formData.provider}
              onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4444]"
            >
              <option value="">Select provider</option>
              {(gasType === 'cylinder' ? cylinderProviders : pipedGasProviders).map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="customerId">{gasType === 'cylinder' ? 'LPG ID' : 'Customer ID'}</Label>
            <Input
              id="customerId"
              type="text"
              placeholder={`Enter your ${gasType === 'cylinder' ? 'LPG ID' : 'customer ID'}`}
              value={formData.customerId}
              onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
              className="mt-2"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <Button onClick={handleBooking} className="w-full bg-[#EF4444] hover:bg-[#DC2626] h-12">
            {gasType === 'cylinder' ? 'Book Cylinder' : 'Fetch Bill'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>

          <Button onClick={() => setStep(1)} variant="outline" className="w-full">
            Back
          </Button>
        </Card>
      )}

      {loading && step === 2 && <LoadingSpinner message={gasType === 'cylinder' ? 'Processing booking...' : 'Fetching bill...'} />}

      {/* Step 3: Confirm */}
      {step === 3 && bookingDetails && !loading && (
        <div className="space-y-4">
          <Card className="p-5 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Flame className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-3xl font-bold text-gray-800">₹{bookingDetails.amount.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 space-y-3">
            <h3 className="font-bold text-gray-800 mb-3">{gasType === 'cylinder' ? 'Booking' : 'Bill'} Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Customer Name</span>
                <span className="font-medium">{bookingDetails.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Customer ID</span>
                <span className="font-medium font-mono">{bookingDetails.customerId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{gasType === 'cylinder' ? 'Booking' : 'Bill'} Number</span>
                <span className="font-medium font-mono">{bookingDetails.bookingNumber}</span>
              </div>
              {gasType === 'cylinder' && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Expected Delivery</span>
                  <span className="font-medium">{bookingDetails.deliveryDate}</span>
                </div>
              )}
            </div>
          </Card>

          <Button onClick={handlePayment} className="w-full bg-[#EF4444] hover:bg-[#DC2626] h-12 text-lg font-semibold">
            Pay ₹{bookingDetails.amount.toLocaleString('en-IN')}
          </Button>

          <Button onClick={() => setStep(2)} variant="outline" className="w-full">
            Change Details
          </Button>
        </div>
      )}

      {loading && step === 3 && <LoadingSpinner message="Processing payment..." />}
    </ServiceLayout>
  );
};

export default GasBill;