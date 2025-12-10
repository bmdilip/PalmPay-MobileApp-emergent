from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid
import random

router = APIRouter(prefix="/other-services", tags=["Other Services"])

# ==================== MODELS ====================

class HousingSocietyRequest(BaseModel):
    society_name: str
    flat_number: str
    amount: float
    payment_type: str  # maintenance/parking/other

class MunicipalTaxRequest(BaseModel):
    property_id: str
    ward_number: str
    amount: float
    city: str

class RentalPaymentRequest(BaseModel):
    property_address: str
    landlord_name: str
    amount: float
    month: str

class ClubMembershipRequest(BaseModel):
    membership_id: str
    club_name: str
    amount: float
    payment_type: str  # monthly/annual

class InsurancePremiumRequest(BaseModel):
    policy_number: str
    insurance_company: str
    amount: float
    policy_type: str  # life/health/vehicle

class LoanRepaymentRequest(BaseModel):
    loan_account: str
    bank_name: str
    amount: float
    loan_type: str  # home/personal/vehicle

class EducationFeeRequest(BaseModel):
    student_id: str
    institution_name: str
    amount: float
    fee_type: str  # tuition/hostel/exam

class ServiceResponse(BaseModel):
    transaction_id: str
    status: str
    message: str
    amount: float
    timestamp: str
    details: dict

# ==================== MOCK DATA ====================

INSURANCE_COMPANIES = [
    {"id": "lic", "name": "LIC of India"},
    {"id": "hdfc-life", "name": "HDFC Life"},
    {"id": "icici-pru", "name": "ICICI Prudential"},
    {"id": "sbi-life", "name": "SBI Life"},
    {"id": "max-life", "name": "Max Life"},
]

LOAN_BANKS = [
    {"id": "sbi", "name": "State Bank of India"},
    {"id": "hdfc-bank", "name": "HDFC Bank"},
    {"id": "icici-bank", "name": "ICICI Bank"},
    {"id": "axis-bank", "name": "Axis Bank"},
    {"id": "kotak", "name": "Kotak Mahindra Bank"},
]

# ==================== API ENDPOINTS ====================

@router.post("/housing-society/pay", response_model=ServiceResponse)
async def pay_housing_society(request: HousingSocietyRequest):
    """Pay housing society dues"""
    try:
        transaction_id = f"HSOC{uuid.uuid4().hex[:10].upper()}"
        
        return ServiceResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"Housing society payment of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "society_name": request.society_name,
                "flat_number": request.flat_number,
                "payment_type": request.payment_type,
                "payment_date": datetime.now().strftime("%Y-%m-%d"),
                "period": "Current month"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment failed: {str(e)}")


@router.post("/municipal-tax/pay", response_model=ServiceResponse)
async def pay_municipal_tax(request: MunicipalTaxRequest):
    """Pay municipal tax"""
    try:
        transaction_id = f"MTAX{uuid.uuid4().hex[:10].upper()}"
        
        return ServiceResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"Municipal tax payment of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "property_id": request.property_id,
                "ward_number": request.ward_number,
                "city": request.city,
                "payment_date": datetime.now().strftime("%Y-%m-%d"),
                "tax_year": datetime.now().year
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment failed: {str(e)}")


@router.post("/rental/pay", response_model=ServiceResponse)
async def pay_rental(request: RentalPaymentRequest):
    """Pay rental amount"""
    try:
        transaction_id = f"RENT{uuid.uuid4().hex[:10].upper()}"
        
        return ServiceResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"Rental payment of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "property_address": request.property_address,
                "landlord_name": request.landlord_name,
                "month": request.month,
                "payment_date": datetime.now().strftime("%Y-%m-%d")
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment failed: {str(e)}")


@router.post("/club-membership/pay", response_model=ServiceResponse)
async def pay_club_membership(request: ClubMembershipRequest):
    """Pay club membership fee"""
    try:
        transaction_id = f"CLUB{uuid.uuid4().hex[:10].upper()}"
        
        return ServiceResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"Club membership payment of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "membership_id": request.membership_id,
                "club_name": request.club_name,
                "payment_type": request.payment_type,
                "payment_date": datetime.now().strftime("%Y-%m-%d"),
                "valid_till": "Next year" if request.payment_type == "annual" else "Next month"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment failed: {str(e)}")


@router.post("/insurance/pay", response_model=ServiceResponse)
async def pay_insurance_premium(request: InsurancePremiumRequest):
    """Pay insurance premium"""
    try:
        transaction_id = f"INSR{uuid.uuid4().hex[:10].upper()}"
        
        return ServiceResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"Insurance premium payment of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "policy_number": request.policy_number,
                "insurance_company": request.insurance_company,
                "policy_type": request.policy_type,
                "payment_date": datetime.now().strftime("%Y-%m-%d"),
                "coverage_period": "1 year"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment failed: {str(e)}")


@router.post("/loan/repay", response_model=ServiceResponse)
async def repay_loan(request: LoanRepaymentRequest):
    """Repay loan EMI"""
    try:
        transaction_id = f"LOAN{uuid.uuid4().hex[:10].upper()}"
        
        return ServiceResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"Loan repayment of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "loan_account": request.loan_account,
                "bank_name": request.bank_name,
                "loan_type": request.loan_type,
                "payment_date": datetime.now().strftime("%Y-%m-%d"),
                "emi_month": datetime.now().strftime("%B %Y")
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment failed: {str(e)}")


@router.post("/education/pay", response_model=ServiceResponse)
async def pay_education_fee(request: EducationFeeRequest):
    """Pay education fee"""
    try:
        transaction_id = f"EDU{uuid.uuid4().hex[:10].upper()}"
        
        return ServiceResponse(
            transaction_id=transaction_id,
            status="success",
            message=f"Education fee payment of ₹{request.amount} successful!",
            amount=request.amount,
            timestamp=datetime.now().isoformat(),
            details={
                "student_id": request.student_id,
                "institution_name": request.institution_name,
                "fee_type": request.fee_type,
                "payment_date": datetime.now().strftime("%Y-%m-%d"),
                "academic_year": f"{datetime.now().year}-{datetime.now().year + 1}"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment failed: {str(e)}")


@router.get("/insurance/companies")
async def get_insurance_companies():
    """Get list of insurance companies"""
    return INSURANCE_COMPANIES


@router.get("/loan/banks")
async def get_loan_banks():
    """Get list of banks for loan repayment"""
    return LOAN_BANKS


# Health check
@router.get("/health")
async def health_check():
    """Health check for other services"""
    return {
        "status": "healthy",
        "service": "other-services",
        "timestamp": datetime.now().isoformat()
    }
