import React, { useState } from 'react';
import { Shield, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import ServiceLayout from '../../components/ServiceLayout';
import HoverCard3D from '../../components/premium/HoverCard3D';
import { LoadingSpinner } from '../../components/StateComponents';
import { useNavigate } from 'react-router-dom';

const Insurance = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Type, 2: Form, 3: Success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [insuranceType, setInsuranceType] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    details: '' // specific to insurance type
  });

  const insuranceTypes = [
    { 
      id: 'life', 
      name: 'Life Insurance', 
      icon: '👨‍👩‍👧‍👦',
      color: '#586BFF',
      description: 'Protect your family\'s future'
    },
    { 
      id: 'health', 
      name: 'Health Insurance', 
      icon: '❤️',
      color: '#EF4444',
      description: 'Comprehensive health coverage'
    },
    { 
      id: 'motor', 
      name: 'Motor Insurance', 
      icon: '🚗',
      color: '#10B981',
      description: 'Car & bike insurance'
    },
    { 
      id: 'home', 
      name: 'Home Insurance', 
      icon: '🏠',
      color: '#F59E0B',
      description: 'Protect your home & belongings'
    },
  ];

  const handleTypeSelect = (type) => {
    setInsuranceType(type);
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.city) {
      setError('Please fill all required fields');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);

    // Mock API submission
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  return (
    <ServiceLayout
      title="Insurance"
      subtitle="Get insurance quotes"
      icon={Shield}
      iconColor="#9B62FF"
      headerGradient="from-[#9B62FF] via-[#A875FF] to-[#B88FFF]"
    >
      {/* Step 1: Select Type */}
      {step === 1 && (
        <div className="space-y-4">
          {insuranceTypes.map((type) => (
            <Card
              key={type.id}
              className="p-5 cursor-pointer transition-all hover:shadow-lg hover:border-[#9B62FF]"
              onClick={() => handleTypeSelect(type)}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${type.color}15` }}
                >
                  {type.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{type.name}</h3>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Step 2: Form */}
      {step === 2 && !loading && (
        <div className="space-y-4">
          <Card className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                {insuranceTypes.find(t => t.id === insuranceType.id)?.icon}
              </div>
              <div>
                <p className="text-sm text-gray-600">Get Quote For</p>
                <p className="text-lg font-bold text-gray-800">{insuranceType.name}</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 space-y-5">
            <h3 className="font-bold text-lg text-gray-800">Your Details</h3>

            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="phone">Mobile Number *</Label>
              <Input
                id="phone"
                type="tel"
                maxLength={10}
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                type="text"
                placeholder="Enter your city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="mt-2"
              />
            </div>

            {insuranceType.id === 'motor' && (
              <div>
                <Label htmlFor="details">Vehicle Registration Number (Optional)</Label>
                <Input
                  id="details"
                  type="text"
                  placeholder="e.g. KA01AB1234"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value.toUpperCase() })}
                  className="mt-2"
                />
              </div>
            )}

            {insuranceType.id === 'health' && (
              <div>
                <Label htmlFor="details">Age (Optional)</Label>
                <Input
                  id="details"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="mt-2"
                />
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}
          </Card>

          <Button onClick={handleSubmit} className="w-full bg-[#9B62FF] hover:bg-[#8B4FEF] h-12 text-lg font-semibold">
            Get Free Quote
          </Button>

          <Button onClick={() => setStep(1)} variant="outline" className="w-full">
            Change Insurance Type
          </Button>
        </div>
      )}

      {loading && <LoadingSpinner message="Submitting your request..." />}

      {/* Step 3: Success */}
      {step === 3 && (
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card className="p-8 text-center max-w-md">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Request Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in {insuranceType.name}. Our insurance experts will contact you within 24 hours with personalized quotes.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/home')} 
                className="w-full bg-[#9B62FF] hover:bg-[#8B4FEF]"
              >
                Go to Home
              </Button>
              <Button 
                onClick={() => {
                  setStep(1);
                  setFormData({ name: '', email: '', phone: '', city: '', details: '' });
                }}
                variant="outline" 
                className="w-full"
              >
                Submit Another Request
              </Button>
            </div>
          </Card>
        </div>
      )}
    </ServiceLayout>
  );
};

export default Insurance;