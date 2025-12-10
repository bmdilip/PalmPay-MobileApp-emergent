from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid
import random

router = APIRouter(prefix="/utilities", tags=["Utility Services"])

# ==================== MODELS ====================

class ProviderInfo(BaseModel):
    id: str
    name: str
    logo_url: Optional[str] = None
    type: str

class ElectricityBillRequest(BaseModel):
    consumer_number: str
    provider_id: str
    amount: float
    state: str

class WaterBillRequest(BaseModel):
    consumer_number: str
    provider_id: str
    amount: float
    city: str

class GasBillRequest(BaseModel):
    consumer_number: str
    provider_id: str
    amount: float
    city: str

class CableTVBillRequest(BaseModel):
    subscriber_id: str
    provider_id: str
    amount: float

class BillResponse(BaseModel):
    transaction_id: str
    status: str
    message: str
    amount: float
    timestamp: str
    details: dict

# ==================== MOCK DATA ====================

ELECTRICITY_PROVIDERS = [
    {"id": "tata-power", "name": "Tata Power", "type": "electricity"},
    {"id": "adani-elec", "name": "Adani Electricity", "type": "electricity"},
    {"id": "bescom", "name": "BESCOM", "type": "electricity"},
    {"id": "msedcl", "name": "MSEDCL", "type": "electricity"},
    {"id": "torrent-power", "name": "Torrent Power", "type": "electricity"},
]

WATER_PROVIDERS = [
    {"id": "bwssb", "name": "Bangalore Water Supply", "type": "water"},
    {"id": "mcgm", "name": "Mumbai Municipal Corporation", "type": "water"},
    {"id": "delhi-jal", "name": "Delhi Jal Board", "type": "water"},
    {"id": "cmwssb", "name": "Chennai Metro Water", "type": "water"},
]

GAS_PROVIDERS = [
    {"id": "indraprastha-gas", "name": "Indraprastha Gas", "type": "gas"},
    {"id": "mahanagar-gas", "name": "Mahanagar Gas", "type": "gas"},
    {"id": "gujarat-gas", "name": "Gujarat Gas", "type": "gas"},
    {"id": "adani-gas", "name": "Adani Gas", "type": "gas"},
]

CABLE_TV_PROVIDERS = [
    {"id": "den-networks", "name": "DEN Networks", "type": "cable"},
    {"id": "hathway", "name": "Hathway", "type": "cable"},
    {"id": "siti-cable", "name": "Siti Cable", "type": "cable"},
    {"id": "local-cable", "name": "Local Cable Operator", "type": "cable"},
]

# ==================== API ENDPOINTS ====================

@router.get("/electricity/providers", response_model=List[ProviderInfo])
async def get_electricity_providers():
    """Get list of electricity providers"""
    return [ProviderInfo(**p) for p in ELECTRICITY_PROVIDERS]

@router.post("/electricity/pay", response_model=BillResponse)
async def pay_electricity_bill(request: ElectricityBillRequest):
    """Pay electricity bill"""
    try:
        transaction_id = f"ELEC{uuid.uuid4().hex[:10].upper()}"
        
        return BillResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"Electricity bill payment of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "consumer_number": request.consumer_number,
                "provider": request.provider_id,
                "state": request.state,
                "payment_date": datetime.now().strftime("%Y-%m-%d"),
                "units_consumed": f"{random.randint(100, 500)} kWh",
                "billing_period": "Current month"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment failed: {str(e)}")


@router.get("/water/providers", response_model=List[ProviderInfo])
async def get_water_providers():
    """Get list of water providers"""
    return [ProviderInfo(**p) for p in WATER_PROVIDERS]

@router.post("/water/pay", response_model=BillResponse)
async def pay_water_bill(request: WaterBillRequest):
    """Pay water bill"""
    try:
        transaction_id = f"WATR{uuid.uuid4().hex[:10].upper()}"
        
        return BillResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"Water bill payment of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "consumer_number": request.consumer_number,
                "provider": request.provider_id,
                "city": request.city,
                "payment_date": datetime.now().strftime("%Y-%m-%d"),
                "consumption": f"{random.randint(5000, 15000)} liters",
                "billing_period": "Current month"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment failed: {str(e)}")


@router.get("/gas/providers", response_model=List[ProviderInfo])
async def get_gas_providers():
    """Get list of gas providers"""
    return [ProviderInfo(**p) for p in GAS_PROVIDERS]

@router.post("/gas/pay", response_model=BillResponse)
async def pay_gas_bill(request: GasBillRequest):
    """Pay gas bill"""
    try:
        transaction_id = f"GAS{uuid.uuid4().hex[:10].upper()}"
        
        return BillResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"Gas bill payment of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "consumer_number": request.consumer_number,
                "provider": request.provider_id,
                "city": request.city,
                "payment_date": datetime.now().strftime("%Y-%m-%d"),
                "consumption": f"{random.randint(50, 200)} SCM",
                "billing_period": "Current month"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment failed: {str(e)}")


@router.get("/cabletv/providers", response_model=List[ProviderInfo])
async def get_cabletv_providers():
    """Get list of cable TV providers"""
    return [ProviderInfo(**p) for p in CABLE_TV_PROVIDERS]

@router.post("/cabletv/pay", response_model=BillResponse)
async def pay_cabletv_bill(request: CableTVBillRequest):
    """Pay cable TV bill"""
    try:
        transaction_id = f"CATV{uuid.uuid4().hex[:10].upper()}"
        
        return BillResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"Cable TV bill payment of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "subscriber_id": request.subscriber_id,
                "provider": request.provider_id,
                "payment_date": datetime.now().strftime("%Y-%m-%d"),
                "plan": "Premium Package",
                "validity": "30 days"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment failed: {str(e)}")


# Health check
@router.get("/health")
async def health_check():
    """Health check for utility services"""
    return {
        "status": "healthy",
        "service": "utilities",
        "timestamp": datetime.now().isoformat()
    }
