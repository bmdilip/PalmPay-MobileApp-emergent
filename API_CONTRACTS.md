# PalmPay API Contracts

## Base URL
- Development: `http://localhost:8001/api`
- Production: `https://api.palmpay.in/api`

## Authentication
All authenticated endpoints require `Authorization: Bearer {token}` header.

---

## Authentication Endpoints

### Request OTP
**POST** `/auth/otp/request`

Request body:
```json
{
  "phone": "+91 98765 43210"
}
```

Response:
```json
{
  "status": "success",
  "message": "OTP sent to +91 98765 43210"
}
```

### Verify OTP
**POST** `/auth/otp/verify`

Request body:
```json
{
  "phone": "+91 98765 43210",
  "otp": "123456"
}
```

Response:
```json
{
  "user": {
    "id": "user-abc123",
    "name": "Arjun Mehta",
    "phone": "+91 98765 43210",
    "upiId": "arjun@palmpay",
    "palmId": null,
    "palmEnabled": false,
    "walletBalance": 10000.0,
    "cbdcBalance": 500.0
  },
  "token": "token-xyz789",
  "refreshToken": "refresh-abc456"
}
```

---

## User Endpoints

### Get Current User
**GET** `/users/me`

Response:
```json
{
  "id": "user-abc123",
  "name": "Arjun Mehta",
  "phone": "+91 98765 43210",
  "upiId": "arjun@palmpay",
  "palmId": "palm-0xabc123",
  "palmEnabled": true,
  "walletBalance": 12450.75,
  "cbdcBalance": 2500.0
}
```

---

## Balance Endpoints

### Get Balances
**GET** `/balances`

Response:
```json
{
  "upiBalance": 12450.75,
  "quickWalletBalance": 500.0,
  "cbdcBalance": 2500.0
}
```

---

## Transaction Endpoints

### Get Transactions
**GET** `/transactions?limit=20&offset=0&type=sent`

Query parameters:
- `limit` (optional): Number of transactions (default: 20)
- `offset` (optional): Pagination offset (default: 0)
- `type` (optional): Filter by type ("sent" or "received")

Response:
```json
[
  {
    "id": "txn1",
    "type": "sent",
    "amount": 850.0,
    "recipient": "Priya Sharma",
    "upiId": "priya@palmpay",
    "date": "2025-01-28",
    "time": "15:30",
    "status": "success",
    "category": "palm2qr",
    "method": "Palm Biometric",
    "location": "Cafe Coffee Day, Bangalore",
    "receiptId": "rcpt-001",
    "tripleHash": "0xabcdef...",
    "deviceSignature": "0x987654..."
  }
]
```

### Create Transaction
**POST** `/transactions`

Request body:
```json
{
  "recipient": "priya@palmpay",
  "amount": 500.0,
  "category": "upi",
  "method": "UPI"
}
```

Response:
```json
{
  "id": "txn-abc123",
  "type": "sent",
  "amount": 500.0,
  "recipient": "priya@palmpay",
  "status": "success",
  "date": "2025-01-28",
  "time": "15:30"
}
```

### Get Transaction by ID
**GET** `/transactions/{transaction_id}`

Response: Same as transaction object above

---

## Device Endpoints

### Get Nearby Devices
**GET** `/devices/nearby?lat=12.9716&lng=77.5946&radius=5`

Query parameters:
- `lat` (optional): Latitude
- `lng` (optional): Longitude
- `radius` (optional): Search radius in km (default: 5)

Response:
```json
[
  {
    "id": "device-001",
    "name": "PalmPe Terminal - MG Road",
    "address": "MG Road Metro Station, Bangalore",
    "lat": 12.9716,
    "lng": 77.5946,
    "status": "active",
    "distance": "0.5 km",
    "type": "registration",
    "availability": "Walk-in available"
  }
]
```

### Claim Device Enrollment
**POST** `/device/claim`

Request body:
```json
{
  "userId": "user-123",
  "enrollCode": "AB12CD",
  "deviceId": "device-987"
}
```

Response:
```json
{
  "status": "ok",
  "palmEnabled": true,
  "palmId": "palm-0xabc123",
  "linkedDevice": "device-987"
}
```

---

## Device Payment Flow

### Initiate Payment at Device
**POST** `/device/initiate-payment`

Request body:
```json
{
  "userId": "user-123",
  "merchantId": "merchant-555",
  "amount": 250.0,
  "currency": "INR",
  "preferredDevice": "device-987"
}
```

Response:
```json
{
  "deviceSessionId": "session-abc123",
  "status": "waiting_for_device",
  "qr": "palmpay://session/abc123"
}
```

### Get Device Session Status
**GET** `/device/session/{session_id}`

Response:
```json
{
  "deviceSessionId": "session-abc123",
  "status": "authorized",
  "merchantInfo": {
    "name": "Cafe Coffee Day",
    "id": "merchant-555"
  },
  "amount": 250.0
}
```

Status values:
- `waiting_for_device`: User needs to place palm on device
- `authorized`: Payment authorized
- `failed`: Payment failed

### Get Consent Receipt
**GET** `/device/session/{session_id}/consent`

Response:
```json
{
  "id": "rcpt-001",
  "txId": "txn-abc123",
  "merchantName": "Cafe Coffee Day",
  "merchantId": "merchant-555",
  "amount": 250.0,
  "currency": "INR",
  "timestamp": "2025-01-28T15:30:00Z",
  "status": "authorized",
  "deviceId": "device-987",
  "userId": "user-123",
  "tripleHash": "0xabcdef123456789...",
  "deviceSignature": "0x9876543210fedcba...",
  "signedBlob": "base64_encoded_data",
  "verificationStatus": "verified",
  "bankLastFour": "1234",
  "location": "Cafe Coffee Day, Bangalore"
}
```

---

## Wallet Endpoints

### Top Up Wallet
**POST** `/wallet/topup`

Request body:
```json
{
  "amount": 1000.0,
  "source": "bank"
}
```

Response:
```json
{
  "status": "success",
  "amount": 1000.0,
  "newBalance": 13450.75,
  "transactionId": "txn-abc123"
}
```

---

## Quick Wallet Endpoints

### Get Quick Wallet Balance
**GET** `/quick-wallet/balance`

Response:
```json
{
  "balance": 500.0,
  "limit": 2000.0,
  "enabled": true
}
```

### Top Up Quick Wallet
**POST** `/quick-wallet/topup`

Request body:
```json
{
  "amount": 500.0,
  "source": "upi_wallet"
}
```

Response:
```json
{
  "status": "success",
  "amount": 500.0,
  "newBalance": 1000.0
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "detail": "Error message describing what went wrong"
}
```

Common HTTP status codes:
- `400`: Bad Request (invalid input)
- `401`: Unauthorized (invalid or missing token)
- `404`: Not Found (resource doesn't exist)
- `500`: Internal Server Error

---

## Integration Notes

1. **Authentication**: Store the `token` securely and include in all authenticated requests
2. **Device Payment Flow**:
   - Step 1: Call `/device/initiate-payment`
   - Step 2: Poll `/device/session/{id}` every 2 seconds
   - Step 3: When status is "authorized", fetch consent receipt
3. **Error Handling**: Always check for error responses and handle appropriately
4. **Rate Limiting**: API is rate limited to 100 requests per minute per user

---

## Testing

Test credentials:
- Phone: Any 10-digit number
- OTP: `123456` (for testing only)

Mock merchant IDs:
- `merchant-555`: Cafe Coffee Day
- `merchant-789`: BigBazaar
- `merchant-001`: General Store
