// Mock data for PalmPay - Complete UPI Wallet with Palm Biometric

export const mockUser = {
  id: 'user-123',
  name: 'Arjun Mehta',
  phone: '+91 98765 43210',
  email: 'arjun@example.com',
  upiId: 'arjun@palmpay',
  palmId: 'palm-0xabc123',
  palmEnabled: false, // Toggle to false to see unregistered state
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
    emoji: '💳',
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
    emoji: '💰',
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
    emoji: '🏦',
    isDefault: false,
    isSandbox: true,
    badge: 'SANDBOX',
    features: ['Top-up (KYC)', 'Pay Online', 'Pay Offline', 'Refund'],
    issuer: 'Reserve Bank of India',
    offlineLimit: 1000
  }
];

export const mockNotifications = [
  {
    id: 'notif-1',
    type: 'login',
    title: 'Successful Login',
    message: 'You logged in from a new device - iPhone 15',
    time: '5 min ago',
    unread: true,
    color: '#10B981'
  },
  {
    id: 'notif-2',
    type: 'sent',
    title: 'Payment Sent',
    message: 'Money sent to Priya Sharma via UPI',
    amount: '500',
    time: '1 hour ago',
    unread: true,
    color: '#F59E0B'
  },
  {
    id: 'notif-3',
    type: 'received',
    title: 'Payment Received',
    message: 'Received from Rohit Kumar',
    amount: '1,200',
    time: '3 hours ago',
    unread: true,
    color: '#10B981'
  },
  {
    id: 'notif-4',
    type: 'bill',
    title: 'Electricity Bill Paid',
    message: 'BESCOM bill payment successful - Consumer ID: 12345',
    amount: '1,450',
    time: '5 hours ago',
    unread: false,
    color: '#3B82F6'
  },
  {
    id: 'notif-5',
    type: 'recharge',
    title: 'Mobile Recharge',
    message: 'Airtel prepaid recharge completed for 9876543210',
    amount: '299',
    time: '1 day ago',
    unread: false,
    color: '#8B5CF6'
  }
];

export const mockTransactions = [
  {
    id: 'txn-001',
    type: 'sent',
    recipient: 'Priya Sharma',
    amount: 500,
    date: '2025-01-29',
    time: '10:30 AM',
    status: 'success',
    method: 'UPI',
    category: 'transfer'
  },
  {
    id: 'txn-002',
    type: 'received',
    recipient: 'Rohit Kumar',
    amount: 1200,
    date: '2025-01-29',
    time: '09:15 AM',
    status: 'success',
    method: 'UPI',
    category: 'transfer'
  },
  {
    id: 'txn-003',
    type: 'bill',
    recipient: 'BESCOM',
    amount: 1450,
    date: '2025-01-28',
    time: '08:00 PM',
    status: 'success',
    method: 'UPI',
    category: 'electricity'
  },
  {
    id: 'txn-004',
    type: 'recharge',
    recipient: 'Airtel Prepaid',
    amount: 299,
    date: '2025-01-28',
    time: '02:30 PM',
    status: 'success',
    method: 'UPI',
    category: 'mobile'
  },
  {
    id: 'txn-005',
    type: 'sent',
    recipient: 'Amit Singh',
    amount: 750,
    date: '2025-01-27',
    time: '06:45 PM',
    status: 'success',
    method: 'e-Money',
    category: 'transfer'
  },
];

export const mockLinkedBanks = [
  {
    id: 'bank-1',
    name: 'HDFC Bank',
    accountNumber: '**** **** 1234',
    ifsc: 'HDFC0001234',
    linked: true,
    primary: true,
    type: 'Savings Account'
  },
  {
    id: 'bank-2',
    name: 'ICICI Bank',
    accountNumber: '**** **** 5678',
    ifsc: 'ICIC0005678',
    linked: true,
    primary: false,
    type: 'Current Account'
  },
];

export const mockDevices = [
  {
    id: 'device-001',
    name: 'PalmPe Device - MG Road',
    location: '123 MG Road, Bangalore, Karnataka 560001',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    status: 'online',
    merchant: 'Cafe Coffee Day',
    lastActive: '2 mins ago',
    scansToday: 142,
    distance: '0.5 km'
  },
  {
    id: 'device-002',
    name: 'PalmPe Device - Phoenix Mall',
    location: 'Phoenix Marketcity Mall, Whitefield, Bangalore 560066',
    coordinates: { lat: 12.9975, lng: 77.6969 },
    status: 'online',
    merchant: 'Lifestyle Store',
    lastActive: '5 mins ago',
    scansToday: 98,
    distance: '3.2 km'
  },
  {
    id: 'device-003',
    name: 'PalmPe Device - Indiranagar',
    location: '100 Feet Road, Indiranagar, Bangalore 560038',
    coordinates: { lat: 12.9784, lng: 77.6408 },
    status: 'offline',
    merchant: 'Barbeque Nation',
    lastActive: '1 hour ago',
    scansToday: 67,
    distance: '2.8 km'
  },
];

export const mockContacts = [
  {
    id: 'contact-1',
    name: 'Priya Sharma',
    phone: '+91 98765 43211',
    upiId: 'priya@okaxis',
    palmId: 'palm-0xdef456',
    avatar: null,
    lastTransactionDate: '2025-01-29',
    frequentContact: true
  },
  {
    id: 'contact-2',
    name: 'Rohit Kumar',
    phone: '+91 98765 43212',
    upiId: 'rohit@paytm',
    palmId: 'palm-0xabc789',
    avatar: null,
    lastTransactionDate: '2025-01-29',
    frequentContact: true
  },
  {
    id: 'contact-3',
    name: 'Amit Singh',
    phone: '+91 98765 43213',
    upiId: 'amit@ybl',
    palmId: null,
    avatar: null,
    lastTransactionDate: '2025-01-27',
    frequentContact: true
  },
  {
    id: 'contact-4',
    name: 'Neha Patel',
    phone: '+91 98765 43214',
    upiId: 'neha@paytm',
    palmId: 'palm-0xghi012',
    avatar: null,
    lastTransactionDate: '2025-01-26',
    frequentContact: false
  },
  {
    id: 'contact-5',
    name: 'Rahul Verma',
    phone: '+91 98765 43215',
    upiId: 'rahul@icici',
    palmId: null,
    avatar: null,
    lastTransactionDate: '2025-01-25',
    frequentContact: false
  },
];

export const mockBanks = mockLinkedBanks; // Alias for compatibility

export const mockReceipts = [
  {
    id: 'receipt-001',
    transactionId: 'txn-001',
    type: 'sent',
    recipient: 'Priya Sharma',
    amount: 500,
    date: '2025-01-29',
    time: '10:30 AM',
    status: 'success',
    method: 'UPI',
    category: 'transfer',
    upiId: 'priya@okaxis',
    referenceNumber: 'REF1234567890',
    description: 'Payment to Priya'
  },
  {
    id: 'receipt-002',
    transactionId: 'txn-002',
    type: 'received',
    recipient: 'Rohit Kumar',
    amount: 1200,
    date: '2025-01-29',
    time: '09:15 AM',
    status: 'success',
    method: 'UPI',
    category: 'transfer',
    upiId: 'rohit@paytm',
    referenceNumber: 'REF0987654321',
    description: 'Payment from Rohit'
  },
];

export const services = [
  {
    id: 'mobile-recharge',
    name: 'Mobile Recharge',
    icon: '📱',
    category: 'Recharge',
    color: '#3B82F6',
    path: '/services/mobile-recharge'
  },
  {
    id: 'electricity',
    name: 'Electricity Bill',
    icon: '⚡',
    category: 'Bills',
    color: '#F59E0B',
    path: '/services/electricity'
  },
  {
    id: 'dth',
    name: 'DTH Recharge',
    icon: '📺',
    category: 'Recharge',
    color: '#8B5CF6',
    path: '/services/dth'
  },
  {
    id: 'broadband',
    name: 'Broadband Bill',
    icon: '🌐',
    category: 'Bills',
    color: '#10B981',
    path: '/services/broadband'
  },
  {
    id: 'gas',
    name: 'Gas Bill',
    icon: '🔥',
    category: 'Bills',
    color: '#EF4444',
    path: '/services/gas'
  },
  {
    id: 'water',
    name: 'Water Bill',
    icon: '💧',
    category: 'Bills',
    color: '#06B6D4',
    path: '/services/water'
  },
];
