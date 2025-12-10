import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight, TrendingUp, TrendingDown, Shield, Award } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import ServiceLayout from '../../components/ServiceLayout';
import ServiceReceipt from '../../components/ServiceReceipt';
import { LoadingSpinner } from '../../components/StateComponents';
import HoverCard3D from '../../components/premium/HoverCard3D';
import { motion } from 'framer-motion';

const DigitalGold = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [goldPrice, setGoldPrice] = useState(null);
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [purchaseMethod, setPurchaseMethod] = useState('amount'); // 'amount' or 'grams'
  const [receiptData, setReceiptData] = useState(null);

  const quickAmounts = [10, 100, 500, 1000, 5000];

  useEffect(() => {
    fetchGoldPrice();
    // Refresh price every 30 seconds
    const interval = setInterval(fetchGoldPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchGoldPrice = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/investments/digital-gold/price`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch gold price');
      }
      
      const data = await response.json();
      setGoldPrice(data.gold_price);
    } catch (err) {
      setError('Failed to load gold price. Please try again.');
      console.error('Fetch gold price error:', err);
    }
  };

  const handlePurchase = async () => {
    const amount = parseFloat(purchaseAmount);
    
    if (!amount || amount < 10) {
      setError('Minimum purchase amount is ₹10');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/investments/digital-gold/purchase`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amount
          })
        }
      );

      if (!response.ok) {
        throw new Error('Purchase failed');
      }

      const data = await response.json();

      const receipt = {
        transactionId: data.transaction_id,
        date: new Date(data.timestamp).toLocaleDateString('en-IN'),
        time: new Date(data.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        amount: data.details.amount_paid,
        serviceName: 'Digital Gold Purchase',
        status: data.status,
        details: [
          { label: 'Gold Purchased', value: data.details.gold_purchased },
          { label: 'Rate per Gram', value: `₹${data.details.rate_per_gram}` },
          { label: 'Purity', value: data.details.purity },
          { label: 'Vault Number', value: data.details.vault_number },
          { label: 'Insured', value: data.details.insured ? 'Yes' : 'No' },
          { label: 'Current Value', value: `₹${data.details.current_value}` }
        ]
      };
      setReceiptData(receipt);
      setStep(2);
    } catch (err) {
      setError('Purchase failed. Please try again.');
      console.error('Gold purchase error:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateGrams = () => {
    if (!purchaseAmount || !goldPrice) return 0;
    return (parseFloat(purchaseAmount) / goldPrice.price_per_gram).toFixed(4);
  };

  if (loading && !goldPrice) {
    return (
      <ServiceLayout title="Digital Gold" icon={Sparkles} iconColor="#D4AF37">
        <LoadingSpinner message="Loading gold price..." />
      </ServiceLayout>
    );
  }

  if (step === 2 && receiptData) {
    return <ServiceReceipt {...receiptData} />;
  }

  return (
    <ServiceLayout
      title="Digital Gold"
      icon={Sparkles}
      iconColor="#D4AF37"
    >
      {step === 1 && (
        <>
          {/* Gold Price Card */}
          {goldPrice && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5"
            >
              <HoverCard3D>
                <Card className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-amber-200">
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">24K Gold (99.9%)</p>
                          <p className="text-xs text-gray-500">Live Market Price</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800">
                          ₹{goldPrice.price_per_gram.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">per gram</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-3 border-t border-amber-200">
                      <div className="flex items-center gap-1">
                        {goldPrice.change_24h >= 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-sm font-semibold ${
                          goldPrice.change_24h >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {goldPrice.change_percentage >= 0 ? '+' : ''}{goldPrice.change_percentage}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {goldPrice.change_24h >= 0 ? '+' : ''}₹{goldPrice.change_24h.toFixed(2)} today
                      </div>
                    </div>
                  </div>
                </Card>
              </HoverCard3D>
            </motion.div>
          )}

          {/* Features */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { icon: Shield, label: '100% Insured', color: 'text-blue-600' },
              { icon: Award, label: '24K Purity', color: 'text-amber-600' },
              { icon: Sparkles, label: 'Digital Vault', color: 'text-purple-600' }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-3 text-center">
                  <feature.icon className={`w-6 h-6 mx-auto mb-1 ${feature.color}`} />
                  <p className="text-xs font-medium text-gray-700">{feature.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Purchase Form */}
          <HoverCard3D>
            <Card className="p-5 space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <Label>Enter Amount</Label>
                <Input
                  type="number"
                  placeholder="Min ₹10"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                  className="mt-1 text-lg"
                />
                {purchaseAmount && goldPrice && (
                  <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    You'll get <span className="font-bold text-amber-600">{calculateGrams()}g</span> of gold
                  </p>
                )}
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <Label className="mb-2 block">Quick Select</Label>
                <div className="grid grid-cols-5 gap-2">
                  {quickAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setPurchaseAmount(amt.toString())}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        purchaseAmount === amt.toString()
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-1">Safe & Secure</p>
                    <p className="text-xs text-gray-600">
                      Your gold is stored in insured vaults. Can be redeemed anytime or delivered to your doorstep.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handlePurchase}
                disabled={loading || !purchaseAmount}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white h-12"
              >
                {loading ? 'Processing...' : `Buy Gold for ₹${purchaseAmount || 0}`}
                {!loading && <ChevronRight className="w-5 h-5 ml-2" />}
              </Button>

              <p className="text-xs text-center text-gray-500">
                Min ₹10 • Max ₹2,00,000 per transaction
              </p>
            </Card>
          </HoverCard3D>

          {/* Why Digital Gold */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5"
          >
            <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <h4 className="font-semibold text-gray-800 mb-3">Why Digital Gold?</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Start with just ₹10</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>No making charges or storage hassle</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>100% insured and verified purity</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Buy, sell, or get delivery anytime</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </>
      )}
    </ServiceLayout>
  );
};

export default DigitalGold;
