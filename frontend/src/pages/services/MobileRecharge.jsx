import React, { useState } from 'react';
import { Smartphone, ChevronRight, Zap } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import ServiceLayout from '../../components/ServiceLayout';
import ServiceReceipt from '../../components/ServiceReceipt';
import { LoadingSpinner, ErrorState } from '../../components/StateComponents';
import { useNavigate } from 'react-router-dom';

const MobileRecharge = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Details, 2: Plans, 3: Confirm, 4: Receipt
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    mobileNumber: '',
    operator: '',
    circle: '',
    amount: '',
    planId: null
  });

  const operators = [
    { id: 'airtel', name: 'Airtel', icon: '📱', color: '#E31837' },
    { id: 'jio', name: 'Jio', icon: '📱', color: '#0057A0' },
    { id: 'vi', name: 'Vi (Vodafone Idea)', icon: '📱', color: '#E60000' },
    { id: 'bsnl', name: 'BSNL', icon: '📱', color: '#F37021' },
  ];

  const circles = [
    'Karnataka', 'Delhi', 'Mumbai', 'Tamil Nadu', 'Maharashtra', 
    'Andhra Pradesh', 'Gujarat', 'Rajasthan', 'Kerala', 'West Bengal'
  ];

  const mockPlans = [
    { id: 1, amount: 239, validity: '28 days', data: '1.5 GB/day', calls: 'Unlimited', sms: '100/day', popular: true },
    { id: 2, amount: 299, validity: '28 days', data: '2 GB/day', calls: 'Unlimited', sms: '100/day', popular: false },
    { id: 3, amount: 479, validity: '56 days', data: '1.5 GB/day', calls: 'Unlimited', sms: '100/day', popular: false },
    { id: 4, amount: 719, validity: '84 days', data: '1.5 GB/day', calls: 'Unlimited', sms: '100/day', popular: true },
    { id: 5, amount: 149, validity: '24 days', data: '1 GB/day', calls: 'Unlimited', sms: '100/day', popular: false },
  ];

  const [receiptData, setReceiptData] = useState(null);

  const handleOperatorSelect = (operatorId) => {
    setFormData({ ...formData, operator: operatorId });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.mobileNumber || !formData.operator || !formData.circle) {
        setError('Please fill all fields');
        return;
      }
      if (formData.mobileNumber.length !== 10) {
        setError('Please enter a valid 10-digit mobile number');
        return;
      }
      setError(null);
      setStep(2);
    }
  };

  const handlePlanSelect = (plan) => {
    setFormData({ ...formData, planId: plan.id, amount: plan.amount });
    setStep(3);
  };

  const handlePayment = async () => {
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      const receipt = {
        transactionId: `TXN${Date.now()}`,
        date: new Date().toLocaleDateString('en-IN'),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        amount: formData.amount,
        serviceName: 'Mobile Recharge',
        details: [
          { label: 'Mobile Number', value: formData.mobileNumber },
          { label: 'Operator', value: operators.find(o => o.id === formData.operator)?.name },
          { label: 'Circle', value: formData.circle },
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
      title="Mobile Recharge"
      subtitle="Recharge your prepaid mobile"
      icon={Smartphone}
    >
      {/* Step 1: Enter Details */}
      {step === 1 && (
        <Card className="p-5 space-y-5">
          <div>
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              maxLength={10}
              placeholder="Enter 10-digit mobile number"
              value={formData.mobileNumber}
              onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '') })}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Select Operator</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {operators.map((op) => (
                <button
                  key={op.id}
                  onClick={() => handleOperatorSelect(op.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.operator === op.id
                      ? 'border-[#586BFF] bg-[#586BFF]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{op.icon}</div>
                  <p className="text-sm font-medium text-gray-800">{op.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="circle">Circle</Label>
            <select
              id="circle"
              value={formData.circle}
              onChange={(e) => setFormData({ ...formData, circle: e.target.value })}
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#586BFF]"
            >
              <option value="">Select circle</option>
              {circles.map((circle) => (
                <option key={circle} value={circle}>{circle}</option>
              ))}
            </select>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <Button onClick={handleNext} className="w-full bg-[#586BFF] h-12">
            Browse Plans
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>
      )}

      {/* Step 2: Select Plan */}
      {step === 2 && (
        <div className="space-y-4">
          <Card className="p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Quick Recharge</span>
            </div>
            <p className="text-sm opacity-90">{formData.operator.toUpperCase()} • {formData.mobileNumber}</p>
          </Card>

          <div className="space-y-3">
            {mockPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                  plan.popular ? 'border-2 border-[#586BFF]' : ''
                }`}
                onClick={() => handlePlanSelect(plan)}
              >
                {plan.popular && (
                  <div className="inline-block bg-[#586BFF] text-white text-xs px-2 py-1 rounded-full mb-2 font-medium">
                    Most Popular
                  </div>
                )}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-2xl font-bold text-gray-800">₹{plan.amount}</p>
                    <p className="text-sm text-gray-500">{plan.validity} validity</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-gray-500">Data</p>
                    <p className="font-medium text-gray-800">{plan.data}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Calls</p>
                    <p className="font-medium text-gray-800">{plan.calls}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">SMS</p>
                    <p className="font-medium text-gray-800">{plan.sms}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Button onClick={() => setStep(1)} variant="outline" className="w-full">
            Back to Details
          </Button>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && !loading && (
        <div className="space-y-4">
          <Card className="p-5 space-y-4">
            <h3 className="font-bold text-lg text-gray-800">Confirm Recharge</h3>
            
            <div className="space-y-3 pt-3 border-t">
              <div className="flex justify-between">
                <span className="text-gray-500">Mobile Number</span>
                <span className="font-medium">{formData.mobileNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Operator</span>
                <span className="font-medium">
                  {operators.find(o => o.id === formData.operator)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Circle</span>
                <span className="font-medium">{formData.circle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Plan</span>
                <span className="font-medium">₹{formData.amount}</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                <span className="text-2xl font-bold text-[#586BFF]">₹{formData.amount}</span>
              </div>
            </div>
          </Card>

          <Button onClick={handlePayment} className="w-full bg-[#586BFF] h-12 text-lg font-semibold">
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

export default MobileRecharge;
