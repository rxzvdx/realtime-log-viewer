# Real-Time Log Viewer

A two part application for streaming and viewing logs in real time via WebSockets.  

- **server/** → Node.js WebSocket server sending simulated log messages on `ws://localhost:8080`  
- **client/** → React + Vite frontend displaying the log stream on `http://localhost:4173`  

---

## Features

- Real-time log streaming via WebSockets  
- Log levels: INFO, WARN, ERROR with color-coded badges  
- Pause/Resume + Clear buttons for log control  
- Auto-scroll behavior with manual override  
- Dockerized for consistent deployment  

---

## Architecture & Implementation

### Server
- **Stack**: Node.js + `ws` WebSocket library  
- **Port**: `8080`  
- **Behavior**:  
  - Sends JSON log objects with fields `{ level, message, timestamp, seq }`  
  - Simulates random log levels at regular intervals  
  - Allows multiple clients to connect simultaneously  

### Client
- **Stack**: React 18 + Vite + TypeScript  
- **UI**: Minimal dark theme with control buttons  
- **Behavior**:  
  - Connects to `ws://localhost:8080`  
  - Renders log entries with timestamps + severity colors  
  - Supports Pause, Resume, and Clear actions  

---

## Project Structure

```

realtime-log-viewer/
├── server/          # WebSocket server
│   ├── src/index.ts
│   └── package.json
│
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
|   |   └── types.ts
│   ├── vite.config.ts
│   └── package.json
|   └── tsconfig.json 
│
├── docker-compose.yml
└── README.md

````

---

## Run Locally (No Docker)

**Terminal 1** – Start the WebSocket server:
```bash
cd server
npm install
npm run dev
````

**Terminal 2** – Start the React frontend:

```bash
cd client
npm install
npm run dev
```

Visit: [http://localhost:4173](http://localhost:4173)

---

## Docker Support

To run both services in containers:

```bash
docker compose up --build
```

This will:

* Build the **server** container on port 8080
* Build the **client** container on port 4173

Visit: [http://localhost:4173](http://localhost:4173)

---

## Controls in the UI

| Button     | Behavior                                     |
| ---------- | -------------------------------------------- |
| **Pause**  | Stops appending new logs temporarily         |
| **Resume** | Resumes the real-time log stream             |
| **Clear**  | Clears all logs from the display             |
| **Scroll** | Auto-scrolls unless user manually scrolls up |

---

## CI/CD Pipeline (GitHub Actions)

Workflow at `.github/workflows/ci.yml`:

* Installs dependencies
* Runs lint and build jobs
* Fails on errors before merging to `main`

---

## Design Decisions

| Choice                   | Reason                                       |
| ------------------------ | -------------------------------------------- |
| **WebSockets (`ws`)**    | Lightweight, native real-time communication  |
| **React + Vite + TS**    | Fast dev server, hot reload, type safety     |
| **Dockerized**           | Consistent environments for dev/prod         |
| **Minimal dark theme**   | Easy readability for logs                    |
| **Pause/Clear controls** | Basic interactivity for real-world usability |

---

## Future Enhancements

* Multiple log streams from different sources
* Log level filtering + search functionality
* Persistent log storage (e.g., DB or file output)
* Kubernetes deployment manifests
---