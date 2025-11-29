import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { WalletProvider } from "./contexts/WalletContext";
import Onboarding from "./pages/Onboarding";
import PalmRegister from "./pages/PalmRegister";
import PalmHome from "./pages/PalmHome";
import PremiumHome from "./pages/PremiumHome";
import Services from "./pages/Services";
import PremiumServices from "./pages/PremiumServices";
import Palm2QR from "./pages/Palm2QR";
import POSMode from "./pages/POSMode";
import PalmTransfer from "./pages/PalmTransfer";
import PalmHistory from "./pages/PalmHistory";
import PalmProfile from "./pages/PalmProfile";
import DeviceLocator from "./pages/DeviceLocator";
import DeviceEnrollment from "./pages/DeviceEnrollment";
import ReceiptViewer from "./pages/ReceiptViewer";
import QuickWallet from "./pages/QuickWallet";
import SecurityCenter from "./pages/SecurityCenter";
import Rewards from "./pages/Rewards";
import Support from "./pages/Support";
import DeviceCenter from "./pages/DeviceCenter";
import LimitSettings from "./pages/LimitSettings";
import DigitalWallet from "./pages/DigitalWallet";
import CollectRequest from "./pages/CollectRequest";
import CirclePay from "./pages/CirclePay";
import ReferralProgram from "./pages/ReferralProgram";
import DisputeCenter from "./pages/DisputeCenter";
import SendMoney from "./pages/SendMoney";
import LanguageSelector from "./pages/LanguageSelector";
import OfflineQueue from "./pages/OfflineQueue";
import AutoPay from "./pages/AutoPay";
import CashbackRewards from "./pages/CashbackRewards";
import AllServices from "./pages/AllServices";
import WalletManagement from "./pages/WalletManagement";
import AnimatedHome from "./pages/AnimatedHome";
import AdminDashboard from "./admin/pages/AdminDashboard";
import UserManagement from "./admin/pages/UserManagement";
import DeviceManagement from "./admin/pages/DeviceManagement";
import { Toaster } from "./components/ui/toaster";
import { Home as HomeIcon, Grid3x3, ArrowLeftRight, Clock, User } from "lucide-react";

// Service pages - Top 8 Priority
import MobileRecharge from "./pages/services/MobileRecharge";
import ElectricityBill from "./pages/services/ElectricityBill";
import DTHRecharge from "./pages/services/DTHRecharge";
import BroadbandBill from "./pages/services/BroadbandBill";
import GasBill from "./pages/services/GasBill";
import WaterBill from "./pages/services/WaterBill";
import FASTagRecharge from "./pages/services/FASTagRecharge";
import Insurance from "./pages/services/Insurance";

// Service pages - Travel
import FlightBooking from "./pages/services/FlightBooking";
import HotelBooking from "./pages/services/HotelBooking";
import ComingSoon from "./pages/services/ComingSoon";

// Service pages - Additional
import DataCard from "./pages/services/DataCard";
import LandlineBill from "./pages/services/LandlineBill";
import HousingSociety from "./pages/services/HousingSociety";
import CableTVBill from "./pages/services/CableTVBill";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navigation on certain pages
  const hideNavPages = ['/', '/onboarding', '/palm-register', '/palm2qr', '/pos-mode', '/device-locator', '/device-enrollment'];
  if (hideNavPages.includes(location.pathname) || location.pathname.startsWith('/receipt/')) {
    return null;
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon, path: '/home' },
    { id: 'services', label: 'Services', icon: Grid3x3, path: '/services' },
    { id: 'transfer', label: 'Transfer', icon: ArrowLeftRight, path: '/transfer' },
    { id: 'history', label: 'History', icon: Clock, path: '/history' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                isActive ? 'text-[#586BFF]' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <WalletProvider>
        <BrowserRouter>
          <div className="App">
          <div className="max-w-md mx-auto bg-white min-h-screen relative">
            <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/palm-register" element={<PalmRegister />} />
            <Route path="/home" element={<AnimatedHome />} />
            <Route path="/home-old" element={<PremiumHome />} />
            <Route path="/services" element={<PremiumServices />} />
            <Route path="/palm2qr" element={<Palm2QR />} />
            <Route path="/pos-mode" element={<POSMode />} />
            <Route path="/transfer" element={<PalmTransfer />} />
            <Route path="/history" element={<PalmHistory />} />
            <Route path="/profile" element={<PalmProfile />} />
            <Route path="/device-locator" element={<DeviceLocator />} />
            <Route path="/device-enrollment" element={<DeviceEnrollment />} />
            <Route path="/receipt/:receiptId" element={<ReceiptViewer />} />
            <Route path="/quick-wallet" element={<QuickWallet />} />
            <Route path="/security-center" element={<SecurityCenter />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/support" element={<Support />} />
            <Route path="/device-center" element={<DeviceCenter />} />
            <Route path="/limit-settings" element={<LimitSettings />} />
            <Route path="/wallet" element={<DigitalWallet />} />
            <Route path="/collect" element={<CollectRequest />} />
            <Route path="/circlepay" element={<CirclePay />} />
            <Route path="/referral" element={<ReferralProgram />} />
            <Route path="/dispute" element={<DisputeCenter />} />
            <Route path="/send" element={<SendMoney />} />
            <Route path="/transfer" element={<SendMoney />} />
            <Route path="/language" element={<LanguageSelector />} />
            <Route path="/offline-queue" element={<OfflineQueue />} />
            <Route path="/autopay" element={<AutoPay />} />
            <Route path="/cashback" element={<CashbackRewards />} />
            <Route path="/all-services" element={<AllServices />} />
            
            {/* Service Routes - Top 8 Priority */}
            <Route path="/service/mobile" element={<MobileRecharge />} />
            <Route path="/services/mobile-recharge" element={<MobileRecharge />} />
            <Route path="/service/electricity" element={<ElectricityBill />} />
            <Route path="/services/electricity" element={<ElectricityBill />} />
            <Route path="/service/dth" element={<DTHRecharge />} />
            <Route path="/services/dth" element={<DTHRecharge />} />
            <Route path="/service/broadband" element={<BroadbandBill />} />
            <Route path="/services/broadband" element={<BroadbandBill />} />
            <Route path="/service/gas" element={<GasBill />} />
            <Route path="/services/gas" element={<GasBill />} />
            <Route path="/service/piped-gas" element={<GasBill />} />
            <Route path="/service/water" element={<WaterBill />} />
            <Route path="/services/water" element={<WaterBill />} />
            <Route path="/service/fastag" element={<FASTagRecharge />} />
            <Route path="/services/fastag" element={<FASTagRecharge />} />
            <Route path="/service/insurance" element={<Insurance />} />
            <Route path="/services/insurance" element={<Insurance />} />
            
            {/* Service Routes - Travel */}
            <Route path="/service/flights" element={<FlightBooking />} />
            <Route path="/services/flights" element={<FlightBooking />} />
            <Route path="/service/hotels" element={<HotelBooking />} />
            <Route path="/services/hotels" element={<HotelBooking />} />
            <Route path="/service/trains" element={<ComingSoon />} />
            <Route path="/service/bus" element={<ComingSoon />} />
            <Route path="/service/cab" element={<ComingSoon />} />
            
            {/* Service Routes - Additional Services */}
            <Route path="/service/datacard" element={<DataCard />} />
            <Route path="/services/datacard" element={<DataCard />} />
            <Route path="/service/landline" element={<LandlineBill />} />
            <Route path="/services/landline" element={<LandlineBill />} />
            <Route path="/service/housing" element={<HousingSociety />} />
            <Route path="/services/housing" element={<HousingSociety />} />
            <Route path="/service/cable" element={<CableTVBill />} />
            <Route path="/services/cable-tv" element={<CableTVBill />} />
            
            {/* Service Routes - Coming Soon */}
            <Route path="/service/mutual" element={<ComingSoon />} />
            <Route path="/services/mutual-funds" element={<ComingSoon />} />
            <Route path="/service/gold" element={<ComingSoon />} />
            <Route path="/services/digital-gold" element={<ComingSoon />} />
            <Route path="/service/loan" element={<ComingSoon />} />
            <Route path="/services/loans" element={<ComingSoon />} />
            <Route path="/services/loan-repayment" element={<ComingSoon />} />
            <Route path="/service/education" element={<ComingSoon />} />
            <Route path="/services/education" element={<ComingSoon />} />
            <Route path="/service/health" element={<ComingSoon />} />
            <Route path="/services/postpaid" element={<ComingSoon />} />
            <Route path="/services/municipal" element={<ComingSoon />} />
            <Route path="/services/rental" element={<ComingSoon />} />
            <Route path="/services/clubs" element={<ComingSoon />} />
            <Route path="/services/metro" element={<ComingSoon />} />
            <Route path="/services/lic" element={<ComingSoon />} />
            <Route path="/services/donation" element={<ComingSoon />} />
            <Route path="/services/echallan" element={<ComingSoon />} />
            <Route path="/services/cylinder" element={<ComingSoon />} />
            <Route path="/digital-wallet" element={<DigitalWallet />} />
            <Route path="/wallet" element={<WalletManagement />} />
            <Route path="/quickwallet" element={<QuickWallet />} />
            <Route path="/scan" element={<Palm2QR />} />
            <Route path="/cashback-rewards" element={<CashbackRewards />} />
            <Route path="/add-money" element={<QuickWallet />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/devices" element={<DeviceManagement />} />
            </Routes>
            <BottomNavigation />
          </div>
          <Toaster />
          </div>
        </BrowserRouter>
      </WalletProvider>
    </LanguageProvider>
  );
}

export default App;
