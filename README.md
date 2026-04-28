
# BridgeTalk

BridgeTalk is a voice-based AI assistant web application that allows users to interact using speech and text.

## Features

- 🎤 Voice-to-Text (Speech Recognition)
- 🔊 Text-to-Speech (AI replies spoken aloud)
- 💬 Chat interface with AI responses
- 💾 MongoDB storage for messages
- ⚡ Real-time interaction using REST API

## Tech Stack

- Frontend: React.js, TypeScript, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- API: REST API
- Voice: Web Speech API (Speech-to-Text & Text-to-Speech)
- HTTP Client: Axios

## How it works

1. User speaks using microphone
2. Voice is converted into text
3. Text is sent to backend using Axios
4. Backend processes and stores data in MongoDB
5. AI response is sent back
6. Response is shown and read aloud using Text-to-Speech

## Run the project

### Frontend
npm install
npm run dev

### Frontend
cd server
npm install
node index.js

## Author
Menaka
