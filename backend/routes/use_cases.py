from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
import random
import string

router = APIRouter(prefix="/use-cases", tags=["use-cases"])

# Pydantic Models
class MetroRegistration(BaseModel):
    city: str
    transport_type: str
    station_id: Optional[str] = None
    palm_id: str

class SchoolRegistration(BaseModel):
    city: str
    institution_id: str
    user_type: str  # student, parent, staff
    palm_id: str
    student_id: Optional[str] = None

class OfficeRegistration(BaseModel):
    city: str
    company_id: str
    employee_id: str
    palm_id: str

class FamilyMember(BaseModel):
    name: str
    relationship: str
    age: int
    palm_id: Optional[str] = None

class FamilyLimit(BaseModel):
    member_id: str
    daily_limit: float
    allowed_categories: List[str]

# Mock Data
CITIES = [
    {"id": "bangalore", "name": "Bangalore", "state": "Karnataka"},
    {"id": "mumbai", "name": "Mumbai", "state": "Maharashtra"},
    {"id": "delhi", "name": "Delhi", "state": "Delhi"},
    {"id": "chennai", "name": "Chennai", "state": "Tamil Nadu"},
    {"id": "hyderabad", "name": "Hyderabad", "state": "Telangana"},
    {"id": "pune", "name": "Pune", "state": "Maharashtra"}
]

METRO_STATIONS = {
    "bangalore": [
        {"id": "mg-road", "name": "MG Road", "line": "Purple Line", "palmPay_enabled": True},
        {"id": "cubbon-park", "name": "Cubbon Park", "line": "Purple Line", "palmPay_enabled": True},
        {"id": "trinity", "name": "Trinity", "line": "Green Line", "palmPay_enabled": False},
        {"id": "whitefield", "name": "Whitefield", "line": "Purple Line", "palmPay_enabled": True},
        {"id": "kr-market", "name": "KR Market", "line": "Green Line", "palmPay_enabled": True}
    ],
    "mumbai": [
        {"id": "andheri", "name": "Andheri", "line": "Blue Line", "palmPay_enabled": True},
        {"id": "ghatkopar", "name": "Ghatkopar", "line": "Red Line", "palmPay_enabled": True},
        {"id": "versova", "name": "Versova", "line": "Blue Line", "palmPay_enabled": False}
    ],
    "delhi": [
        {"id": "rajiv-chowk", "name": "Rajiv Chowk", "line": "Yellow Line", "palmPay_enabled": True},
        {"id": "connaught-place", "name": "Connaught Place", "line": "Yellow Line", "palmPay_enabled": True},
        {"id": "kashmere-gate", "name": "Kashmere Gate", "line": "Red Line", "palmPay_enabled": True}
    ]
}

SCHOOLS = {
    "bangalore": [
        {"id": "school-1", "name": "Bangalore International School", "type": "School", "services": ["attendance", "canteen", "fees"], "students": 1200},
        {"id": "college-1", "name": "IISc Bangalore", "type": "College", "services": ["attendance", "canteen", "library"], "students": 3500},
        {"id": "school-2", "name": "Ryan International School", "type": "School", "services": ["attendance", "canteen", "fees", "transport"], "students": 800},
        {"id": "school-3", "name": "DPS Whitefield", "type": "School", "services": ["attendance", "canteen", "fees", "sports"], "students": 1500},
        {"id": "college-2", "name": "Christ University", "type": "College", "services": ["attendance", "canteen", "library", "gym"], "students": 4500}
    ],
    "mumbai": [
        {"id": "school-4", "name": "Dhirubhai Ambani International School", "type": "School", "services": ["attendance", "canteen", "fees"], "students": 950},
        {"id": "college-3", "name": "IIT Bombay", "type": "College", "services": ["attendance", "canteen", "library", "gym"], "students": 8000},
        {"id": "school-5", "name": "Cathedral School", "type": "School", "services": ["attendance", "canteen", "fees"], "students": 600},
        {"id": "college-4", "name": "NMIMS Mumbai", "type": "College", "services": ["attendance", "canteen", "library"], "students": 3000}
    ],
    "delhi": [
        {"id": "school-6", "name": "The Shri Ram School", "type": "School", "services": ["attendance", "canteen", "fees"], "students": 1100},
        {"id": "college-5", "name": "IIT Delhi", "type": "College", "services": ["attendance", "canteen", "library", "gym"], "students": 7000},
        {"id": "school-7", "name": "Modern School", "type": "School", "services": ["attendance", "canteen", "fees", "transport"], "students": 1800}
    ]
}

OFFICES = {
    "bangalore": [
        {"id": "office-1", "name": "Tech Park - Manyata", "company": "Multiple Tenants", "services": ["access", "canteen", "parking"], "employees": 5000},
        {"id": "office-2", "name": "Infosys Campus", "company": "Infosys", "services": ["access", "canteen", "parking", "gym"], "employees": 12000},
        {"id": "office-3", "name": "Brigade Gateway", "company": "Mixed", "services": ["access", "canteen"], "employees": 3000},
        {"id": "office-4", "name": "Embassy Golf Links", "company": "Multiple Tenants", "services": ["access", "canteen", "parking", "gym"], "employees": 8000},
        {"id": "office-5", "name": "RMZ Ecoworld", "company": "Multiple Tenants", "services": ["access", "canteen", "parking"], "employees": 15000}
    ],
    "mumbai": [
        {"id": "office-6", "name": "BKC Corporate Tower", "company": "Multiple", "services": ["access", "canteen", "parking"], "employees": 4500},
        {"id": "office-7", "name": "One BKC", "company": "Multiple Tenants", "services": ["access", "canteen", "parking", "gym"], "employees": 6000},
        {"id": "office-8", "name": "Jio World Centre", "company": "Reliance", "services": ["access", "canteen", "parking", "gym"], "employees": 3500}
    ],
    "delhi": [
        {"id": "office-9", "name": "Cyber Hub Gurgaon", "company": "Multiple Tenants", "services": ["access", "canteen", "parking"], "employees": 10000},
        {"id": "office-10", "name": "DLF Cyber City", "company": "Multiple Tenants", "services": ["access", "canteen", "parking", "gym"], "employees": 25000}
    ]
}

FAMILY_MEMBERS_DB = []

# Metro & Transit APIs
@router.get("/metro/cities")
async def get_metro_cities():
    """Get list of cities with metro services"""
    metro_cities = [city for city in CITIES if city["id"] in METRO_STATIONS]
    return {
        "status": "success",
        "cities": metro_cities
    }

@router.get("/metro/{city_id}/stations")
async def get_metro_stations(city_id: str, transport_type: str = "metro"):
    """Get metro stations for a city"""
    if city_id not in METRO_STATIONS:
        raise HTTPException(status_code=404, detail="City not found")
    
    stations = METRO_STATIONS[city_id]
    palmPay_count = sum(1 for s in stations if s["palmPay_enabled"])
    
    return {
        "status": "success",
        "city": next(c["name"] for c in CITIES if c["id"] == city_id),
        "transport_type": transport_type,
        "total_stations": len(stations),
        "palmPay_enabled_count": palmPay_count,
        "stations": stations
    }

@router.post("/metro/register")
async def register_metro(registration: MetroRegistration):
    """Register palm for metro transit"""
    transaction_id = "MTR" + ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))
    
    return {
        "status": "success",
        "message": "Palm registered for metro transit",
        "registration_id": transaction_id,
        "details": {
            "city": registration.city,
            "transport_type": registration.transport_type,
            "palm_id": registration.palm_id,
            "valid_from": datetime.now().isoformat(),
            "benefits": [
                "Tap-and-go entry/exit",
                "No cards or tickets needed",
                "Auto-recharge from wallet",
                "Journey history tracking"
            ]
        }
    }

# Schools & Colleges APIs
@router.get("/schools/cities")
async def get_school_cities():
    """Get list of cities with school services"""
    school_cities = [city for city in CITIES if city["id"] in SCHOOLS]
    return {
        "status": "success",
        "cities": school_cities
    }

@router.get("/schools/{city_id}/list")
async def get_schools(city_id: str, institution_type: Optional[str] = None):
    """Get schools/colleges for a city"""
    if city_id not in SCHOOLS:
        raise HTTPException(status_code=404, detail="City not found")
    
    institutions = SCHOOLS[city_id]
    if institution_type and institution_type != "all":
        institutions = [i for i in institutions if i["type"].lower() == institution_type.lower()]
    
    return {
        "status": "success",
        "city": next(c["name"] for c in CITIES if c["id"] == city_id),
        "count": len(institutions),
        "institutions": institutions
    }

@router.post("/schools/register")
async def register_school(registration: SchoolRegistration):
    """Register palm for school/college"""
    transaction_id = "SCH" + ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))
    
    return {
        "status": "success",
        "message": "Palm registered for institution",
        "registration_id": transaction_id,
        "details": {
            "institution_id": registration.institution_id,
            "user_type": registration.user_type,
            "palm_id": registration.palm_id,
            "student_id": registration.student_id,
            "linked_services": ["attendance", "canteen", "fees"],
            "valid_from": datetime.now().isoformat()
        }
    }

# Offices & Workplaces APIs
@router.get("/offices/cities")
async def get_office_cities():
    """Get list of cities with office services"""
    office_cities = [city for city in CITIES if city["id"] in OFFICES]
    return {
        "status": "success",
        "cities": office_cities
    }

@router.get("/offices/{city_id}/list")
async def get_offices(city_id: str):
    """Get offices/campuses for a city"""
    if city_id not in OFFICES:
        raise HTTPException(status_code=404, detail="City not found")
    
    return {
        "status": "success",
        "city": next(c["name"] for c in CITIES if c["id"] == city_id),
        "count": len(OFFICES[city_id]),
        "offices": OFFICES[city_id]
    }

@router.post("/offices/register")
async def register_office(registration: OfficeRegistration):
    """Register palm for office access"""
    transaction_id = "OFC" + ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))
    
    return {
        "status": "success",
        "message": "Palm registered for office access",
        "registration_id": transaction_id,
        "details": {
            "company_id": registration.company_id,
            "employee_id": registration.employee_id,
            "palm_id": registration.palm_id,
            "access_level": "Standard",
            "linked_services": ["access", "canteen", "parking"],
            "valid_from": datetime.now().isoformat()
        }
    }

# Palm Circle (Family) APIs
@router.post("/palm-circle/add-member")
async def add_family_member(member: FamilyMember):
    """Add a family member to Palm Circle"""
    member_id = "FAM" + ''.join(random.choices(string.digits, k=8))
    
    member_data = {
        "member_id": member_id,
        "name": member.name,
        "relationship": member.relationship,
        "age": member.age,
        "palm_id": member.palm_id,
        "added_date": datetime.now().isoformat(),
        "status": "active",
        "daily_limit": 500.0 if member.age < 18 else 2000.0,
        "allowed_categories": ["food", "transport", "education"]
    }
    
    FAMILY_MEMBERS_DB.append(member_data)
    
    return {
        "status": "success",
        "message": "Family member added successfully",
        "member": member_data
    }

@router.get("/palm-circle/members")
async def get_family_members():
    """Get all family members"""
    total_limit = sum(m["daily_limit"] for m in FAMILY_MEMBERS_DB)
    
    return {
        "status": "success",
        "family_name": "Your Palm Circle",
        "total_members": len(FAMILY_MEMBERS_DB),
        "total_daily_limit": total_limit,
        "shared_wallet_balance": 15000.0,
        "members": FAMILY_MEMBERS_DB
    }

@router.put("/palm-circle/member/{member_id}/limit")
async def update_member_limit(member_id: str, limit: FamilyLimit):
    """Update family member limits"""
    member = next((m for m in FAMILY_MEMBERS_DB if m["member_id"] == member_id), None)
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    
    member["daily_limit"] = limit.daily_limit
    member["allowed_categories"] = limit.allowed_categories
    
    return {
        "status": "success",
        "message": "Member limits updated",
        "member": member
    }

@router.post("/palm-circle/emergency-lock")
async def emergency_lock():
    """Emergency lock all family member transactions"""
    return {
        "status": "success",
        "message": "All Palm Circle transactions locked",
        "locked_members": len(FAMILY_MEMBERS_DB),
        "locked_at": datetime.now().isoformat()
    }

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "use-cases"}
