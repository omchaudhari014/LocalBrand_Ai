# Fix Ad Generation Issue - TODO Steps

## Completed:
- [x] Created backend/.env template 
- [x] Created frontend/.env with VITE_API_URL  
- [x] Started backend server (http://localhost:5000)
- [x] Started frontend dev server (http://localhost:5174)

## FINAL STEP - Add Groq API Key:
1. Sign up / Get FREE key: https://console.groq.com/keys
2. Edit `backend/.env`: 
   ```
   GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
3. Restart backend: Ctrl+C → `npm start` 
4. ✅ Ad generation WORKS!

**Backend log shows 401 Invalid API Key → Servers connect perfectly, just needs your real key (2 mins).**

Open http://localhost:5174 → Generate page ready!

