import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, MapPin, Check, ChevronRight, ArrowLeft, Store, Percent,
  Search, QrCode, CreditCard, Gift, Tag, Star, Clock, Car, Navigation,
  Coffee, Ticket, Heart, Bell, Lock
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import HoverCard3D from '../../components/premium/HoverCard3D';
import PalmNFCIcon from '../../components/icons/PalmNFCIcon';

const Retail = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeTab, setActiveTab] = useState('stores');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Cities with PalmPe retail integration
  const cities = {
    active: [
      { id: 'bangalore', name: 'Bangalore', state: 'Karnataka', malls: 8, palmPeStores: 320 },
      { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', malls: 12, palmPeStores: 450 },
      { id: 'delhi', name: 'Delhi NCR', state: 'Delhi', malls: 15, palmPeStores: 520 },
      { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', malls: 6, palmPeStores: 180 }
    ],
    upcoming: [
      { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', expected: 'Q1 2025' },
      { id: 'pune', name: 'Pune', state: 'Maharashtra', expected: 'Q2 2025' },
      { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', expected: 'Q3 2025' }
    ]
  };

  // User loyalty data
  const loyaltyData = {
    points: 2450,
    tier: 'Gold',
    nextTier: 'Platinum',
    pointsToNext: 550,
    totalSaved: 12500
  };

  // Malls data per city
  const mallData = {
    bangalore: [
      {
        id: 'phoenix',
        name: 'Phoenix Marketcity',
        address: 'Whitefield, Bangalore',
        stores: 280,
        rating: 4.6,
        palmPe: true,
        parking: { available: 450, total: 800 },
        hours: '10 AM - 10 PM',
        features: ['Multiplex', 'Food Court', 'Gaming Zone', 'Kids Play Area']
      },
      {
        id: 'orion',
        name: 'Orion Mall',
        address: 'Rajajinagar, Bangalore',
        stores: 150,
        rating: 4.5,
        palmPe: true,
        parking: { available: 280, total: 500 },
        hours: '10 AM - 10 PM',
        features: ['Bowling Alley', 'Food Court', 'Supermarket']
      },
      {
        id: 'forum',
        name: 'Forum Mall',
        address: 'Koramangala, Bangalore',
        stores: 120,
        rating: 4.4,
        palmPe: true,
        parking: { available: 150, total: 350 },
        hours: '10 AM - 10 PM',
        features: ['PVR Cinemas', 'Food Court', 'Premium Brands']
      },
      {
        id: 'ub',
        name: 'UB City',
        address: 'Vittal Mallya Road, Bangalore',
        stores: 80,
        rating: 4.8,
        palmPe: true,
        parking: { available: 100, total: 200 },
        hours: '11 AM - 9 PM',
        features: ['Luxury Brands', 'Fine Dining', 'Art Gallery']
      }
    ],
    mumbai: [
      {
        id: 'phoenix-mumbai',
        name: 'Phoenix Palladium',
        address: 'Lower Parel, Mumbai',
        stores: 300,
        rating: 4.7,
        palmPe: true,
        parking: { available: 500, total: 1000 },
        hours: '11 AM - 10 PM',
        features: ['Luxury Brands', 'IMAX', 'Fine Dining']
      }
    ],
    delhi: [
      {
        id: 'dlf',
        name: 'DLF Mall of India',
        address: 'Noida, Delhi NCR',
        stores: 350,
        rating: 4.6,
        palmPe: true,
        parking: { available: 800, total: 1500 },
        hours: '10 AM - 10 PM',
        features: ['Snow World', 'IMAX', 'Food Court']
      }
    ],
    hyderabad: [
      {
        id: 'inorbit',
        name: 'Inorbit Mall',
        address: 'Madhapur, Hyderabad',
        stores: 200,
        rating: 4.5,
        palmPe: true,
        parking: { available: 400, total: 700 },
        hours: '10 AM - 10 PM',
        features: ['Multiplex', 'Food Court', 'Hypermarket']
      }
    ]
  };

  // Stores categories
  const categories = [
    { id: 'all', name: 'All', icon: '🏪' },
    { id: 'fashion', name: 'Fashion', icon: '👗' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'food', name: 'Food & Dining', icon: '🍔' },
    { id: 'beauty', name: 'Beauty', icon: '💄' },
    { id: 'sports', name: 'Sports', icon: '⚽' }
  ];

  // Featured stores
  const stores = [
    { id: 's1', name: 'Zara', category: 'fashion', floor: 'G', offer: '30% off', palmPe: true, rating: 4.5 },
    { id: 's2', name: 'Apple Store', category: 'electronics', floor: '1', offer: null, palmPe: true, rating: 4.8 },
    { id: 's3', name: 'Starbucks', category: 'food', floor: 'G', offer: 'Buy 1 Get 1', palmPe: true, rating: 4.4 },
    { id: 's4', name: 'Nike', category: 'sports', floor: '2', offer: '25% off', palmPe: true, rating: 4.6 },
    { id: 's5', name: 'Sephora', category: 'beauty', floor: '1', offer: 'Free Gift', palmPe: true, rating: 4.5 },
    { id: 's6', name: 'H&M', category: 'fashion', floor: 'G', offer: '40% off', palmPe: true, rating: 4.3 },
    { id: 's7', name: 'Samsung', category: 'electronics', floor: '1', offer: 'Exchange Bonus', palmPe: true, rating: 4.4 },
    { id: 's8', name: "McDonald's", category: 'food', floor: '3', offer: 'Meal Combo ₹199', palmPe: true, rating: 4.2 }
  ];

  // Active offers
  const offers = [
    { id: 'o1', store: 'Zara', title: 'End of Season Sale', discount: '30-50% Off', validTill: '31 Dec', type: 'sale' },
    { id: 'o2', store: 'Starbucks', title: 'Happy Hours', discount: 'Buy 1 Get 1 Free', validTill: '15 Dec', type: 'bogo' },
    { id: 'o3', store: 'Nike', title: 'Member Exclusive', discount: 'Extra 10% Off', validTill: '25 Dec', type: 'exclusive' },
    { id: 'o4', store: 'Apple', title: 'Cashback Offer', discount: '₹5000 Cashback', validTill: '20 Dec', type: 'cashback' },
    { id: 'o5', store: 'H&M', title: 'Flash Sale', discount: 'Flat 40% Off', validTill: '14 Dec', type: 'flash' }
  ];

  // Transactions
  const transactions = [
    { store: 'Zara', amount: 4500, points: 45, date: 'Today, 3:45 PM' },
    { store: 'Starbucks', amount: 650, points: 6, date: 'Today, 1:30 PM' },
    { store: 'Nike', amount: 8900, points: 89, date: 'Yesterday' }
  ];

  const currentMalls = selectedCity ? mallData[selectedCity.id] || [] : [];

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || store.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // CITY SELECTION SCREEN
  if (!selectedCity) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-5 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/20 rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Retail & Shopping</h1>
              <p className="text-sm text-orange-100">Phone-free payments at stores</p>
            </div>
          </div>
        </div>

        <div className="px-5 -mt-4">
          {/* PalmPe Benefits Banner */}
          <Card className="p-4 mb-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <PalmNFCIcon className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Shop Without Phone</h3>
                <p className="text-sm text-orange-100">Wave palm at checkout • Instant rewards • 5% cashback</p>
              </div>
            </div>
          </Card>

          {/* Active Cities */}
          <h2 className="text-lg font-bold text-gray-800 mb-3">Select Your City</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {cities.active.map((city, idx) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card 
                  className="p-4 cursor-pointer hover:shadow-lg hover:border-orange-400 transition-all"
                  onClick={() => setSelectedCity(city)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🛍️</span>
                    <div>
                      <h3 className="font-bold text-gray-800">{city.name}</h3>
                      <p className="text-xs text-gray-500">{city.state}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{city.malls} malls</span>
                    <span className="flex items-center gap-1 text-orange-600 font-semibold">
                      <PalmNFCIcon className="w-3 h-3" style={{ filter: 'brightness(0) saturate(100%) invert(52%) sepia(89%) saturate(1095%) hue-rotate(360deg)' }} />
                      {city.palmPeStores}+
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Upcoming Cities */}
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            Coming Soon
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Upcoming</span>
          </h2>
          <div className="space-y-2">
            {cities.upcoming.map((city) => (
              <Card key={city.id} className="p-3 bg-gray-50 border-dashed opacity-75">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-gray-400" />
                    <div>
                      <h3 className="font-semibold text-gray-600">{city.name}</h3>
                      <p className="text-xs text-gray-400">{city.state}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    {city.expected}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* How PalmPe Works */}
          <Card className="p-5 mt-6 bg-gradient-to-br from-gray-50 to-white">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <PalmNFCIcon className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(52%) sepia(89%) saturate(1095%) hue-rotate(360deg)' }} />
              How PalmPe Works at Stores
            </h3>
            <div className="space-y-3">
              {[
                { step: '1', title: 'Register Once', desc: 'Enroll palm at any PalmPe counter' },
                { step: '2', title: 'Wave & Pay', desc: 'No wallet, cards, or phone needed' },
                { step: '3', title: 'Instant Rewards', desc: 'Points credited automatically' }
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Register CTA */}
          <Button
            onClick={() => navigate('/device-locator', { state: { returnTo: '/use-cases/retail' } })}
            className="w-full mt-4 h-12 bg-gradient-to-r from-orange-500 to-amber-500"
          >
            <PalmNFCIcon className="w-5 h-5 mr-2" style={{ filter: 'brightness(0) invert(1)' }} />
            Register Palm for Shopping
          </Button>
        </div>
      </div>
    );
  }

  // MAIN RETAIL INTERFACE (after city selection)
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-5 pb-20">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setSelectedCity(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Retail & Shopping</h1>
            <p className="text-sm text-orange-100">{selectedCity.name} • {selectedCity.malls} Malls</p>
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs">
            <PalmNFCIcon className="w-3 h-3" style={{ filter: 'brightness(0) invert(1)' }} />
            {selectedCity.palmPeStores}+ stores
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/10 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'stores', label: 'Explore', icon: Store },
            { id: 'offers', label: 'Offers', icon: Tag },
            { id: 'loyalty', label: 'Rewards', icon: Gift },
            { id: 'parking', label: 'Parking', icon: Car }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-white text-orange-600' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-5 -mt-14">
        {/* STORES TAB */}
        {activeTab === 'stores' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Search */}
            <Card className="p-4 mb-4 shadow-lg">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search stores, brands..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </Card>

            {/* Featured Malls */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-3">Popular Malls</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {currentMalls.map(mall => (
                  <Card key={mall.id} className="flex-shrink-0 w-48 p-3 cursor-pointer hover:shadow-lg">
                    <div className="w-full h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl mb-2 flex items-center justify-center text-3xl">
                      🏬
                    </div>
                    <h4 className="font-semibold text-gray-800 text-sm truncate">{mall.name}</h4>
                    <p className="text-xs text-gray-500 mb-1">{mall.stores} stores</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-0.5 text-yellow-600">
                        <Star className="w-3 h-3 fill-yellow-400" />
                        {mall.rating}
                      </span>
                      {mall.palmPe && (
                        <span className="px-1.5 py-0.5 bg-green-100 text-green-600 rounded-full text-[10px] flex items-center gap-0.5">
                          <PalmNFCIcon className="w-2.5 h-2.5" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg)' }} />
                          PalmPe
                        </span>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Stores List */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Stores Near You</h3>
              {filteredStores.map((store, idx) => (
                <motion.div
                  key={store.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <HoverCard3D>
                    <Card className="p-4 cursor-pointer hover:shadow-xl transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
                          {store.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-800">{store.name}</h4>
                            {store.palmPe && (
                              <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <PalmNFCIcon className="w-3 h-3" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg)' }} />
                                PalmPe
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">Floor {store.floor} • {store.category}</p>
                          {store.offer && (
                            <span className="inline-block mt-1 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                              🔥 {store.offer}
                            </span>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </Card>
                  </HoverCard3D>
                </motion.div>
              ))}
            </div>

            {/* PalmPe CTA */}
            <Card className="p-4 mt-4 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <PalmNFCIcon className="w-6 h-6" style={{ filter: 'brightness(0) saturate(100%) invert(52%) sepia(89%) saturate(1095%) hue-rotate(360deg)' }} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Shop with PalmPe</p>
                  <p className="text-xs text-gray-600">Tap & pay, earn rewards instantly</p>
                </div>
                <Button
                  onClick={() => navigate('/device-locator', { state: { returnTo: '/use-cases/retail' } })}
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Enable
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* OFFERS TAB */}
        {activeTab === 'offers' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-4 mb-4 shadow-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input placeholder="Search offers..." className="pl-10" />
              </div>
            </Card>

            {/* Flash Deals Banner */}
            <Card className="p-4 mb-4 bg-gradient-to-r from-red-500 to-pink-500 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-red-100">⚡ Flash Deals</p>
                  <p className="text-xl font-bold">Up to 70% Off</p>
                  <p className="text-xs text-red-100">Ends in 2h 45m</p>
                </div>
                <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  View All
                </Button>
              </div>
            </Card>

            {/* Offers List */}
            <div className="space-y-3">
              {offers.map((offer, idx) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="p-4 cursor-pointer hover:shadow-lg transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                        offer.type === 'sale' ? 'bg-red-100' :
                        offer.type === 'bogo' ? 'bg-green-100' :
                        offer.type === 'exclusive' ? 'bg-purple-100' :
                        offer.type === 'cashback' ? 'bg-blue-100' : 'bg-yellow-100'
                      }`}>
                        {offer.type === 'sale' ? '🏷️' :
                         offer.type === 'bogo' ? '🎁' :
                         offer.type === 'exclusive' ? '⭐' :
                         offer.type === 'cashback' ? '💰' : '⚡'}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">{offer.store}</p>
                        <h4 className="font-semibold text-gray-800">{offer.title}</h4>
                        <p className="text-sm font-bold text-orange-600">{offer.discount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Valid till</p>
                        <p className="text-xs font-semibold text-gray-800">{offer.validTill}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* LOYALTY TAB */}
        {activeTab === 'loyalty' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Points Card */}
            <Card className="p-5 mb-4 shadow-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-amber-100">Your Reward Points</p>
                  <p className="text-4xl font-bold">{loyaltyData.points.toLocaleString()}</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                  🏆
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-amber-100">{loyaltyData.tier} Member</span>
                  <span className="text-sm text-amber-100">{loyaltyData.pointsToNext} pts to {loyaltyData.nextTier}</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full">
                  <div className="h-full bg-white rounded-full" style={{ width: '82%' }} />
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Card className="p-4 text-center cursor-pointer hover:shadow-lg">
                <Gift className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-800">Redeem</p>
                <p className="text-xs text-gray-500">Use your points</p>
              </Card>
              <Card className="p-4 text-center cursor-pointer hover:shadow-lg">
                <Ticket className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-800">My Vouchers</p>
                <p className="text-xs text-gray-500">3 available</p>
              </Card>
            </div>

            {/* Stats */}
            <Card className="p-5 mb-4 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Your Shopping Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-green-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-green-600">₹{loyaltyData.totalSaved.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Total Saved</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-blue-600">42</p>
                  <p className="text-xs text-gray-600">Transactions</p>
                </div>
              </div>
            </Card>

            {/* Recent Transactions */}
            <Card className="p-5 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Points History</h3>
              <div className="space-y-3">
                {transactions.map((txn, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium text-gray-800">{txn.store}</p>
                      <p className="text-xs text-gray-500">{txn.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">₹{txn.amount}</p>
                      <p className="text-xs text-green-600">+{txn.points} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* PARKING TAB */}
        {activeTab === 'parking' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Active Parking */}
            <Card className="p-5 mb-4 shadow-lg bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-blue-100">Currently Parked</p>
                  <p className="text-3xl font-bold">{currentMalls[0]?.name || 'No Active'}</p>
                  <p className="text-sm text-blue-100">Level B1 • Slot 142</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-100">Duration</p>
                  <p className="text-2xl font-bold">2h 15m</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-white/20 border-white/30 text-white hover:bg-white/30">
                  <Navigation className="w-4 h-4 mr-1" />
                  Find Car
                </Button>
                <Button variant="outline" className="flex-1 bg-white/20 border-white/30 text-white hover:bg-white/30">
                  <CreditCard className="w-4 h-4 mr-1" />
                  Pay Exit
                </Button>
              </div>
            </Card>

            {/* Parking Rates */}
            <Card className="p-5 mb-4 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Parking Rates</h3>
              <div className="space-y-3">
                {[
                  { duration: 'First 2 hours', rate: 'Free with any purchase' },
                  { duration: '2-4 hours', rate: '₹40' },
                  { duration: '4-6 hours', rate: '₹80' },
                  { duration: 'Each additional hour', rate: '₹30' }
                ].map((rate, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-gray-600">{rate.duration}</span>
                    <span className="font-semibold text-gray-800">{rate.rate}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Mall Parking Availability */}
            <Card className="p-5 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Parking Availability</h3>
              <div className="space-y-3">
                {currentMalls.slice(0, 3).map(mall => (
                  <div key={mall.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-800">{mall.name}</p>
                      <p className="text-xs text-gray-500">{mall.address}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        mall.parking.available > 200 ? 'text-green-600' :
                        mall.parking.available > 100 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {mall.parking.available}
                      </p>
                      <p className="text-xs text-gray-500">of {mall.parking.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Retail;
