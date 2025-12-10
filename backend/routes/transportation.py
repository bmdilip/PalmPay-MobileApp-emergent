from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid
import random

router = APIRouter(prefix="/transportation", tags=["Transportation Services"])

# ==================== MODELS ====================

class FASTagRechargeRequest(BaseModel):
    vehicle_number: str
    tag_id: str
    amount: float
    bank: str

class MetroCardRechargeRequest(BaseModel):
    card_number: str
    metro_system: str
    amount: float

class TransportResponse(BaseModel):
    transaction_id: str
    status: str
    message: str
    amount: float
    timestamp: str
    details: dict

# ==================== MOCK DATA ====================

METRO_SYSTEMS = [
    {"id": "delhi-metro", "name": "Delhi Metro"},
    {"id": "mumbai-metro", "name": "Mumbai Metro"},
    {"id": "bangalore-metro", "name": "Namma Metro (Bangalore)"},
    {"id": "chennai-metro", "name": "Chennai Metro"},
    {"id": "kolkata-metro", "name": "Kolkata Metro"},
]

FASTAG_BANKS = [
    {"id": "icici", "name": "ICICI Bank"},
    {"id": "hdfc", "name": "HDFC Bank"},
    {"id": "sbi", "name": "State Bank of India"},
    {"id": "axis", "name": "Axis Bank"},
    {"id": "paytm", "name": "Paytm Payments Bank"},
]

# ==================== API ENDPOINTS ====================

@router.post("/fastag/recharge", response_model=TransportResponse)
async def fastag_recharge(request: FASTagRechargeRequest):
    """Recharge FASTag"""
    try:
        transaction_id = f"FAST{uuid.uuid4().hex[:10].upper()}"
        
        return TransportResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"FASTag recharge of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "vehicle_number": request.vehicle_number,
                "tag_id": request.tag_id,
                "bank": request.bank,
                "recharge_date": datetime.now().strftime("%Y-%m-%d"),
                "recharge_time": datetime.now().strftime("%H:%M:%S"),
                "new_balance": request.amount + random.uniform(100, 500),
                "valid_till": "Lifetime"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"FASTag recharge failed: {str(e)}")


@router.post("/metro/recharge", response_model=TransportResponse)
async def metro_card_recharge(request: MetroCardRechargeRequest):
    """Recharge Metro Card"""
    try:
        transaction_id = f"METR{uuid.uuid4().hex[:10].upper()}"
        
        return TransportResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"Metro card recharge of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "card_number": request.card_number,
                "metro_system": request.metro_system,
                "recharge_date": datetime.now().strftime("%Y-%m-%d"),
                "recharge_time": datetime.now().strftime("%H:%M:%S"),
                "new_balance": request.amount + random.uniform(50, 200),
                "card_type": "Smart Card"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Metro card recharge failed: {str(e)}")


@router.get("/metro/systems")
async def get_metro_systems():
    """Get list of metro systems"""
    return METRO_SYSTEMS


@router.get("/fastag/banks")
async def get_fastag_banks():
    """Get list of FASTag banks"""
    return FASTAG_BANKS


# Health check
@router.get("/health")
async def health_check():
    """Health check for transportation services"""
    return {
        "status": "healthy",
        "service": "transportation",
        "timestamp": datetime.now().isoformat()
    }
