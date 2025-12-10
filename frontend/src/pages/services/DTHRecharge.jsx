import React, { useState } from 'react';
import { Tv, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import ServiceLayout from '../../components/ServiceLayout';
import HoverCard3D from '../../components/premium/HoverCard3D';
import ServiceReceipt from '../../components/ServiceReceipt';
import { LoadingSpinner } from '../../components/StateComponents';

const DTHRecharge = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [receiptData, setReceiptData] = useState(null);

  const [formData, setFormData] = useState({
    provider: '',
    subscriberId: '',
    amount: '',
    planId: null
  });

  const providers = [
    { id: 'tatasky', name: 'Tata Play', icon: '📺' },
    { id: 'airtel', name: 'Airtel Digital TV', icon: '📺' },
    { id: 'dish', name: 'Dish TV', icon: '📺' },
    { id: 'd2h', name: 'Videocon D2H', icon: '📺' },
    { id: 'sun', name: 'Sun Direct', icon: '📺' },
  ];

  const mockPlans = [
    { id: 1, name: 'Basic HD', amount: 299, channels: '150+ channels', validity: '30 days' },
    { id: 2, name: 'Family Pack', amount: 499, channels: '250+ channels', validity: '30 days', popular: true },
    { id: 3, name: 'Premium Sports', amount: 699, channels: '300+ channels', validity: '30 days' },
    { id: 4, name: 'Entertainment Plus', amount: 399, channels: '200+ channels', validity: '30 days' },
  ];

  const handleNext = () => {
    if (!formData.provider || !formData.subscriberId) {
      setError('Please fill all fields');
      return;
    }
    setError(null);
    setStep(2);
  };

  const handlePlanSelect = (plan) => {
    setFormData({ ...formData, planId: plan.id, amount: plan.amount });
    setStep(3);
  };

  const handlePayment = async () => {
    setLoading(true);
    setTimeout(() => {
      const receipt = {
        transactionId: `TXN${Date.now()}`,
        date: new Date().toLocaleDateString('en-IN'),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        amount: formData.amount,
        serviceName: 'DTH Recharge',
        details: [
          { label: 'Provider', value: providers.find(p => p.id === formData.provider)?.name },
          { label: 'Subscriber ID', value: formData.subscriberId },
          { label: 'Plan', value: `₹${formData.amount}` }
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
      title="DTH Recharge"
      subtitle="Recharge your DTH connection"
      icon={Tv}
      iconColor="#9B62FF"
      headerGradient="from-[#9B62FF] via-[#A875FF] to-[#B88FFF]"
    >
      {step === 1 && (
        <HoverCard3D>
          <Card className="p-5 space-y-5">
            <div>
              <Label>Select Provider</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {providers.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => setFormData({ ...formData, provider: provider.id })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.provider === provider.id
                        ? 'border-[#9B62FF] bg-[#9B62FF]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{provider.icon}</div>
                    <p className="text-sm font-medium text-gray-800">{provider.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="subscriberId">Subscriber ID / RMN</Label>
              <Input
                id="subscriberId"
                type="text"
                placeholder="Enter subscriber ID"
                value={formData.subscriberId}
                onChange={(e) => setFormData({ ...formData, subscriberId: e.target.value })}
                className="mt-2"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

          <Button onClick={handleNext} className="w-full bg-[#9B62FF] hover:bg-[#8B4FEF] h-12">
            Browse Plans
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>
      )}

      {step === 2 && (
        <div className="space-y-4">
          {mockPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                plan.popular ? 'border-2 border-[#9B62FF]' : ''
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              {plan.popular && (
                <div className="inline-block bg-[#9B62FF] text-white text-xs px-2 py-1 rounded-full mb-2 font-medium">
                  Most Popular
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-800">{plan.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{plan.channels}</p>
                  <p className="text-xs text-gray-400 mt-1">{plan.validity}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#9B62FF]">₹{plan.amount}</p>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-auto mt-2" />
                </div>
              </div>
            </Card>
          ))}
          <Button onClick={() => setStep(1)} variant="outline" className="w-full">
            Back to Details
          </Button>
        </div>
      )}

      {step === 3 && !loading && (
        <div className="space-y-4">
          <Card className="p-5 space-y-4">
            <h3 className="font-bold text-lg text-gray-800">Confirm Recharge</h3>
            <div className="space-y-3 pt-3 border-t">
              <div className="flex justify-between">
                <span className="text-gray-500">Provider</span>
                <span className="font-medium">{providers.find(p => p.id === formData.provider)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Subscriber ID</span>
                <span className="font-medium">{formData.subscriberId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="font-medium">₹{formData.amount}</span>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                <span className="text-2xl font-bold text-[#9B62FF]">₹{formData.amount}</span>
              </div>
            </div>
          </Card>
          <Button onClick={handlePayment} className="w-full bg-[#9B62FF] hover:bg-[#8B4FEF] h-12 text-lg font-semibold">
            Pay ₹{formData.amount}
          </Button>
          <Button onClick={() => setStep(2)} variant="outline" className="w-full">
            Change Plan
          </Button>
        </div>
      )}

      {loading && <LoadingSpinner message="Processing your recharge..." />}
    </ServiceLayout>
  );
};

export default DTHRecharge;