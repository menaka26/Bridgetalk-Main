# 🚀 BridgeTalk - Quick Start Guide

## ⚡ Get Running in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- npm installed
- Firebase account (free)
- Google account (for APIs)

---

## Step 1: Setup Project (2 minutes)

```bash
# Navigate to project
cd "d:\Downloads\jayashree project\BridgeTalk"

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

---

## Step 2: Configure Firebase (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create Project"
3. Name it "BridgeTalk"
4. Agree to terms and create

5. In Project Settings, find:
   - API Key
   - Auth Domain
   - Project ID
   - Storage Bucket
   - Messaging Sender ID
   - App ID
   - Measurement ID

6. Add to `.env.local`:
```
VITE_FIREBASE_API_KEY=paste_your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

---

## Step 3: Enable Firebase Features (1 minute)

In Firebase Console:

### Enable Authentication
1. Go to Authentication
2. Click "Get started"
3. Enable "Email/Password"

### Create Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Choose "production mode"
4. Select a region
5. Click "Create"

---

## Step 4: Add Google Cloud APIs (Optional)

For advanced features:

1. Enable APIs:
   - Cloud Speech-to-Text API
   - Cloud Text-to-Speech API
   - Cloud Translation API
   - Gemini API

2. Create Service Account key
3. Add keys to `.env.local`:
```
VITE_GOOGLE_GEMINI_API_KEY=your_key
VITE_GOOGLE_CLOUD_SPEECH_API_KEY=your_key
VITE_GOOGLE_TRANSLATE_API_KEY=your_key
```

---

## Step 5: Start Development! (Run now)

```bash
npm run dev
```

Opens at: `http://localhost:5173`

---

## 🎯 First Steps

1. **Register Account**
   - Click "Register"
   - Enter email and password
   - Create display name

2. **Login**
   - Use your registered credentials

3. **Test Chat**
   - Type a message
   - Click "Send"
   - Check console for real-time updates

4. **Test Voice**
   - Click 🎤 button
   - Speak clearly
   - Message gets typed automatically

5. **Test Accessibility**
   - Click ♿ Settings
   - Try different font sizes
   - Toggle dark mode
   - Toggle text-to-speech

---

## 📝 Available Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build           # Build for production
npm run preview         # Preview build

# Code Quality
npm run lint            # Check code
npm run format          # Format code
npm run type-check      # Check types

# Testing
npm run test            # Run tests
npm run e2e             # Run E2E tests

# Accessibility
npm run accessibility-audit  # Audit a11y
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

### Firebase Not Working
- Check `.env.local` has all keys
- Verify project exists in Firebase
- Check security rules in Firestore

### Voice Not Working
- Check browser supports Web Speech API
- Allow microphone permission
- Test in Chrome/Edge first

### Accessibility Issues
- Test with NVDA or other screen reader
- Check keyboard navigation works
- Verify focus indicators visible

---

## 📚 Documentation

- **README.md** - Full documentation
- **REQUIREMENTS.txt** - Project requirements
- **PROJECT_STRUCTURE.md** - File structure
- **CONTRIBUTING.md** - How to contribute
- **CODE_FILES_INDEX.md** - Complete file list

---

## 🎨 File Locations

| What | Where |
|------|-------|
| Components | `src/components/` |
| Pages | `src/pages/` |
| Services | `src/services/` |
| Hooks | `src/hooks/index.ts` |
| Types | `src/types/index.ts` |
| Constants | `src/constants/index.ts` |
| Styles | `src/styles/` |
| Config | Root directory |

---

## 🔑 Key Features to Try

### 1. Real-Time Chat
- Send message → See it instantly
- No page refresh needed
- Messages persist in Firestore

### 2. Speech-to-Text
- Click 🎤 button
- Speak clearly
- See text appear as you speak

### 3. Text-to-Speech
- Send message
- Received messages read aloud
- Customizable voice settings

### 4. Accessibility
- ♿ Settings button
- Font size: small, medium, large, extra-large
- Contrast: normal, high
- Dark mode on/off
- Auto-read incoming messages

### 5. AI Features
- ✨ AI button with voice active
- Get message suggestions
- Simplify complex text
- Detect emotions

---

## 📱 Test on Mobile

```bash
# Get your local IP
# Windows: ipconfig
# Mac/Linux: ifconfig

# Start with IP
npm run dev -- --host

# Visit on mobile:
http://YOUR_IP:5173
```

---

## 🎯 Common Tasks

### Add New Component
1. Create file in `src/components/`
2. Add types to `src/types/index.ts`
3. Import and use in pages

### Add New Service
1. Create in `src/services/category/`
2. Create hook in `src/hooks/`
3. Use hook in components

### Change Styles
- Global: `src/styles/globals.css`
- A11y: `src/styles/accessibility.css`
- Tailwind: `tailwind.config.js`

### Add Constants
- Update `src/constants/index.ts`
- Use in components/services

---

## ✅ Checklist

- [ ] Dependencies installed
- [ ] Firebase project created
- [ ] `.env.local` configured
- [ ] Dev server running
- [ ] Can register user
- [ ] Can login
- [ ] Can send message
- [ ] Voice input works
- [ ] Accessibility settings work

---

## 🚀 Deployment

When ready to deploy:

```bash
# Build for production
npm run build

# Deploy to Firebase
firebase deploy

# Or Vercel
vercel

# Or Netlify
netlify deploy
```

---

## 📞 Help

1. Check documentation files
2. Review code in `src/`
3. Check browser console for errors
4. Test with simpler features first

---

## 🎉 You're Ready!

- ✅ Project setup
- ✅ All code created
- ✅ Documentation provided
- ✅ Ready to develop

**Start coding now!** 🚀

---

**Happy Coding!** 💻✨

