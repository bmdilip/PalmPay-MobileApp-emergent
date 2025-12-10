from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import Optional
import random
import string

router = APIRouter(prefix="/investments", tags=["investments"])

# Pydantic Models
class MutualFundPurchase(BaseModel):
    fund_id: str
    amount: float
    sip_enabled: Optional[bool] = False
    sip_date: Optional[int] = None

class DigitalGoldPurchase(BaseModel):
    amount: float
    grams: Optional[float] = None

# Mock Data
MUTUAL_FUNDS = [
    {
        "id": "mf001",
        "name": "HDFC Balanced Advantage Fund",
        "category": "Hybrid",
        "rating": 4.5,
        "returns_1y": 18.5,
        "returns_3y": 15.2,
        "returns_5y": 14.8,
        "min_investment": 500,
        "risk": "Medium",
        "nav": 385.42,
        "aum": "₹45,280 Cr"
    },
    {
        "id": "mf002",
        "name": "SBI Small Cap Fund",
        "category": "Equity",
        "rating": 5.0,
        "returns_1y": 42.3,
        "returns_3y": 28.5,
        "returns_5y": 24.6,
        "min_investment": 500,
        "risk": "High",
        "nav": 125.67,
        "aum": "₹18,450 Cr"
    },
    {
        "id": "mf003",
        "name": "ICICI Prudential Liquid Fund",
        "category": "Debt",
        "rating": 4.0,
        "returns_1y": 6.8,
        "returns_3y": 6.2,
        "returns_5y": 6.5,
        "min_investment": 100,
        "risk": "Low",
        "nav": 315.89,
        "aum": "₹52,630 Cr"
    },
    {
        "id": "mf004",
        "name": "Axis Bluechip Fund",
        "category": "Equity",
        "rating": 4.5,
        "returns_1y": 22.4,
        "returns_3y": 18.7,
        "returns_5y": 16.9,
        "min_investment": 500,
        "risk": "Medium-High",
        "nav": 58.34,
        "aum": "₹35,420 Cr"
    },
    {
        "id": "mf005",
        "name": "Mirae Asset Large Cap Fund",
        "category": "Equity",
        "rating": 5.0,
        "returns_1y": 25.6,
        "returns_3y": 20.3,
        "returns_5y": 18.4,
        "min_investment": 500,
        "risk": "Medium-High",
        "nav": 98.76,
        "aum": "₹28,950 Cr"
    }
]

USER_PORTFOLIO = []

@router.get("/mutual-funds/list")
async def get_mutual_funds(category: Optional[str] = None):
    """Get list of available mutual funds"""
    funds = MUTUAL_FUNDS
    if category and category != "all":
        funds = [f for f in MUTUAL_FUNDS if f["category"].lower() == category.lower()]
    
    return {
        "status": "success",
        "count": len(funds),
        "funds": funds
    }

@router.get("/mutual-funds/{fund_id}")
async def get_fund_details(fund_id: str):
    """Get detailed information about a specific fund"""
    fund = next((f for f in MUTUAL_FUNDS if f["id"] == fund_id), None)
    if not fund:
        raise HTTPException(status_code=404, detail="Fund not found")
    
    # Add additional details
    fund_details = {
        **fund,
        "expense_ratio": round(random.uniform(0.5, 2.0), 2),
        "exit_load": "1% if redeemed within 1 year",
        "fund_manager": "Prashant Jain",
        "launch_date": "2010-05-15",
        "benchmark": "NIFTY 50"
    }
    
    return {
        "status": "success",
        "fund": fund_details
    }

@router.post("/mutual-funds/purchase")
async def purchase_mutual_fund(purchase: MutualFundPurchase):
    """Purchase mutual fund units"""
    fund = next((f for f in MUTUAL_FUNDS if f["id"] == purchase.fund_id), None)
    if not fund:
        raise HTTPException(status_code=404, detail="Fund not found")
    
    if purchase.amount < fund["min_investment"]:
        raise HTTPException(
            status_code=400, 
            detail=f"Minimum investment is ₹{fund['min_investment']}"
        )
    
    units = round(purchase.amount / fund["nav"], 4)
    transaction_id = "MF" + ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))
    
    # Add to portfolio
    portfolio_item = {
        "transaction_id": transaction_id,
        "fund_id": purchase.fund_id,
        "fund_name": fund["name"],
        "units": units,
        "nav": fund["nav"],
        "amount": purchase.amount,
        "purchase_date": datetime.now().isoformat(),
        "sip_enabled": purchase.sip_enabled,
        "sip_date": purchase.sip_date
    }
    USER_PORTFOLIO.append(portfolio_item)
    
    return {
        "status": "success",
        "message": "Mutual fund purchase successful",
        "transaction_id": transaction_id,
        "details": {
            "fund_name": fund["name"],
            "units_allocated": units,
            "nav": fund["nav"],
            "amount_invested": purchase.amount,
            "folio_number": "FO" + ''.join(random.choices(string.digits, k=8)),
            "sip_enabled": purchase.sip_enabled,
            "sip_date": purchase.sip_date if purchase.sip_enabled else None
        },
        "timestamp": datetime.now().isoformat()
    }

@router.get("/mutual-funds/portfolio")
async def get_portfolio():
    """Get user's mutual fund portfolio"""
    total_invested = sum(item["amount"] for item in USER_PORTFOLIO)
    total_current = sum(
        item["units"] * next(f["nav"] for f in MUTUAL_FUNDS if f["id"] == item["fund_id"])
        for item in USER_PORTFOLIO
    )
    
    return {
        "status": "success",
        "portfolio": {
            "total_invested": round(total_invested, 2),
            "current_value": round(total_current, 2),
            "total_returns": round(total_current - total_invested, 2),
            "returns_percentage": round(((total_current - total_invested) / total_invested * 100) if total_invested > 0 else 0, 2),
            "holdings": USER_PORTFOLIO
        }
    }

# Digital Gold APIs
GOLD_PRICE_PER_GRAM = 6250.50  # Current gold price in INR

@router.get("/digital-gold/price")
async def get_gold_price():
    """Get current digital gold price"""
    # Add slight random variation to simulate real-time pricing
    current_price = GOLD_PRICE_PER_GRAM + random.uniform(-50, 50)
    
    return {
        "status": "success",
        "gold_price": {
            "price_per_gram": round(current_price, 2),
            "price_per_10g": round(current_price * 10, 2),
            "currency": "INR",
            "last_updated": datetime.now().isoformat(),
            "change_24h": round(random.uniform(-2, 2), 2),
            "change_percentage": round(random.uniform(-0.5, 0.5), 2)
        }
    }

@router.post("/digital-gold/purchase")
async def purchase_digital_gold(purchase: DigitalGoldPurchase):
    """Purchase digital gold"""
    if purchase.amount < 10:
        raise HTTPException(status_code=400, detail="Minimum purchase amount is ₹10")
    
    current_price = GOLD_PRICE_PER_GRAM + random.uniform(-50, 50)
    grams_purchased = round(purchase.amount / current_price, 4)
    transaction_id = "GOLD" + ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))
    
    return {
        "status": "success",
        "message": "Digital gold purchase successful",
        "transaction_id": transaction_id,
        "details": {
            "amount_paid": purchase.amount,
            "gold_purchased": f"{grams_purchased}g",
            "rate_per_gram": round(current_price, 2),
            "total_gold_holding": f"{grams_purchased}g",  # In real app, add to existing holdings
            "current_value": purchase.amount,
            "vault_number": "VAULT" + ''.join(random.choices(string.digits, k=6)),
            "insured": True,
            "purity": "24K (99.9%)"
        },
        "timestamp": datetime.now().isoformat()
    }

@router.get("/digital-gold/holdings")
async def get_gold_holdings():
    """Get user's digital gold holdings"""
    # Mock holdings
    total_grams = round(random.uniform(5, 50), 4)
    current_price = GOLD_PRICE_PER_GRAM + random.uniform(-50, 50)
    current_value = total_grams * current_price
    invested_value = total_grams * (GOLD_PRICE_PER_GRAM - random.uniform(100, 500))
    
    return {
        "status": "success",
        "holdings": {
            "total_gold_grams": total_grams,
            "current_price_per_gram": round(current_price, 2),
            "current_value": round(current_value, 2),
            "invested_value": round(invested_value, 2),
            "returns": round(current_value - invested_value, 2),
            "returns_percentage": round(((current_value - invested_value) / invested_value * 100), 2),
            "last_purchase": (datetime.now() - timedelta(days=random.randint(1, 30))).isoformat()
        }
    }

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "investments"}
