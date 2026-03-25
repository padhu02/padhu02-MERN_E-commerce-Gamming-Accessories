// Test file to verify login works
// Run this in browser console after registering a test user

const testLogin = async () => {
  try {
    console.log("Starting login test...");
    
    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@example.com",  // Change this to your registered email
        password: "password123"      // Change this to your password
      }),
    });

    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Response data:", data);

    if (response.ok) {
      console.log("✅ Login successful!");
      console.log("Token:", data.token);
      console.log("User:", data.user);
    } else {
      console.log("❌ Login failed:", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// Run the test
testLogin();
