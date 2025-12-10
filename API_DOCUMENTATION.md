# PalmPay Services API Documentation

## Base URL
```
http://localhost:8001/api
```

## Travel Services API

### 1. Search Flights
**Endpoint:** `POST /travel/flights/search`

**Request Body:**
```json
{
  "origin": "Delhi",
  "destination": "Mumbai",
  "date": "2025-12-11",
  "passengers": 1,
  "travel_class": "economy"
}
```

**Response:**
```json
[
  {
    "id": "flight-abc123",
    "airline": "IndiGo",
    "flight_number": "6E-2175",
    "departure_time": "06:00",
    "arrival_time": "08:30",
    "duration": "2h 30m",
    "price": 4500,
    "stops": "Non-stop",
    "available_seats": 45
  }
]
```

### 2. Book Flight
**Endpoint:** `POST /travel/flights/book`

**Request Body:**
```json
{
  "flight_id": "flight-abc123",
  "passenger_name": "John Doe",
  "passenger_age": 30,
  "passenger_email": "john@example.com",
  "passenger_phone": "9876543210",
  "passengers_count": 1
}
```

### 3. Search Hotels
**Endpoint:** `POST /travel/hotels/search`

**Request Body:**
```json
{
  "city": "Mumbai",
  "checkin": "2025-12-11",
  "checkout": "2025-12-13",
  "guests": 2
}
```

### 4. Book Hotel
**Endpoint:** `POST /travel/hotels/book`

---

## Recharge Services API

### 1. Get Mobile Operators
**Endpoint:** `GET /recharge/mobile/operators`

### 2. Mobile Recharge
**Endpoint:** `POST /recharge/mobile/recharge`

**Request Body:**
```json
{
  "mobile_number": "9876543210",
  "operator_id": "jio",
  "amount": 299,
  "circle": "National"
}
```

### 3. DTH Recharge
**Endpoint:** `POST /recharge/dth/recharge`

**Request Body:**
```json
{
  "subscriber_id": "1234567890",
  "operator_id": "tata-sky",
  "amount": 500
}
```

### 4. Data Card Recharge
**Endpoint:** `POST /recharge/datacard/recharge`

### 5. Broadband Bill Payment
**Endpoint:** `POST /recharge/broadband/pay`

### 6. Landline Bill Payment
**Endpoint:** `POST /recharge/landline/pay`

### 7. Postpaid Bill Payment
**Endpoint:** `POST /recharge/postpaid/pay`

---

## Utilities Services API

### 1. Get Electricity Providers
**Endpoint:** `GET /utilities/electricity/providers`

### 2. Pay Electricity Bill
**Endpoint:** `POST /utilities/electricity/pay`

**Request Body:**
```json
{
  "consumer_number": "1234567890",
  "provider_id": "tata-power",
  "amount": 1500,
  "state": "Maharashtra"
}
```

### 3. Pay Water Bill
**Endpoint:** `POST /utilities/water/pay`

### 4. Pay Gas Bill
**Endpoint:** `POST /utilities/gas/pay`

### 5. Pay Cable TV Bill
**Endpoint:** `POST /utilities/cabletv/pay`

---

## Transportation Services API

### 1. FASTag Recharge
**Endpoint:** `POST /transportation/fastag/recharge`

**Request Body:**
```json
{
  "vehicle_number": "MH01AB1234",
  "tag_id": "TAG123456",
  "amount": 500,
  "bank": "icici"
}
```

### 2. Metro Card Recharge
**Endpoint:** `POST /transportation/metro/recharge`

**Request Body:**
```json
{
  "card_number": "1234567890",
  "metro_system": "delhi-metro",
  "amount": 500
}
```

### 3. Get Metro Systems
**Endpoint:** `GET /transportation/metro/systems`

### 4. Get FASTag Banks
**Endpoint:** `GET /transportation/fastag/banks`

---

## Other Services API

### 1. Housing Society Payment
**Endpoint:** `POST /other-services/housing-society/pay`

**Request Body:**
```json
{
  "society_name": "Green Valley Apartments",
  "flat_number": "A-101",
  "amount": 5000,
  "payment_type": "maintenance"
}
```

### 2. Municipal Tax Payment
**Endpoint:** `POST /other-services/municipal-tax/pay`

**Request Body:**
```json
{
  "property_id": "PROP123456",
  "ward_number": "Ward-5",
  "amount": 10000,
  "city": "Mumbai"
}
```

### 3. Rental Payment
**Endpoint:** `POST /other-services/rental/pay`

### 4. Club Membership Payment
**Endpoint:** `POST /other-services/club-membership/pay`

### 5. Insurance Premium Payment
**Endpoint:** `POST /other-services/insurance/pay`

**Request Body:**
```json
{
  "policy_number": "POL123456",
  "insurance_company": "lic",
  "amount": 25000,
  "policy_type": "life"
}
```

### 6. Loan Repayment
**Endpoint:** `POST /other-services/loan/repay`

**Request Body:**
```json
{
  "loan_account": "LOAN123456",
  "bank_name": "sbi",
  "amount": 15000,
  "loan_type": "home"
}
```

### 7. Education Fee Payment
**Endpoint:** `POST /other-services/education/pay`

**Request Body:**
```json
{
  "student_id": "STU123456",
  "institution_name": "ABC University",
  "amount": 50000,
  "fee_type": "tuition"
}
```

---

## Common Response Format

### Success Response
```json
{
  "transaction_id": "TXN1234567890",
  "status": "success",
  "message": "Payment successful!",
  "amount": 1500.0,
  "timestamp": "2025-12-10T10:15:30.123456",
  "details": {
    // Service-specific details
  }
}
```

### Error Response
```json
{
  "detail": "Error message"
}
```

---

## Available Services Summary

### Phase 1: Travel ✅
- ✅ Flights (Search & Book)
- ✅ Hotels (Search & Book)

### Phase 2: Recharge & Communications ✅
- ✅ Mobile Recharge
- ✅ DTH Recharge
- ✅ Data Card Recharge
- ✅ Broadband Bill
- ✅ Landline Bill
- ✅ Mobile Postpaid Bill

### Phase 3: Utilities ✅
- ✅ Electricity Bill
- ✅ Water Bill
- ✅ Gas Bill
- ✅ Cable TV Bill

### Phase 4: Transportation & Society ✅
- ✅ FASTag Recharge
- ✅ Metro Card Recharge
- ✅ Housing Society Payment
- ✅ Municipal Tax Payment
- ✅ Rental Payment
- ✅ Clubs & Associations Payment

### Phase 5: Financial & Education ✅
- ✅ Insurance Premium
- ✅ Loan Repayment
- ✅ Education Fee
- ✅ LIC Premium (use insurance endpoint)

---

## Notes

1. **All APIs use mock data** - No real payments are processed
2. **Backend URL**: Use `process.env.REACT_APP_BACKEND_URL` in frontend
3. **All endpoints** are prefixed with `/api`
4. **Transaction IDs** are auto-generated and unique
5. **Amount** should be a positive number (float)
6. **Phone numbers** should be 10 digits
7. **Dates** should be in `YYYY-MM-DD` format

---

## Testing the APIs

### Using cURL:
```bash
# Test flight search
curl -X POST http://localhost:8001/api/travel/flights/search \
  -H "Content-Type: application/json" \
  -d '{"origin":"Delhi","destination":"Mumbai","date":"2025-12-11","passengers":1,"travel_class":"economy"}'

# Test mobile recharge
curl -X POST http://localhost:8001/api/recharge/mobile/recharge \
  -H "Content-Type: application/json" \
  -d '{"mobile_number":"9876543210","operator_id":"jio","amount":299,"circle":"National"}'
```

### Health Check Endpoints:
```bash
curl http://localhost:8001/api/travel/health
curl http://localhost:8001/api/recharge/health
curl http://localhost:8001/api/utilities/health
curl http://localhost:8001/api/transportation/health
curl http://localhost:8001/api/other-services/health
```
