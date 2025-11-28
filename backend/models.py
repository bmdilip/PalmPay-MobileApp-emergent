from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

# Enums
class TransactionType(str, Enum):
    SENT = "sent"
    RECEIVED = "received"

class TransactionStatus(str, Enum):
    SUCCESS = "success"
    PENDING = "pending"
    FAILED = "failed"

class TransactionCategory(str, Enum):
    UPI = "upi"
    PALM2QR = "palm2qr"
    POS = "pos"
    BILLPAY = "billpay"
    RECHARGE = "recharge"
    TRANSFER = "transfer"

class DeviceStatus(str, Enum):
    ACTIVE = "active"
    MAINTENANCE = "maintenance"
    OFFLINE = "offline"

# User Models
class User(BaseModel):
    id: str
    name: str
    phone: str
    email: Optional[str] = None
    upiId: str
    palmId: Optional[str] = None
    palmEnabled: bool = False
    walletBalance: float
    cbdcBalance: float = 0.0
    kycStatus: str = "pending"
    secureElementStatus: str = "inactive"
    linkedDeviceId: Optional[str] = None
    deviceRegistrationDate: Optional[datetime] = None

class UserCreate(BaseModel):
    phone: str
    name: str
    email: Optional[str] = None

# Authentication Models
class OTPRequest(BaseModel):
    phone: str

class OTPVerify(BaseModel):
    phone: str
    otp: str

class AuthResponse(BaseModel):
    user: User
    token: str
    refreshToken: str

# Transaction Models
class Transaction(BaseModel):
    id: str
    type: TransactionType
    amount: float
    recipient: str
    upiId: str
    date: str
    time: str
    status: TransactionStatus
    category: TransactionCategory
    method: str
    location: Optional[str] = None
    receiptId: Optional[str] = None
    tripleHash: Optional[str] = None
    deviceSignature: Optional[str] = None

class TransactionCreate(BaseModel):
    recipient: str
    amount: float
    category: TransactionCategory
    method: str = "UPI"

# Device Models
class Device(BaseModel):
    id: str
    name: str
    address: str
    lat: float
    lng: float
    status: DeviceStatus
    distance: Optional[str] = None
    type: str = "registration"
    availability: str = "Walk-in available"

# Device Payment Models
class DevicePaymentRequest(BaseModel):
    userId: str
    merchantId: str
    amount: float
    currency: str = "INR"
    preferredDevice: Optional[str] = None

class DevicePaymentResponse(BaseModel):
    deviceSessionId: str
    status: str = "waiting_for_device"
    qr: Optional[str] = None

class DeviceSessionStatus(BaseModel):
    deviceSessionId: str
    status: str
    merchantInfo: Optional[dict] = None
    amount: Optional[float] = None

# Enrollment Models
class EnrollmentClaim(BaseModel):
    userId: str
    enrollCode: str
    deviceId: Optional[str] = None

class EnrollmentResponse(BaseModel):
    status: str
    palmEnabled: bool
    palmId: str
    linkedDevice: str

# Receipt Models
class Receipt(BaseModel):
    id: str
    txId: str
    merchantName: str
    merchantId: str
    amount: float
    currency: str
    timestamp: datetime
    status: str
    deviceId: str
    userId: str
    tripleHash: str
    deviceSignature: str
    signedBlob: str
    verificationStatus: str
    bankLastFour: str
    location: Optional[str] = None

# Balance Models
class BalanceResponse(BaseModel):
    upiBalance: float
    quickWalletBalance: float
    cbdcBalance: float

# Wallet Models
class WalletTopup(BaseModel):
    amount: float
    source: str = "bank"

# Quick Wallet Models
class QuickWalletBalance(BaseModel):
    balance: float
    limit: float = 2000.0
    enabled: bool = True
