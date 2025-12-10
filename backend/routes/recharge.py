from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid
import random

router = APIRouter(prefix="/recharge", tags=["Recharge Services"])

# ==================== MODELS ====================

class OperatorInfo(BaseModel):
    id: str
    name: str
    logo_url: Optional[str] = None
    type: str  # prepaid/postpaid

class MobileRechargeRequest(BaseModel):
    mobile_number: str
    operator_id: str
    amount: float
    circle: Optional[str] = "National"

class DTHRechargeRequest(BaseModel):
    subscriber_id: str
    operator_id: str
    amount: float

class DataCardRechargeRequest(BaseModel):
    data_card_number: str
    operator_id: str
    amount: float

class BroadbandBillRequest(BaseModel):
    account_number: str
    operator_id: str
    amount: float

class LandlineBillRequest(BaseModel):
    landline_number: str
    operator_id: str
    amount: float

class PostpaidBillRequest(BaseModel):
    mobile_number: str
    operator_id: str
    amount: float

class RechargeResponse(BaseModel):
    transaction_id: str
    status: str
    message: str
    amount: float
    timestamp: str
    details: dict

# ==================== MOCK DATA ====================

MOBILE_OPERATORS = [
    {"id": "jio", "name": "Jio", "type": "prepaid"},
    {"id": "airtel", "name": "Airtel", "type": "prepaid"},
    {"id": "vi", "name": "Vi (Vodafone Idea)", "type": "prepaid"},
    {"id": "bsnl", "name": "BSNL", "type": "prepaid"},
]

DTH_OPERATORS = [
    {"id": "tata-sky", "name": "Tata Play (Tata Sky)", "type": "dth"},
    {"id": "airtel-dth", "name": "Airtel Digital TV", "type": "dth"},
    {"id": "dish-tv", "name": "Dish TV", "type": "dth"},
    {"id": "sun-direct", "name": "Sun Direct", "type": "dth"},
]

BROADBAND_OPERATORS = [
    {"id": "jio-fiber", "name": "JioFiber", "type": "broadband"},
    {"id": "airtel-fiber", "name": "Airtel Xstream Fiber", "type": "broadband"},
    {"id": "bsnl-fiber", "name": "BSNL Fiber", "type": "broadband"},
    {"id": "act", "name": "ACT Fibernet", "type": "broadband"},
]

LANDLINE_OPERATORS = [
    {"id": "bsnl-landline", "name": "BSNL Landline", "type": "landline"},
    {"id": "mtnl", "name": "MTNL", "type": "landline"},
    {"id": "airtel-landline", "name": "Airtel Landline", "type": "landline"},
]

# ==================== API ENDPOINTS ====================

@router.get("/mobile/operators", response_model=List[OperatorInfo])
async def get_mobile_operators():
    """Get list of mobile operators"""
    return [OperatorInfo(**op) for op in MOBILE_OPERATORS]

@router.post("/mobile/recharge", response_model=RechargeResponse)
async def mobile_recharge(request: MobileRechargeRequest):
    """Recharge mobile number"""
    try:
        # Validate mobile number
        if len(request.mobile_number) != 10:
            raise HTTPException(status_code=400, detail="Invalid mobile number")
        
        # Mock successful recharge
        transaction_id = f"MOB{uuid.uuid4().hex[:10].upper()}"
        
        return RechargeResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"Mobile recharge of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "mobile_number": request.mobile_number,
                "operator": request.operator_id,
                "circle": request.circle,
                "recharge_date": datetime.now().strftime("%Y-%m-%d"),
                "recharge_time": datetime.now().strftime("%H:%M:%S")
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recharge failed: {str(e)}")


@router.get("/dth/operators", response_model=List[OperatorInfo])
async def get_dth_operators():
    """Get list of DTH operators"""
    return [OperatorInfo(**op) for op in DTH_OPERATORS]

@router.post("/dth/recharge", response_model=RechargeResponse)
async def dth_recharge(request: DTHRechargeRequest):
    """Recharge DTH subscription"""
    try:
        transaction_id = f"DTH{uuid.uuid4().hex[:10].upper()}"
        
        return RechargeResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"DTH recharge of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "subscriber_id": request.subscriber_id,
                "operator": request.operator_id,
                "recharge_date": datetime.now().strftime("%Y-%m-%d"),
                "recharge_time": datetime.now().strftime("%H:%M:%S"),
                "validity": "30 days"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DTH recharge failed: {str(e)}")


@router.get("/datacard/operators", response_model=List[OperatorInfo])
async def get_datacard_operators():
    """Get list of data card operators"""
    return [OperatorInfo(**op) for op in MOBILE_OPERATORS]  # Same as mobile

@router.post("/datacard/recharge", response_model=RechargeResponse)
async def datacard_recharge(request: DataCardRechargeRequest):
    """Recharge data card"""
    try:
        transaction_id = f"DAT{uuid.uuid4().hex[:10].upper()}"
        
        return RechargeResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"Data card recharge of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "data_card_number": request.data_card_number,
                "operator": request.operator_id,
                "recharge_date": datetime.now().strftime("%Y-%m-%d"),
                "data_validity": "28 days"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Data card recharge failed: {str(e)}")


@router.get("/broadband/operators", response_model=List[OperatorInfo])
async def get_broadband_operators():
    """Get list of broadband operators"""
    return [OperatorInfo(**op) for op in BROADBAND_OPERATORS]

@router.post("/broadband/pay", response_model=RechargeResponse)
async def broadband_payment(request: BroadbandBillRequest):
    """Pay broadband bill"""
    try:
        transaction_id = f"BRD{uuid.uuid4().hex[:10].upper()}"
        
        return RechargeResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"Broadband bill payment of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "account_number": request.account_number,
                "operator": request.operator_id,
                "payment_date": datetime.now().strftime("%Y-%m-%d"),
                "due_date": "Next 30 days"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Broadband payment failed: {str(e)}")


@router.get("/landline/operators", response_model=List[OperatorInfo])
async def get_landline_operators():
    """Get list of landline operators"""
    return [OperatorInfo(**op) for op in LANDLINE_OPERATORS]

@router.post("/landline/pay", response_model=RechargeResponse)
async def landline_payment(request: LandlineBillRequest):
    """Pay landline bill"""
    try:
        transaction_id = f"LND{uuid.uuid4().hex[:10].upper()}"
        
        return RechargeResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"Landline bill payment of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "landline_number": request.landline_number,
                "operator": request.operator_id,
                "payment_date": datetime.now().strftime("%Y-%m-%d")
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Landline payment failed: {str(e)}")


@router.post("/postpaid/pay", response_model=RechargeResponse)
async def postpaid_payment(request: PostpaidBillRequest):
    """Pay postpaid mobile bill"""
    try:
        transaction_id = f"PST{uuid.uuid4().hex[:10].upper()}"
        
        return RechargeResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"Postpaid bill payment of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "mobile_number": request.mobile_number,
                "operator": request.operator_id,
                "payment_date": datetime.now().strftime("%Y-%m-%d"),
                "billing_cycle": "Current month"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Postpaid payment failed: {str(e)}")


# Health check
@router.get("/health")
async def health_check():
    """Health check for recharge services"""
    return {
        "status": "healthy",
        "service": "recharge",
        "timestamp": datetime.now().isoformat()
    }
