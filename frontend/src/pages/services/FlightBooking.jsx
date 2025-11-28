import React, { useState } from 'react';
import { Plane, ChevronRight, Calendar, Users } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import ServiceLayout from '../../components/ServiceLayout';
import ServiceReceipt from '../../components/ServiceReceipt';
import { LoadingSpinner } from '../../components/StateComponents';

const FlightBooking = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [receiptData, setReceiptData] = useState(null);

  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: '1',
    class: 'economy'
  });

  const [passengerData, setPassengerData] = useState({
    name: '',
    age: '',
    email: '',
    phone: ''
  });

  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];

  const mockFlights = [
    { id: 1, airline: 'IndiGo', flightNo: '6E-2175', departure: '06:00', arrival: '08:30', duration: '2h 30m', price: 4500, stops: 'Non-stop' },
    { id: 2, airline: 'Air India', flightNo: 'AI-804', departure: '08:15', arrival: '10:50', duration: '2h 35m', price: 5200, stops: 'Non-stop' },
    { id: 3, airline: 'SpiceJet', flightNo: 'SG-8147', departure: '12:30', arrival: '15:15', duration: '2h 45m', price: 3800, stops: 'Non-stop' },
    { id: 4, airline: 'Vistara', flightNo: 'UK-863', departure: '18:00', arrival: '20:30', duration: '2h 30m', price: 6500, stops: 'Non-stop' },
  ];

  const handleSearch = () => {
    if (!searchData.from || !searchData.to || !searchData.date) {
      setError('Please fill all search fields');
      return;
    }
    if (searchData.from === searchData.to) {
      setError('From and To cities must be different');
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setSearchResults(mockFlights);
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
    setStep(3);
  };

  const handleBooking = () => {
    if (!passengerData.name || !passengerData.age || !passengerData.email || !passengerData.phone) {
      setError('Please fill all passenger details');
      return;
    }
    if (!/^\d{10}$/.test(passengerData.phone)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      const receipt = {
        transactionId: `FLT${Date.now()}`,
        date: new Date().toLocaleDateString('en-IN'),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        amount: selectedFlight.price * parseInt(searchData.passengers),
        serviceName: 'Flight Booking',
        details: [
          { label: 'Passenger', value: passengerData.name },
          { label: 'Flight', value: `${selectedFlight.airline} ${selectedFlight.flightNo}` },
          { label: 'Route', value: `${searchData.from} → ${searchData.to}` },
          { label: 'Date', value: searchData.date },
          { label: 'Departure', value: selectedFlight.departure },
          { label: 'Arrival', value: selectedFlight.arrival },
          { label: 'Passengers', value: searchData.passengers }
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
      title="Flight Booking"
      subtitle="Book domestic flights"
      icon={Plane}
      iconColor="#0EA5E9"
      headerGradient="from-[#0EA5E9] via-[#38BDF8] to-[#7DD3FC]"
    >
      {/* Step 1: Search */}
      {step === 1 && !loading && (
        <Card className="p-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>From</Label>
              <select
                value={searchData.from}
                onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              >
                <option value="">Select city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>To</Label>
              <select
                value={searchData.to}
                onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              >
                <option value="">Select city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="date">Travel Date</Label>
            <Input
              id="date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={searchData.date}
              onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Passengers</Label>
              <select
                value={searchData.passengers}
                onChange={(e) => setSearchData({ ...searchData, passengers: e.target.value })}
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Class</Label>
              <select
                value={searchData.class}
                onChange={(e) => setSearchData({ ...searchData, class: e.target.value })}
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              >
                <option value="economy">Economy</option>
                <option value="business">Business</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <Button onClick={handleSearch} className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] h-12">
            Search Flights
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>
      )}

      {loading && step === 1 && <LoadingSpinner message="Searching flights..." />}

      {/* Step 2: Results */}
      {step === 2 && searchResults && (
        <div className="space-y-4">
          <Card className="p-4 bg-gradient-to-r from-sky-50 to-blue-50 border-sky-200">
            <div className="text-sm">
              <p className="font-semibold text-gray-800">{searchData.from} → {searchData.to}</p>
              <p className="text-gray-600">{searchData.date} • {searchData.passengers} Passenger(s)</p>
            </div>
          </Card>

          {searchResults.map((flight) => (
            <Card
              key={flight.id}
              className="p-4 cursor-pointer transition-all hover:shadow-lg"
              onClick={() => handleFlightSelect(flight)}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-gray-800">{flight.airline}</p>
                  <p className="text-sm text-gray-500">{flight.flightNo}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#0EA5E9]">₹{flight.price.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">per person</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-800">{flight.departure}</p>
                  <p className="text-gray-500">{searchData.from}</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-gray-500">{flight.duration}</p>
                  <div className="w-full h-px bg-gray-300 my-1"></div>
                  <p className="text-green-600 text-xs font-medium">{flight.stops}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{flight.arrival}</p>
                  <p className="text-gray-500">{searchData.to}</p>
                </div>
              </div>
            </Card>
          ))}

          <Button onClick={() => setStep(1)} variant="outline" className="w-full">
            Modify Search
          </Button>
        </div>
      )}

      {/* Step 3: Passenger Details */}
      {step === 3 && selectedFlight && !loading && (
        <div className="space-y-4">
          <Card className="p-5 bg-gradient-to-r from-sky-50 to-blue-50 border-sky-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-bold text-gray-800">{selectedFlight.airline} {selectedFlight.flightNo}</p>
                <p className="text-sm text-gray-600">{searchData.from} → {searchData.to}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#0EA5E9]">₹{(selectedFlight.price * parseInt(searchData.passengers)).toLocaleString()}</p>
                <p className="text-xs text-gray-600">Total Amount</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 space-y-5">
            <h3 className="font-bold text-lg text-gray-800">Passenger Details</h3>
            
            <div>
              <Label htmlFor="name">Full Name (as on ID)</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter passenger name"
                value={passengerData.name}
                onChange={(e) => setPassengerData({ ...passengerData, name: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter age"
                value={passengerData.age}
                onChange={(e) => setPassengerData({ ...passengerData, age: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={passengerData.email}
                onChange={(e) => setPassengerData({ ...passengerData, email: e.target.value })}
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
                value={passengerData.phone}
                onChange={(e) => setPassengerData({ ...passengerData, phone: e.target.value.replace(/\D/g, '') })}
                className="mt-2"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}
          </Card>

          <Button onClick={handleBooking} className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] h-12 text-lg font-semibold">
            Confirm Booking ₹{(selectedFlight.price * parseInt(searchData.passengers)).toLocaleString()}
          </Button>

          <Button onClick={() => setStep(2)} variant="outline" className="w-full">
            Change Flight
          </Button>
        </div>
      )}

      {loading && step === 3 && <LoadingSpinner message="Processing booking..." />}
    </ServiceLayout>
  );
};

export default FlightBooking;