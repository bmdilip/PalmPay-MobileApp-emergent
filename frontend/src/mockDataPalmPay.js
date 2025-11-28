// Mock data for PalmPay - Complete UPI Wallet with Palm Biometric

export const mockUser = {
  id: 'user-123',
  name: 'Arjun Mehta',
  phone: '+91 98765 43210',
  email: 'arjun@example.com',
  upiId: 'arjun@palmpay',
  palmId: 'palm-0xabc123',
  palmEnabled: true,
  walletBalance: 12450.75, // UPI Wallet
  eMoneyBalance: 5000.00, // e-Money Wallet
  cbdcBalance: 2500.00, // CBDC Wallet (sandbox)
  totalBalance: 19950.75, // Combined total
  kycStatus: 'verified',
  secureElementStatus: 'active',
  profilePic: null,
  registeredDate: '2025-01-15',
  linkedDeviceId: 'device-001',
  deviceRegistrationDate: '2025-01-20',
  lastDeviceUsed: '2h ago'
};

export const mockWallets = [
  {
    id: 'upi-wallet',
    type: 'upi',
    name: 'UPI Wallet',
    balance: 12450.75,
    currency: 'INR',
    icon: '💳',
    isDefault: true,
    features: ['Send', 'Receive', 'Pay Bills', 'Recharge', 'Offline'],
    offlineLimit: 5000
  },
  {
    id: 'emoney-wallet',
    type: 'e-money',
    name: 'e-Money Wallet',
    balance: 5000.00,
    currency: 'INR',
    icon: '💰',
    isDefault: false,
    features: ['Top-up', 'Pay', 'Withdraw', 'Offline'],
    issuer: 'PalmPay Trust',
    offlineLimit: 2000,
    canWithdraw: true
  },
  {
    id: 'cbdc-wallet',
    type: 'cbdc',
    name: 'CBDC Wallet',
    balance: 2500.00,
    currency: 'INR',
    icon: '🏛️',
    isDefault: false,
    isSandbox: true,
    badge: 'SANDBOX',
    features: ['Top-up (KYC)', 'Pay Online', 'Pay Offline', 'Refund'],
    issuer: 'Reserve Bank of India',
    offlineLimit: 1000,
    requiresKYC: true
  }
];

export const mockBanks = [
  { id: '1', name: 'HDFC Bank', accountNumber: '****1234', ifsc: 'HDFC0001234', isPrimary: true, balance: 45000 },
  { id: '2', name: 'ICICI Bank', accountNumber: '****5678', ifsc: 'ICIC0005678', isPrimary: false, balance: 23500 },
  { id: '3', name: 'State Bank of India', accountNumber: '****9012', ifsc: 'SBIN0001234', isPrimary: false, balance: 67800 },
];

export const mockContacts = [
  { id: '1', name: 'Priya Sharma', phone: '+91 98765 11111', upiId: 'priya@palmpay', hasPalmId: true, avatar: 'P' },
  { id: '2', name: 'Ravi Kumar', phone: '+91 98765 22222', upiId: 'ravi@paytm', hasPalmId: false, avatar: 'R' },
  { id: '3', name: 'Neha Gupta', phone: '+91 98765 33333', upiId: 'neha@palmpay', hasPalmId: true, avatar: 'N' },
  { id: '4', name: 'Amit Singh', phone: '+91 98765 44444', upiId: 'amit@oksbi', hasPalmId: false, avatar: 'A' },
  { id: '5', name: 'Anjali Reddy', phone: '+91 98765 55555', upiId: 'anjali@palmpay', hasPalmId: true, avatar: 'A' },
];

export const mockTransactions = [
  {
    id: 'txn1',
    type: 'sent',
    amount: 850,
    recipient: 'Priya Sharma',
    upiId: 'priya@palmpay',
    date: '2025-01-28',
    time: '15:30',
    status: 'success',
    category: 'palm2qr',
    method: 'Palm Biometric',
    location: 'Cafe Coffee Day, Bangalore',
    receiptId: 'rcpt-001',
    tripleHash: '0xabcdef123456789...',
    deviceSignature: '0x9876543210fedcba...'
  },
  {
    id: 'txn2',
    type: 'received',
    amount: 2500,
    recipient: 'Ravi Kumar',
    upiId: 'ravi@paytm',
    date: '2025-01-28',
    time: '11:15',
    status: 'success',
    category: 'upi',
    method: 'UPI',
    receiptId: 'rcpt-002'
  },
  {
    id: 'txn3',
    type: 'sent',
    amount: 350,
    recipient: 'PalmPe POS - Retail Store',
    upiId: 'merchant@palmpay',
    date: '2025-01-27',
    time: '18:45',
    status: 'success',
    category: 'pos',
    method: 'Palm Biometric (Phone-less)',
    location: 'BigBazaar, Mumbai',
    receiptId: 'rcpt-003',
    tripleHash: '0x123abc456def789...',
    deviceSignature: '0xfedcba9876543210...'
  },
  {
    id: 'txn4',
    type: 'sent',
    amount: 1200,
    recipient: 'Electricity Bill - BESCOM',
    upiId: 'bescom@bill',
    date: '2025-01-26',
    time: '09:20',
    status: 'success',
    category: 'billpay',
    method: 'UPI',
    receiptId: 'rcpt-004'
  },
  {
    id: 'txn5',
    type: 'received',
    amount: 5000,
    recipient: 'Neha Gupta',
    upiId: 'neha@palmpay',
    date: '2025-01-25',
    time: '16:00',
    status: 'success',
    category: 'upi',
    method: 'Palm Biometric',
    receiptId: 'rcpt-005',
    tripleHash: '0xaaa111bbb222ccc...',
    deviceSignature: '0x333ddd444eee555...'
  },
  {
    id: 'txn6',
    type: 'sent',
    amount: 499,
    recipient: 'Amazon India',
    upiId: 'amazon@icici',
    date: '2025-01-24',
    time: '12:30',
    status: 'success',
    category: 'shopping',
    method: 'Palm2QR',
    receiptId: 'rcpt-006'
  },
];

export const mockDevices = [
  {
    id: 'device-001',
    name: 'PalmPe Terminal - MG Road',
    address: 'MG Road Metro Station, Bangalore',
    lat: 12.9716,
    lng: 77.5946,
    status: 'active',
    distance: '0.5 km',
    type: 'registration',
    availability: 'Walk-in available'
  },
  {
    id: 'device-002',
    name: 'PalmPe Kiosk - Indiranagar',
    address: '100 Feet Road, Indiranagar, Bangalore',
    lat: 12.9784,
    lng: 77.6408,
    status: 'active',
    distance: '2.3 km',
    type: 'registration',
    availability: 'Appointment only'
  },
  {
    id: 'device-003',
    name: 'PalmPe - Koramangala',
    address: '5th Block, Koramangala, Bangalore',
    lat: 12.9352,
    lng: 77.6245,
    status: 'active',
    distance: '3.8 km',
    type: 'payment',
    availability: 'Walk-in available'
  },
  {
    id: 'device-004',
    name: 'PalmPe Terminal - Whitefield',
    address: 'Phoenix Marketcity, Whitefield, Bangalore',
    lat: 12.9975,
    lng: 77.6969,
    status: 'maintenance',
    distance: '8.1 km',
    type: 'registration',
    availability: 'Under maintenance'
  },
];

export const mockReceipts = [
  {
    id: 'rcpt-001',
    txId: 'txn1',
    merchantName: 'Cafe Coffee Day',
    merchantId: 'merchant-555',
    amount: 850,
    currency: 'INR',
    timestamp: '2025-01-28T15:30:00Z',
    status: 'authorized',
    deviceId: 'device-987',
    userId: 'user-123',
    tripleHash: '0xabcdef123456789abcdef123456789abcdef123456789abcdef123456789abc',
    deviceSignature: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedc',
    signedBlob: 'base64_encoded_signed_data_here...',
    verificationStatus: 'verified',
    bankLastFour: '1234',
    location: 'Cafe Coffee Day, Bangalore',
    receiptUrl: null
  },
  {
    id: 'rcpt-003',
    txId: 'txn3',
    merchantName: 'BigBazaar',
    merchantId: 'merchant-789',
    amount: 350,
    currency: 'INR',
    timestamp: '2025-01-27T18:45:00Z',
    status: 'authorized',
    deviceId: 'device-987',
    userId: 'user-123',
    tripleHash: '0x123abc456def789123abc456def789123abc456def789123abc456def78912',
    deviceSignature: '0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba987654321',
    signedBlob: 'base64_encoded_signed_data_here...',
    verificationStatus: 'verified',
    bankLastFour: '1234',
    location: 'BigBazaar, Mumbai',
    receiptUrl: null
  },
];

export const services = [
  { id: 'recharge', label: 'Mobile Recharge', icon: 'Smartphone', color: '#64E8FF', route: '/recharge' },
  { id: 'electricity', label: 'Electricity', icon: 'Zap', color: '#586BFF', route: '/bills/electricity' },
  { id: 'gas', label: 'Gas', icon: 'Flame', color: '#9B62FF', route: '/bills/gas' },
  { id: 'dth', label: 'DTH', icon: 'Tv', color: '#64E8FF', route: '/recharge/dth' },
  { id: 'fastag', label: 'FASTag', icon: 'Car', color: '#586BFF', route: '/fastag' },
  { id: 'flights', label: 'Flights', icon: 'Plane', color: '#9B62FF', route: '/travel/flights' },
  { id: 'hotels', label: 'Hotels', icon: 'Hotel', color: '#64E8FF', route: '/travel/hotels' },
  { id: 'broadband', label: 'Broadband', icon: 'Wifi', color: '#586BFF', route: '/bills/broadband' },
  { id: 'education', label: 'Education', icon: 'GraduationCap', color: '#9B62FF', route: '/education' },
  { id: 'water', label: 'Water', icon: 'Droplet', color: '#64E8FF', route: '/bills/water' },
  { id: 'subscriptions', label: 'Subscriptions', icon: 'Repeat', color: '#586BFF', route: '/subscriptions' },
  { id: 'wallet', label: 'Wallet Recharge', icon: 'Wallet', color: '#9B62FF', route: '/wallet' },
];

export const mockMandates = [
  {
    id: 'mandate-001',
    merchantName: 'Netflix',
    amount: 649,
    frequency: 'monthly',
    nextPayment: '2025-02-01',
    status: 'active',
    startDate: '2024-06-01'
  },
  {
    id: 'mandate-002',
    merchantName: 'Spotify Premium',
    amount: 119,
    frequency: 'monthly',
    nextPayment: '2025-02-05',
    status: 'active',
    startDate: '2024-08-05'
  },
];