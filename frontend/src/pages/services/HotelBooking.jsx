import React, { useState } from 'react';
import { Hotel, ChevronRight, MapPin, Star } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import ServiceLayout from '../../components/ServiceLayout';
import ServiceReceipt from '../../components/ServiceReceipt';
import { LoadingSpinner } from '../../components/StateComponents';

const HotelBooking = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hotels, setHotels] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [receiptData, setReceiptData] = useState(null);

  const [searchData, setSearchData] = useState({
    city: '',
    checkin: '',
    checkout: '',
    guests: '2'
  });

  const [guestData, setGuestData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSearch = async () => {
    if (!searchData.city || !searchData.checkin || !searchData.checkout) {
      setError('Please fill all fields');
      return;
    }
    
    const checkinDate = new Date(searchData.checkin);
    const checkoutDate = new Date(searchData.checkout);
    if (checkoutDate <= checkinDate) {
      setError('Checkout date must be after check-in date');
      return;
    }
    
    setError(null);
    setLoading(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/travel/hotels/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: searchData.city,
          checkin: searchData.checkin,
          checkout: searchData.checkout,
          guests: parseInt(searchData.guests)
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }
      
      const hotelsData = await response.json();
      
      // Transform API response to match component expectations
      const transformedHotels = hotelsData.map(hotel => ({
        id: hotel.id,
        name: hotel.name,
        rating: hotel.rating,
        price: hotel.price,
        amenities: hotel.amenities,
        image: '🏨'
      }));
      
      setHotels(transformedHotels);
      setStep(2);
    } catch (err) {
      setError('Failed to search hotels. Please try again.');
      console.error('Hotel search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    setStep(3);
  };

  const handleBooking = async () => {
    if (!guestData.name || !guestData.email || !guestData.phone) {
      setError('Please fill all guest details');
      return;
    }
    if (!/^\d{10}$/.test(guestData.phone)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError(null);
    setLoading(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/travel/hotels/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hotel_id: selectedHotel.id,
          guest_name: guestData.name,
          guest_email: guestData.email,
          guest_phone: guestData.phone,
          checkin: searchData.checkin,
          checkout: searchData.checkout,
          guests: parseInt(searchData.guests)
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to book hotel');
      }
      
      const booking = await response.json();
      const nights = booking.details.nights;
      
      const receipt = {
        transactionId: booking.booking_id,
        date: new Date().toLocaleDateString('en-IN'),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        amount: booking.amount,
        serviceName: 'Hotel Booking',
        details: [
          { label: 'Guest Name', value: guestData.name },
          { label: 'Hotel', value: selectedHotel.name },
          { label: 'City', value: searchData.city },
          { label: 'Check-in', value: searchData.checkin },
          { label: 'Check-out', value: searchData.checkout },
          { label: 'Nights', value: `${nights} night(s)` },
          { label: 'Guests', value: searchData.guests }
        ]
      };
      setReceiptData(receipt);
      setStep(4);
    } catch (err) {
      setError('Failed to book hotel. Please try again.');
      console.error('Hotel booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (step === 4 && receiptData) {
    return <ServiceReceipt {...receiptData} />;
  }

  return (
    <ServiceLayout
      title="Hotel Booking"
      subtitle="Book hotels across India"
      icon={Hotel}
      iconColor="#8B5CF6"
      headerGradient="from-[#8B5CF6] via-[#A78BFA] to-[#C4B5FD]"
    >
      {step === 1 && !loading && (
        <Card className="p-5 space-y-5">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              type="text"
              placeholder="Enter city name"
              value={searchData.city}
              onChange={(e) => setSearchData({ ...searchData, city: e.target.value })}
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="checkin">Check-in</Label>
              <Input
                id="checkin"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={searchData.checkin}
                onChange={(e) => setSearchData({ ...searchData, checkin: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="checkout">Check-out</Label>
              <Input
                id="checkout"
                type="date"
                min={searchData.checkin || new Date().toISOString().split('T')[0]}
                value={searchData.checkout}
                onChange={(e) => setSearchData({ ...searchData, checkout: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label>Guests</Label>
            <select
              value={searchData.guests}
              onChange={(e) => setSearchData({ ...searchData, guests: e.target.value })}
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <Button onClick={handleSearch} className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] h-12">
            Search Hotels
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>
      )}

      {loading && step === 1 && <LoadingSpinner message="Searching hotels..." />}

      {step === 2 && hotels && (
        <div className="space-y-4">
          <Card className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
            <p className="font-semibold text-gray-800">{searchData.city}</p>
            <p className="text-sm text-gray-600">{searchData.checkin} to {searchData.checkout}</p>
          </Card>

          {hotels.map((hotel) => (
            <Card
              key={hotel.id}
              className="p-4 cursor-pointer transition-all hover:shadow-lg"
              onClick={() => handleHotelSelect(hotel)}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{hotel.image}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-800">{hotel.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">{hotel.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {hotel.amenities.map((amenity, idx) => (
                      <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-[#8B5CF6]">₹{hotel.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">per night</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </Card>
          ))}

          <Button onClick={() => setStep(1)} variant="outline" className="w-full">
            Modify Search
          </Button>
        </div>
      )}

      {step === 3 && selectedHotel && !loading && (
        <div className="space-y-4">
          <Card className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800">{selectedHotel.name}</p>
                <p className="text-sm text-gray-600">{searchData.city}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#8B5CF6]">₹{selectedHotel.price.toLocaleString()}</p>
                <p className="text-xs text-gray-600">per night</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 space-y-5">
            <h3 className="font-bold text-lg text-gray-800">Guest Details</h3>
            
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter guest name"
                value={guestData.name}
                onChange={(e) => setGuestData({ ...guestData, name: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={guestData.email}
                onChange={(e) => setGuestData({ ...guestData, email: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="phone">Mobile Number</Label>
              <Input
                id="phone"
                type="tel"
                maxLength={10}
                placeholder="10-digit mobile number"
                value={guestData.phone}
                onChange={(e) => setGuestData({ ...guestData, phone: e.target.value.replace(/\D/g, '') })}
                className="mt-2"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}
          </Card>

          <Button onClick={handleBooking} className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] h-12 text-lg font-semibold">
            Confirm Booking
          </Button>

          <Button onClick={() => setStep(2)} variant="outline" className="w-full">
            Change Hotel
          </Button>
        </div>
      )}

      {loading && step === 3 && <LoadingSpinner message="Processing booking..." />}
    </ServiceLayout>
  );
};

export default HotelBooking;
