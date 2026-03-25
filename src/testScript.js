// Test file to verify login flow
// Copy and paste this into browser console at http://localhost:5173

console.log("🧪 Starting login flow verification...\n");

// Test 1: Check if backend is running
fetch("http://localhost:4000/api/test")
  .then(r => r.json())
  .then(d => console.log("✅ Backend test:", d))
  .catch(e => console.error("❌ Backend error:", e.message));

// Test 2: Check form elements
setTimeout(() => {
  const form = document.querySelector('form');
  const emailInput = document.querySelector('input[name="email"]');
  const passwordInput = document.querySelector('input[name="password"]');
  const submitBtn = document.querySelector('button[type="submit"]');
  
  console.log("\n📋 Form Elements Check:");
  console.log("  Form exists:", !!form);
  console.log("  Email input exists:", !!emailInput);
  console.log("  Password input exists:", !!passwordInput);
  console.log("  Submit button exists:", !!submitBtn);
  
  if (submitBtn) {
    console.log("  Submit button text:", submitBtn.textContent);
  }
}, 500);

// Test 3: Manual login test
setTimeout(() => {
  console.log("\n🔐 Manual Login Test (using test@example.com / password123):");
  
  fetch("http://localhost:4000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "test@example.com",
      password: "password123"
    })
  })
  .then(r => {
    console.log("  Status:", r.status);
    return r.json();
  })
  .then(d => {
    if (d.success) {
      console.log("✅ Login response successful:", d);
    } else {
      console.log("❌ Login response error:", d);
    }
  })
  .catch(e => console.error("❌ Fetch error:", e.message));
}, 1000);

// Test 4: Check localStorage
setTimeout(() => {
  console.log("\n💾 LocalStorage Check:");
  console.log("  authToken:", localStorage.getItem("authToken") ? "✅ Present" : "❌ Missing");
  console.log("  userId:", localStorage.getItem("userId") ? "✅ Present" : "❌ Missing");
  console.log("  userData:", localStorage.getItem("userData") ? "✅ Present" : "❌ Missing");
}, 1500);

console.log("\n✅ Verification complete! Check console output above.");
