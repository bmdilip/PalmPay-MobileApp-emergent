#!/usr/bin/env python3
"""
PalmPay Backend API Test Suite
Tests all backend endpoints with mock data
"""

import requests
import json
import sys
from datetime import datetime

# Get backend URL from environment
BACKEND_URL = "https://app-evolution-40.preview.emergentagent.com/api"

class PalmPayAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, test_name, success, details="", response_data=None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        self.test_results.append({
            "test": test_name,
            "status": status,
            "success": success,
            "details": details,
            "response_data": response_data
        })
        print(f"{status} {test_name}")
        if details:
            print(f"    Details: {details}")
        if not success and response_data:
            print(f"    Response: {response_data}")
        print()

    def test_health_check(self):
        """Test GET /api/ - Health check endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_test("Health Check", True, "Correct response received")
                else:
                    self.log_test("Health Check", False, f"Unexpected message: {data}", data)
            else:
                self.log_test("Health Check", False, f"Status code: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Health Check", False, f"Exception: {str(e)}")

    def test_otp_request(self):
        """Test POST /api/auth/otp/request"""
        try:
            payload = {"phone": "+91 98765 43210"}
            response = self.session.post(f"{self.base_url}/auth/otp/request", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "success" and data.get("otp") == "123456":
                    self.log_test("OTP Request", True, "OTP request successful with test OTP")
                else:
                    self.log_test("OTP Request", False, f"Unexpected response structure", data)
            else:
                self.log_test("OTP Request", False, f"Status code: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("OTP Request", False, f"Exception: {str(e)}")

    def test_otp_verify(self):
        """Test POST /api/auth/otp/verify"""
        try:
            payload = {"phone": "+91 98765 43210", "otp": "123456"}
            response = self.session.post(f"{self.base_url}/auth/otp/verify", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                if "user" in data and "token" in data and "refreshToken" in data:
                    user = data["user"]
                    if user.get("phone") == "+91 98765 43210":
                        self.log_test("OTP Verify", True, "Authentication successful with valid user data")
                        return data["token"]  # Return token for future tests
                    else:
                        self.log_test("OTP Verify", False, "User data mismatch", data)
                else:
                    self.log_test("OTP Verify", False, "Missing required fields in response", data)
            else:
                self.log_test("OTP Verify", False, f"Status code: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("OTP Verify", False, f"Exception: {str(e)}")
        
        return None

    def test_otp_verify_invalid(self):
        """Test POST /api/auth/otp/verify with invalid OTP"""
        try:
            payload = {"phone": "+91 98765 43210", "otp": "000000"}
            response = self.session.post(f"{self.base_url}/auth/otp/verify", json=payload)
            
            if response.status_code == 401:
                self.log_test("OTP Verify (Invalid)", True, "Correctly rejected invalid OTP")
            else:
                self.log_test("OTP Verify (Invalid)", False, f"Expected 401, got {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("OTP Verify (Invalid)", False, f"Exception: {str(e)}")

    def test_get_current_user(self):
        """Test GET /api/users/me"""
        try:
            response = self.session.get(f"{self.base_url}/users/me")
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "name", "phone", "upiId", "walletBalance", "cbdcBalance"]
                if all(field in data for field in required_fields):
                    self.log_test("Get Current User", True, f"User profile retrieved: {data['name']}")
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_test("Get Current User", False, f"Missing fields: {missing}", data)
            else:
                self.log_test("Get Current User", False, f"Status code: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Get Current User", False, f"Exception: {str(e)}")

    def test_get_balances(self):
        """Test GET /api/balances"""
        try:
            response = self.session.get(f"{self.base_url}/balances")
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["upiBalance", "quickWalletBalance", "cbdcBalance"]
                if all(field in data for field in required_fields):
                    self.log_test("Get Balances", True, f"Balances: UPI={data['upiBalance']}, Wallet={data['quickWalletBalance']}, CBDC={data['cbdcBalance']}")
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_test("Get Balances", False, f"Missing fields: {missing}", data)
            else:
                self.log_test("Get Balances", False, f"Status code: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Get Balances", False, f"Exception: {str(e)}")

    def test_get_transactions(self):
        """Test GET /api/transactions"""
        try:
            response = self.session.get(f"{self.base_url}/transactions")
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    transaction = data[0]
                    required_fields = ["id", "type", "amount", "recipient", "status"]
                    if all(field in transaction for field in required_fields):
                        self.log_test("Get Transactions", True, f"Retrieved {len(data)} transactions")
                    else:
                        missing = [f for f in required_fields if f not in transaction]
                        self.log_test("Get Transactions", False, f"Missing fields in transaction: {missing}", transaction)
                else:
                    self.log_test("Get Transactions", False, "Expected non-empty list", data)
            else:
                self.log_test("Get Transactions", False, f"Status code: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Get Transactions", False, f"Exception: {str(e)}")

    def test_create_transaction(self):
        """Test POST /api/transactions"""
        try:
            payload = {
                "recipient": "test@palmpay",
                "amount": 100.0,
                "category": "upi",
                "method": "UPI"
            }
            response = self.session.post(f"{self.base_url}/transactions", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "type", "amount", "recipient", "status"]
                if all(field in data for field in required_fields):
                    if data["amount"] == 100.0 and data["recipient"] == "test@palmpay":
                        self.log_test("Create Transaction", True, f"Transaction created: {data['id']}")
                        return data["id"]  # Return transaction ID for future tests
                    else:
                        self.log_test("Create Transaction", False, "Transaction data mismatch", data)
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_test("Create Transaction", False, f"Missing fields: {missing}", data)
            else:
                self.log_test("Create Transaction", False, f"Status code: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Create Transaction", False, f"Exception: {str(e)}")
        
        return None

    def test_get_nearby_devices(self):
        """Test GET /api/devices/nearby"""
        try:
            response = self.session.get(f"{self.base_url}/devices/nearby")
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    device = data[0]
                    required_fields = ["id", "name", "address", "lat", "lng", "status"]
                    if all(field in device for field in required_fields):
                        self.log_test("Get Nearby Devices", True, f"Found {len(data)} nearby devices")
                    else:
                        missing = [f for f in required_fields if f not in device]
                        self.log_test("Get Nearby Devices", False, f"Missing fields in device: {missing}", device)
                else:
                    self.log_test("Get Nearby Devices", False, "Expected non-empty list", data)
            else:
                self.log_test("Get Nearby Devices", False, f"Status code: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Get Nearby Devices", False, f"Exception: {str(e)}")

    def test_claim_device(self):
        """Test POST /api/device/claim"""
        try:
            payload = {
                "userId": "test-user-123",
                "enrollCode": "123456",
                "deviceId": "device-001"
            }
            response = self.session.post(f"{self.base_url}/device/claim", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["status", "palmEnabled", "palmId", "linkedDevice"]
                if all(field in data for field in required_fields):
                    if data["status"] == "ok" and data["palmEnabled"] == True:
                        self.log_test("Claim Device", True, f"Device claimed successfully: {data['palmId']}")
                    else:
                        self.log_test("Claim Device", False, "Unexpected enrollment response", data)
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_test("Claim Device", False, f"Missing fields: {missing}", data)
            else:
                self.log_test("Claim Device", False, f"Status code: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Claim Device", False, f"Exception: {str(e)}")

    def test_claim_device_invalid_code(self):
        """Test POST /api/device/claim with invalid enrollment code"""
        try:
            payload = {
                "userId": "test-user-123",
                "enrollCode": "123",  # Invalid - too short
                "deviceId": "device-001"
            }
            response = self.session.post(f"{self.base_url}/device/claim", json=payload)
            
            if response.status_code == 400:
                self.log_test("Claim Device (Invalid Code)", True, "Correctly rejected invalid enrollment code")
            else:
                self.log_test("Claim Device (Invalid Code)", False, f"Expected 400, got {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Claim Device (Invalid Code)", False, f"Exception: {str(e)}")

    def test_initiate_device_payment(self):
        """Test POST /api/device/initiate-payment"""
        try:
            payload = {
                "userId": "test-user-123",
                "merchantId": "merchant-456",
                "amount": 250.0,
                "currency": "INR"
            }
            response = self.session.post(f"{self.base_url}/device/initiate-payment", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["deviceSessionId", "status", "qr"]
                if all(field in data for field in required_fields):
                    if data["status"] == "waiting_for_device":
                        self.log_test("Initiate Device Payment", True, f"Payment session created: {data['deviceSessionId']}")
                        return data["deviceSessionId"]  # Return session ID for next test
                    else:
                        self.log_test("Initiate Device Payment", False, "Unexpected payment status", data)
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_test("Initiate Device Payment", False, f"Missing fields: {missing}", data)
            else:
                self.log_test("Initiate Device Payment", False, f"Status code: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Initiate Device Payment", False, f"Exception: {str(e)}")
        
        return None

    def test_get_device_session(self, session_id):
        """Test GET /api/device/session/{session_id}"""
        if not session_id:
            self.log_test("Get Device Session", False, "No session ID provided from previous test")
            return
            
        try:
            response = self.session.get(f"{self.base_url}/device/session/{session_id}")
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["deviceSessionId", "status"]
                if all(field in data for field in required_fields):
                    if data["deviceSessionId"] == session_id:
                        self.log_test("Get Device Session", True, f"Session status: {data['status']}")
                    else:
                        self.log_test("Get Device Session", False, "Session ID mismatch", data)
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_test("Get Device Session", False, f"Missing fields: {missing}", data)
            else:
                self.log_test("Get Device Session", False, f"Status code: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Get Device Session", False, f"Exception: {str(e)}")

    def test_get_device_session_invalid(self):
        """Test GET /api/device/session/{session_id} with invalid session"""
        try:
            response = self.session.get(f"{self.base_url}/device/session/invalid-session-id")
            
            if response.status_code == 404:
                self.log_test("Get Device Session (Invalid)", True, "Correctly returned 404 for invalid session")
            else:
                self.log_test("Get Device Session (Invalid)", False, f"Expected 404, got {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Get Device Session (Invalid)", False, f"Exception: {str(e)}")

    def run_all_tests(self):
        """Run all backend API tests"""
        print("=" * 60)
        print("PalmPay Backend API Test Suite")
        print(f"Testing against: {self.base_url}")
        print("=" * 60)
        print()

        # Core API tests
        self.test_health_check()
        
        # Authentication tests
        self.test_otp_request()
        token = self.test_otp_verify()
        self.test_otp_verify_invalid()
        
        # User tests
        self.test_get_current_user()
        
        # Balance tests
        self.test_get_balances()
        
        # Transaction tests
        self.test_get_transactions()
        transaction_id = self.test_create_transaction()
        
        # Device tests
        self.test_get_nearby_devices()
        self.test_claim_device()
        self.test_claim_device_invalid_code()
        
        # Device payment flow tests
        session_id = self.test_initiate_device_payment()
        self.test_get_device_session(session_id)
        self.test_get_device_session_invalid()

        # Print summary
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        print()
        
        # Show failed tests
        failed_tests = [result for result in self.test_results if not result["success"]]
        if failed_tests:
            print("FAILED TESTS:")
            for test in failed_tests:
                print(f"❌ {test['test']}: {test['details']}")
        else:
            print("🎉 All tests passed!")
        
        print("=" * 60)
        
        return passed == total

if __name__ == "__main__":
    tester = PalmPayAPITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)