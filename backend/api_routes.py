from fastapi import APIRouter, HTTPException, Depends
from typing import List
import uuid
from datetime import datetime
from models import *

router = APIRouter()

# In-memory storage (replace with database in production)
users_db = {}
transactions_db = {}
devices_db = {}
device_sessions_db = {}

# Helper function to generate mock data
def generate_mock_user(phone: str, name: str) -> User:
    return User(
        id=f"user-{uuid.uuid4().hex[:8]}",
        name=name,
        phone=phone,
        upiId=f"{name.lower().replace(' ', '')}@palmpay",
        palmId=None,
        palmEnabled=False,
        walletBalance=10000.0,
        cbdcBalance=500.0,
        kycStatus="verified",
        secureElementStatus="active"
    )

# Authentication Endpoints
@router.post("/auth/otp/request", response_model=dict)
async def request_otp(request: OTPRequest):
    """Request OTP for login"""
    # Mock OTP generation
    return {
        "status": "success",
        "message": f"OTP sent to {request.phone}",
        "otp": "123456"  # For testing only, remove in production
    }

@router.post("/auth/otp/verify", response_model=AuthResponse)
async def verify_otp(request: OTPVerify):
    """Verify OTP and login"""
    # Mock OTP verification
    if request.otp != "123456":
        raise HTTPException(status_code=401, detail="Invalid OTP")
    
    # Check if user exists
    user = users_db.get(request.phone)
    if not user:
        # Create new user
        user = generate_mock_user(request.phone, "New User")
        users_db[request.phone] = user
    
    token = f"token-{uuid.uuid4().hex}"
    return AuthResponse(
        user=user,
        token=token,
        refreshToken=f"refresh-{uuid.uuid4().hex}"
    )

@router.get("/users/me", response_model=User)
async def get_current_user():
    """Get current user profile"""
    # Mock current user
    return generate_mock_user("+91 98765 43210", "Arjun Mehta")

# Balance Endpoints
@router.get("/balances", response_model=BalanceResponse)
async def get_balances():
    """Get user balances"""
    return BalanceResponse(
        upiBalance=12450.75,
        quickWalletBalance=500.0,
        cbdcBalance=2500.0
    )

# Transaction Endpoints
@router.get("/transactions", response_model=List[Transaction])
async def get_transactions(
    limit: int = 20,
    offset: int = 0,
    type: Optional[str] = None
):
    """Get transaction history"""
    # Mock transactions
    mock_transactions = [
        Transaction(
            id=f"txn{i}",
            type=TransactionType.SENT if i % 2 == 0 else TransactionType.RECEIVED,
            amount=float(100 + (i * 50)),
            recipient=f"User {i}",
            upiId=f"user{i}@palmpay",
            date="2025-01-28",
            time=f"{10+i}:30",
            status=TransactionStatus.SUCCESS,
            category=TransactionCategory.UPI,
            method="UPI"
        )
        for i in range(1, 11)
    ]
    return mock_transactions[offset:offset+limit]

@router.post("/transactions", response_model=Transaction)
async def create_transaction(transaction: TransactionCreate):
    """Create new transaction"""
    new_transaction = Transaction(
        id=f"txn-{uuid.uuid4().hex[:8]}",
        type=TransactionType.SENT,
        amount=transaction.amount,
        recipient=transaction.recipient,
        upiId=transaction.recipient,
        date=datetime.now().strftime("%Y-%m-%d"),
        time=datetime.now().strftime("%H:%M"),
        status=TransactionStatus.SUCCESS,
        category=transaction.category,
        method=transaction.method
    )
    transactions_db[new_transaction.id] = new_transaction
    return new_transaction

@router.get("/transactions/{transaction_id}", response_model=Transaction)
async def get_transaction(transaction_id: str):
    """Get transaction by ID"""
    transaction = transactions_db.get(transaction_id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

# Device Endpoints
@router.get("/devices/nearby", response_model=List[Device])
async def get_nearby_devices(lat: Optional[float] = None, lng: Optional[float] = None, radius: Optional[int] = 5):
    """Get nearby PalmPe devices"""
    # Mock devices
    return [
        Device(
            id=f"device-{str(i).zfill(3)}",
            name=f"PalmPe Terminal - Location {i}",
            address=f"Address {i}, Bangalore",
            lat=12.9716 + (i * 0.01),
            lng=77.5946 + (i * 0.01),
            status=DeviceStatus.ACTIVE,
            distance=f"{i * 0.5} km",
            type="registration"
        )
        for i in range(1, 5)
    ]

@router.post("/device/claim", response_model=EnrollmentResponse)
async def claim_device_enrollment(request: EnrollmentClaim):
    """Claim device enrollment with code"""
    # Mock enrollment
    if len(request.enrollCode) != 6:
        raise HTTPException(status_code=400, detail="Invalid enrollment code")
    
    palm_id = f"palm-0x{uuid.uuid4().hex[:10]}"
    return EnrollmentResponse(
        status="ok",
        palmEnabled=True,
        palmId=palm_id,
        linkedDevice=request.deviceId or "device-987"
    )

# Device Payment Endpoints
@router.post("/device/initiate-payment", response_model=DevicePaymentResponse)
async def initiate_device_payment(request: DevicePaymentRequest):
    """Initiate payment at PalmPe device"""
    session_id = f"session-{uuid.uuid4().hex[:12]}"
    device_sessions_db[session_id] = {
        "status": "waiting_for_device",
        "userId": request.userId,
        "merchantId": request.merchantId,
        "amount": request.amount,
        "created_at": datetime.now()
    }
    return DevicePaymentResponse(
        deviceSessionId=session_id,
        status="waiting_for_device",
        qr=f"palmpay://session/{session_id}"
    )

@router.get("/device/session/{session_id}", response_model=DeviceSessionStatus)
async def get_device_session(session_id: str):
    """Get device session status"""
    session = device_sessions_db.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Simulate device authorization after 3 seconds
    # In production, this would be updated by the device
    return DeviceSessionStatus(
        deviceSessionId=session_id,
        status="authorized",  # or "waiting_for_device" or "failed"
        merchantInfo={"name": "Mock Merchant", "id": session.get("merchantId")},
        amount=session.get("amount")
    )

@router.get("/device/session/{session_id}/consent", response_model=Receipt)
async def get_consent_receipt(session_id: str):
    """Get consent receipt for device session"""
    session = device_sessions_db.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    receipt = Receipt(
        id=f"rcpt-{uuid.uuid4().hex[:8]}",
        txId=f"txn-{uuid.uuid4().hex[:8]}",
        merchantName="Mock Merchant",
        merchantId=session.get("merchantId"),
        amount=session.get("amount"),
        currency="INR",
        timestamp=datetime.now(),
        status="authorized",
        deviceId="device-987",
        userId=session.get("userId"),
        tripleHash=f"0x{uuid.uuid4().hex}",
        deviceSignature=f"0x{uuid.uuid4().hex}",
        signedBlob="base64_encoded_signed_data_here",
        verificationStatus="verified",
        bankLastFour="1234"
    )
    return receipt

# Wallet Endpoints
@router.post("/wallet/topup", response_model=dict)
async def topup_wallet(topup: WalletTopup):
    """Add money to wallet"""
    return {
        "status": "success",
        "amount": topup.amount,
        "newBalance": 12450.75 + topup.amount,
        "transactionId": f"txn-{uuid.uuid4().hex[:8]}"
    }

# Quick Wallet Endpoints
@router.get("/quick-wallet/balance", response_model=QuickWalletBalance)
async def get_quick_wallet_balance():
    """Get Quick Wallet balance"""
    return QuickWalletBalance(
        balance=500.0,
        limit=2000.0,
        enabled=True
    )

@router.post("/quick-wallet/topup", response_model=dict)
async def topup_quick_wallet(topup: WalletTopup):
    """Top up Quick Wallet"""
    if topup.amount > 2000:
        raise HTTPException(status_code=400, detail="Amount exceeds Quick Wallet limit")
    
    return {
        "status": "success",
        "amount": topup.amount,
        "newBalance": min(500.0 + topup.amount, 2000.0)
    }
