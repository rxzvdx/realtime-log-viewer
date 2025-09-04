# Real-Time Log Viewer


Two services:
- **server/**: WebSocket generator on `ws://localhost:8080`
- **client/**: React UI on `http://localhost:4173`


## Run locally (no Docker)
```bash
# Terminal 1
cd server && npm install && npm run dev
# Terminal 2
cd client && npm install && npm run dev