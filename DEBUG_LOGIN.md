# Login Debugging Guide

## Quick Test Instructions

### Step 1: Open Developer Tools
1. Go to http://localhost:5173
2. Press `F12` to open DevTools
3. Go to the **Console** tab

### Step 2: Navigate to Login
1. Click "Sign In" button in the navbar
2. OR Navigate directly to http://localhost:5173/login

### Step 3: Enter Test Credentials
- **Email:** test@example.com
- **Password:** password123

### Step 4: Monitor Console
Look for these emoji logs when you click "Sign In":
- 🔍 Attempting login with: (should show email and password length)
- 📊 Response status: (should be 200)
- 📥 Response data: (should show token and user data)
- ✅ Login successful!
- 🔑 Token: (should show a token)
- 👤 User: (should show user details)
- 🚀 Navigating to /products...

### Step 5: Check Network Tab
1. Click the **Network** tab in DevTools
2. Click "Sign In" button
3. Look for a POST request to `http://localhost:4000/api/auth/login`
4. Click on it and check:
   - Status should be 200
   - Response should contain `success: true`, `token`, and `user`

### Step 6: Check Local Storage
1. Click **Application** or **Storage** tab
2. Look for Local Storage
3. Should see: `authToken`, `userId`, `userData`

---

## If Login Button Doesn't Respond

### Check 1: Form Submission
Run this in console:
```javascript
document.querySelector('form').onsubmit
```
Should show: `ƒ handleSubmit(e)`

### Check 2: Email Input
Run this in console:
```javascript
document.querySelector('input[name="email"]').value
```
Should show your entered email

### Check 3: Password Input
Run this in console:
```javascript
document.querySelector('input[name="password"]').value
```
Should show password dots (or text if visible)

### Check 4: Manual Fetch Test
Run this in console:
```javascript
fetch("http://localhost:4000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "test@example.com",
    password: "password123"
  })
})
.then(r => r.json())
.then(d => console.log("Response:", d))
.catch(e => console.error("Error:", e))
```
Should show successful login response

---

## If Backend Returns Error

### Check 1: User Exists
Run this in terminal:
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```
Should return: `"success":true`

### Check 2: Create Test User
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "phone":"9999999999",
    "address":"Test Address",
    "password":"password123"
  }'
```

### Check 3: Verify Backend Running
```bash
curl http://localhost:4000/api/test
```
Should return: `{"message":"Server is working!"}`

---

## If Navigation to /products Doesn't Happen

1. Check if `/products` route exists in App.jsx
2. Check if Products component exists
3. Run in console: `document.location.pathname` - should show `/products`
4. Check browser history - should show `/login` then `/products`

---

## Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Sign In button doesn't respond | Form not submitting | Check browser console for errors |
| "Invalid email or password" | User doesn't exist in DB | Create test user with register endpoint |
| No redirect after login | Navigation not working | Check React Router setup |
| Token not saved | localStorage issue | Check Application tab in DevTools |
| CORS error | Backend CORS not enabled | Verify server.js has CORS middleware |
| 404 error | Backend not running | Check `ps aux \| grep node` |

---

## Test User Credentials

- **Email:** test@example.com
- **Password:** password123

If this user doesn't exist, create it using the register endpoint.

---

## Helpful Commands

**Check if servers are running:**
```bash
ps aux | grep -E "node|mongod|vite" | grep -v grep
```

**Test backend login:**
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Check MongoDB:**
```bash
mongosh --eval "use Shopping; db.users.find().pretty()"
```

**View server logs:**
```bash
# In the terminal where you ran `npm run dev` in Frontend/
# Or check the Server terminal for backend logs
```
