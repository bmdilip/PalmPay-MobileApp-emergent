from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import uuid

router = APIRouter(prefix="/travel", tags=["Travel Services"])

# ==================== MODELS ====================

class FlightSearchRequest(BaseModel):
    origin: str
    destination: str
    date: str
    passengers: int
    travel_class: str = "economy"

class Flight(BaseModel):
    id: str
    airline: str
    flight_number: str
    departure_time: str
    arrival_time: str
    duration: str
    price: float
    stops: str
    available_seats: int

class FlightBookingRequest(BaseModel):
    flight_id: str
    passenger_name: str
    passenger_age: int
    passenger_email: str
    passenger_phone: str
    passengers_count: int

class HotelSearchRequest(BaseModel):
    city: str
    checkin: str
    checkout: str
    guests: int

class Hotel(BaseModel):
    id: str
    name: str
    rating: float
    price: float
    amenities: List[str]
    address: str
    image_url: Optional[str] = None

class HotelBookingRequest(BaseModel):
    hotel_id: str
    guest_name: str
    guest_email: str
    guest_phone: str
    checkin: str
    checkout: str
    guests: int

class BookingResponse(BaseModel):
    booking_id: str
    status: str
    message: str
    transaction_id: str
    amount: float
    details: dict

# ==================== MOCK DATA ====================

MOCK_FLIGHTS_DATA = {
    "Delhi-Mumbai": [
        {"airline": "IndiGo", "code": "6E-2175", "dep": "06:00", "arr": "08:30", "duration": "2h 30m", "base_price": 4500},
        {"airline": "Air India", "code": "AI-804", "dep": "08:15", "arr": "10:50", "duration": "2h 35m", "base_price": 5200},
        {"airline": "SpiceJet", "code": "SG-8147", "dep": "12:30", "arr": "15:15", "duration": "2h 45m", "base_price": 3800},
        {"airline": "Vistara", "code": "UK-863", "dep": "18:00", "arr": "20:30", "duration": "2h 30m", "base_price": 6500},
    ],
    "Delhi-Bangalore": [
        {"airline": "IndiGo", "code": "6E-5324", "dep": "05:30", "arr": "08:20", "duration": "2h 50m", "base_price": 5200},
        {"airline": "Air India", "code": "AI-512", "dep": "09:45", "arr": "12:30", "duration": "2h 45m", "base_price": 6100},
        {"airline": "SpiceJet", "code": "SG-112", "dep": "14:15", "arr": "17:00", "duration": "2h 45m", "base_price": 4800},
        {"airline": "Vistara", "code": "UK-895", "dep": "19:30", "arr": "22:15", "duration": "2h 45m", "base_price": 7200},
    ],
    "Mumbai-Bangalore": [
        {"airline": "IndiGo", "code": "6E-345", "dep": "07:00", "arr": "08:35", "duration": "1h 35m", "base_price": 3200},
        {"airline": "Air India", "code": "AI-619", "dep": "11:20", "arr": "12:50", "duration": "1h 30m", "base_price": 4100},
        {"airline": "SpiceJet", "code": "SG-526", "dep": "15:45", "arr": "17:15", "duration": "1h 30m", "base_price": 2900},
        {"airline": "Vistara", "code": "UK-867", "dep": "20:10", "arr": "21:40", "duration": "1h 30m", "base_price": 5200},
    ],
}

MOCK_HOTELS_DATA = {
    "Delhi": [
        {"name": "Taj Palace", "rating": 5, "price": 8500, "amenities": ["WiFi", "Pool", "Spa", "Gym", "Restaurant"], "address": "Sardar Patel Marg, Diplomatic Enclave"},
        {"name": "ITC Maurya", "rating": 5, "price": 7200, "amenities": ["WiFi", "Gym", "Restaurant", "Bar"], "address": "Diplomatic Enclave, Chanakyapuri"},
        {"name": "Lemon Tree Premier", "rating": 4, "price": 3500, "amenities": ["WiFi", "Breakfast", "Gym"], "address": "National Highway 8, Mahipalpur"},
        {"name": "Treebo Trend", "rating": 3, "price": 2200, "amenities": ["WiFi", "AC", "Breakfast"], "address": "Paharganj, Near Railway Station"},
    ],
    "Mumbai": [
        {"name": "Taj Mahal Palace", "rating": 5, "price": 12000, "amenities": ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Sea View"], "address": "Apollo Bunder, Colaba"},
        {"name": "The Oberoi", "rating": 5, "price": 10500, "amenities": ["WiFi", "Pool", "Spa", "Restaurant"], "address": "Nariman Point, Marine Drive"},
        {"name": "Hotel Suba Palace", "rating": 4, "price": 4200, "amenities": ["WiFi", "Restaurant", "Bar"], "address": "Colaba Causeway"},
        {"name": "FabHotel Prime", "rating": 3, "price": 2800, "amenities": ["WiFi", "AC", "Breakfast"], "address": "Andheri East, Near Airport"},
    ],
    "Bangalore": [
        {"name": "ITC Gardenia", "rating": 5, "price": 9200, "amenities": ["WiFi", "Pool", "Spa", "Gym", "Restaurant"], "address": "Residency Road, Ashok Nagar"},
        {"name": "Taj West End", "rating": 5, "price": 8500, "amenities": ["WiFi", "Pool", "Gym", "Garden"], "address": "Race Course Road"},
        {"name": "Lemon Tree Hotel", "rating": 4, "price": 3800, "amenities": ["WiFi", "Breakfast", "Gym"], "address": "Electronic City Phase 1"},
        {"name": "Treebo Trend Bliss", "rating": 3, "price": 2400, "amenities": ["WiFi", "AC", "Breakfast"], "address": "Koramangala 5th Block"},
    ],
    "Chennai": [
        {"name": "ITC Grand Chola", "rating": 5, "price": 8800, "amenities": ["WiFi", "Pool", "Spa", "Gym", "Restaurant"], "address": "Guindy, Mount Road"},
        {"name": "Taj Coromandel", "rating": 5, "price": 7500, "amenities": ["WiFi", "Pool", "Restaurant", "Bar"], "address": "Nungambakkam High Road"},
        {"name": "Lemon Tree Hotel", "rating": 4, "price": 3200, "amenities": ["WiFi", "Breakfast", "Gym"], "address": "OMR, Thoraipakkam"},
        {"name": "Treebo Tryst", "rating": 3, "price": 2100, "amenities": ["WiFi", "AC", "Breakfast"], "address": "T Nagar, Near Bus Stand"},
    ],
}

# ==================== API ENDPOINTS ====================

@router.post("/flights/search", response_model=List[Flight])
async def search_flights(request: FlightSearchRequest):
    """Search for available flights"""
    try:
        # Create route key
        route_key = f"{request.origin}-{request.destination}"
        
        # Get mock flights for this route
        flights_data = MOCK_FLIGHTS_DATA.get(route_key, [])
        
        # If no direct flights found, return generic flights
        if not flights_data:
            flights_data = [
                {"airline": "IndiGo", "code": "6E-XXXX", "dep": "08:00", "arr": "11:30", "duration": "3h 30m", "base_price": 5500},
                {"airline": "Air India", "code": "AI-XXXX", "dep": "13:30", "arr": "17:00", "duration": "3h 30m", "base_price": 6200},
                {"airline": "SpiceJet", "code": "SG-XXXX", "dep": "17:00", "arr": "20:30", "duration": "3h 30m", "base_price": 4800},
            ]
        
        # Convert to Flight objects
        flights = []
        for idx, flight_data in enumerate(flights_data):
            price_multiplier = 1.0
            if request.travel_class == "business":
                price_multiplier = 2.5
            
            flight = Flight(
                id=f"flight-{uuid.uuid4().hex[:8]}",
                airline=flight_data["airline"],
                flight_number=flight_data["code"],
                departure_time=flight_data["dep"],
                arrival_time=flight_data["arr"],
                duration=flight_data["duration"],
                price=round(flight_data["base_price"] * price_multiplier),
                stops="Non-stop",
                available_seats=45 + (idx * 10)
            )
            flights.append(flight)
        
        return flights
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching flights: {str(e)}")


@router.post("/flights/book", response_model=BookingResponse)
async def book_flight(request: FlightBookingRequest):
    """Book a flight"""
    try:
        booking_id = f"FLT{uuid.uuid4().hex[:8].upper()}"
        transaction_id = f"TXN{uuid.uuid4().hex[:10].upper()}"
        
        # Mock booking with realistic response
        return BookingResponse(
            booking_id=booking_id,
            status="confirmed",
            message="Flight booking successful!",
            transaction_id=transaction_id,
            amount=4500.0 * request.passengers_count,  # Mock amount
            details={
                "passenger_name": request.passenger_name,
                "passenger_email": request.passenger_email,
                "passenger_phone": request.passenger_phone,
                "passengers_count": request.passengers_count,
                "booking_date": datetime.now().strftime("%Y-%m-%d"),
                "booking_time": datetime.now().strftime("%H:%M:%S")
            }
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error booking flight: {str(e)}")


@router.post("/hotels/search", response_model=List[Hotel])
async def search_hotels(request: HotelSearchRequest):
    """Search for available hotels"""
    try:
        city_name = request.city.strip().title()
        
        # Get mock hotels for this city
        hotels_data = MOCK_HOTELS_DATA.get(city_name, [])
        
        # If city not found, return generic hotels
        if not hotels_data:
            hotels_data = [
                {"name": "Grand Hotel", "rating": 4, "price": 4500, "amenities": ["WiFi", "Pool", "Restaurant"], "address": f"{city_name} City Center"},
                {"name": "Comfort Inn", "rating": 3, "price": 2800, "amenities": ["WiFi", "Breakfast"], "address": f"{city_name} Main Road"},
                {"name": "Budget Stay", "rating": 3, "price": 1800, "amenities": ["WiFi", "AC"], "address": f"{city_name} Station Road"},
            ]
        
        # Convert to Hotel objects
        hotels = []
        for hotel_data in hotels_data:
            hotel = Hotel(
                id=f"hotel-{uuid.uuid4().hex[:8]}",
                name=hotel_data["name"],
                rating=hotel_data["rating"],
                price=hotel_data["price"],
                amenities=hotel_data["amenities"],
                address=hotel_data["address"],
                image_url=f"https://via.placeholder.com/400x300?text={hotel_data['name'].replace(' ', '+')}"
            )
            hotels.append(hotel)
        
        return hotels
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching hotels: {str(e)}")


@router.post("/hotels/book", response_model=BookingResponse)
async def book_hotel(request: HotelBookingRequest):
    """Book a hotel"""
    try:
        booking_id = f"HTL{uuid.uuid4().hex[:8].upper()}"
        transaction_id = f"TXN{uuid.uuid4().hex[:10].upper()}"
        
        # Calculate nights
        checkin_date = datetime.strptime(request.checkin, "%Y-%m-%d")
        checkout_date = datetime.strptime(request.checkout, "%Y-%m-%d")
        nights = (checkout_date - checkin_date).days
        
        # Mock booking with realistic response
        return BookingResponse(
            booking_id=booking_id,
            status="confirmed",
            message="Hotel booking successful!",
            transaction_id=transaction_id,
            amount=3500.0 * nights,  # Mock amount
            details={
                "guest_name": request.guest_name,
                "guest_email": request.guest_email,
                "guest_phone": request.guest_phone,
                "checkin": request.checkin,
                "checkout": request.checkout,
                "nights": nights,
                "guests": request.guests,
                "booking_date": datetime.now().strftime("%Y-%m-%d"),
                "booking_time": datetime.now().strftime("%H:%M:%S")
            }
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error booking hotel: {str(e)}")


# Health check endpoint
@router.get("/health")
async def health_check():
    """Health check for travel services"""
    return {
        "status": "healthy",
        "service": "travel",
        "timestamp": datetime.now().isoformat()
    }
