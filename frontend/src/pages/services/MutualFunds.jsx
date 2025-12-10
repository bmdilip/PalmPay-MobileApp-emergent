import React, { useState, useEffect } from 'react';
import { TrendingUp, ChevronRight, Star, Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import ServiceLayout from '../../components/ServiceLayout';
import ServiceReceipt from '../../components/ServiceReceipt';
import { LoadingSpinner } from '../../components/StateComponents';
import HoverCard3D from '../../components/premium/HoverCard3D';

const MutualFunds = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [funds, setFunds] = useState([]);
  const [selectedFund, setSelectedFund] = useState(null);
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [sipEnabled, setSipEnabled] = useState(false);
  const [sipDate, setSipDate] = useState('1');
  const [receiptData, setReceiptData] = useState(null);

  const categories = [
    { id: 'all', name: 'All Funds' },
    { id: 'equity', name: 'Equity' },
    { id: 'debt', name: 'Debt' },
    { id: 'hybrid', name: 'Hybrid' }
  ];

  useEffect(() => {
    fetchFunds();
  }, [category]);

  const fetchFunds = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/investments/mutual-funds/list?category=${category}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch funds');
      }
      
      const data = await response.json();
      setFunds(data.funds);
    } catch (err) {
      setError('Failed to load mutual funds. Please try again.');
      console.error('Fetch funds error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFundSelect = (fund) => {
    setSelectedFund(fund);
    setStep(2);
  };

  const handleInvest = async () => {
    if (!investmentAmount || parseFloat(investmentAmount) < selectedFund.min_investment) {
      setError(`Minimum investment is ₹${selectedFund.min_investment}`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/investments/mutual-funds/purchase`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fund_id: selectedFund.id,
            amount: parseFloat(investmentAmount),
            sip_enabled: sipEnabled,
            sip_date: sipEnabled ? parseInt(sipDate) : null
          })
        }
      );

      if (!response.ok) {
        throw new Error('Investment failed');
      }

      const data = await response.json();

      const receipt = {
        transactionId: data.transaction_id,
        date: new Date(data.timestamp).toLocaleDateString('en-IN'),
        time: new Date(data.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        amount: investmentAmount,
        serviceName: 'Mutual Fund Investment',
        status: data.status,
        details: [
          { label: 'Fund Name', value: data.details.fund_name },
          { label: 'Units Allocated', value: data.details.units_allocated },
          { label: 'NAV', value: `₹${data.details.nav}` },
          { label: 'Folio Number', value: data.details.folio_number },
          ...(sipEnabled ? [
            { label: 'SIP Enabled', value: 'Yes' },
            { label: 'SIP Date', value: `${sipDate} of every month` }
          ] : [])
        ]
      };
      setReceiptData(receipt);
      setStep(3);
    } catch (err) {
      setError('Investment failed. Please try again.');
      console.error('Investment error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    const colors = {
      'Low': 'text-green-600 bg-green-100',
      'Medium': 'text-yellow-600 bg-yellow-100',
      'Medium-High': 'text-orange-600 bg-orange-100',
      'High': 'text-red-600 bg-red-100'
    };
    return colors[risk] || 'text-gray-600 bg-gray-100';
  };

  if (loading && step === 1) {
    return (
      <ServiceLayout title="Mutual Funds" icon={TrendingUp} iconColor="#586BFF">
        <LoadingSpinner message="Loading funds..." />
      </ServiceLayout>
    );
  }

  if (step === 3 && receiptData) {
    return <ServiceReceipt {...receiptData} />;
  }

  return (
    <ServiceLayout
      title="Mutual Funds"
      icon={TrendingUp}
      iconColor="#586BFF"
    >
      {/* Step 1: Browse Funds */}
      {step === 1 && (
        <>
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  category === cat.id
                    ? 'bg-[#586BFF] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search funds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Funds List */}
          <div className="space-y-3">
            {funds
              .filter(fund => 
                fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                fund.category.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((fund) => (
                <HoverCard3D key={fund.id}>
                  <Card 
                    className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleFundSelect(fund)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{fund.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{fund.category}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRiskColor(fund.risk)}`}>
                            {fund.risk}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold">{fund.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">1Y Return</p>
                        <p className="text-sm font-bold text-green-600">+{fund.returns_1y}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">3Y Return</p>
                        <p className="text-sm font-bold text-green-600">+{fund.returns_3y}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">NAV</p>
                        <p className="text-sm font-bold text-gray-800">₹{fund.nav}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t">
                      <p className="text-xs text-gray-500">Min: ₹{fund.min_investment}</p>
                      <ChevronRight className="w-5 h-5 text-[#586BFF]" />
                    </div>
                  </Card>
                </HoverCard3D>
              ))}
          </div>
        </>
      )}

      {/* Step 2: Investment Details */}
      {step === 2 && selectedFund && (
        <HoverCard3D>
          <Card className="p-5 space-y-5">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-2">{selectedFund.name}</h3>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <p className="text-gray-500">NAV</p>
                  <p className="font-bold text-[#586BFF]">₹{selectedFund.nav}</p>
                </div>
                <div>
                  <p className="text-gray-500">1Y Returns</p>
                  <p className="font-bold text-green-600">+{selectedFund.returns_1y}%</p>
                </div>
                <div>
                  <p className="text-gray-500">Risk</p>
                  <p className={`font-bold px-2 py-1 rounded-full text-xs ${getRiskColor(selectedFund.risk)}`}>
                    {selectedFund.risk}
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <Label>Investment Amount</Label>
              <Input
                type="number"
                placeholder={`Min ₹${selectedFund.min_investment}`}
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Estimated units: {investmentAmount ? (parseFloat(investmentAmount) / selectedFund.nav).toFixed(4) : '0'}
              </p>
            </div>

            {/* SIP Option */}
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-800">Enable SIP (Systematic Investment Plan)</p>
                  <p className="text-xs text-gray-500">Invest regularly every month</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sipEnabled}
                    onChange={(e) => setSipEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#586BFF]"></div>
                </label>
              </div>

              {sipEnabled && (
                <div>
                  <Label>SIP Date (Day of Month)</Label>
                  <select
                    value={sipDate}
                    onChange={(e) => setSipDate(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#586BFF]"
                  >
                    {[...Array(28)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleInvest}
                disabled={loading}
                className="flex-1 bg-[#586BFF] hover:bg-[#4655CC]"
              >
                {loading ? 'Processing...' : `Invest ₹${investmentAmount || 0}`}
                {!loading && <ChevronRight className="w-5 h-5 ml-2" />}
              </Button>
            </div>
          </Card>
        </HoverCard3D>
      )}
    </ServiceLayout>
  );
};

export default MutualFunds;
