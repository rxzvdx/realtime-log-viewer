/**
 * Author: Antonio Rosado
 * Desc: Websocked log emitter. Emits a JSON log each second.
 * Date: 2025-09-03
 */

import { WebSocketServer, WebSocket } from 'ws'

const PORT = Number(process.env.PORT || 8080)
const wss = new WebSocketServer({ port: PORT })

// ATC lingo by severity
const TABLE = {
    INFO: [
        'Cleared for taxi',
        'Maintain present heading',
        'Altitutde set and checked',
        'Runway in sight'
    ],
    WARN: [
        'Caution: wake turbulence',
        'Hold short of runway',
        'Crosswind increasing'
    ],
    ERROR: [
        'Mayday! Engine anomaly',
        'TCAS RA: Climb, climb.',
        'Comms failure detected'
    ] 
}   as const

const LEVELS = ['INFO', 'WARN', 'ERROR'] as const
function rand<T>(arr: readonly T[]) { return arr[Math.floor(Math.random() * arr.length)] }

function makeLog() {
    const level = rand(LEVELS)
    const message = rand(TABLE[level])
    return {
        level,
        message,
        timestamp: new Date().toISOString(),
        seq: Date.now(),
    }
}

wss.on('connection', (ws) => {    
    // send 'hello' immediately
    ws.send(JSON.stringify({ level: 'INFO', message: 'Connected to tower', timestamp: new Date().toISOString(), seq: Date.now() }))
})

// broadcast every second
setInterval(() => {
    const payload = JSON.stringify(makeLog())
    for (const client of wss.clients) {
        try { client.send(payload) } catch {}
    }
}, 1000)

console.log(`[server] WebSocket listening on ws://localhost:${PORT}`)