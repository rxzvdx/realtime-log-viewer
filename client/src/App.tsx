import { useEffect, useRef, useState } from 'react'
import type { LogLine, LogLevel } from './types'


const WS_URL: string = (globalThis as any).__WS_URL__ || 'ws://localhost:8080'


export default function App() {
    const [lines, setLines] = useState<LogLine[]>([])
    const [connected, setConnected] = useState(false)
    const [paused, setPaused] = useState(false)
    const boxRef = useRef<HTMLDivElement>(null)
    const shouldStickRef = useRef(true)


    // stick-to-bottom logic
    useEffect(() => {
        const el = boxRef.current
        if (!el) return
        const onScroll = () => {
            const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4
            shouldStickRef.current = nearBottom
        }
        el.addEventListener('scroll', onScroll)
        return () => el.removeEventListener('scroll', onScroll)
    }, [])


    // autoscroll when new lines arrive
    useEffect(() => {
        const el = boxRef.current
        if (!el) return
        if (shouldStickRef.current) {
            el.scrollTop = el.scrollHeight
        }
    }, [lines])


    // websocket connection
    useEffect(() => {
        const ws = new WebSocket(WS_URL)


        ws.addEventListener('open', () => setConnected(true))
        ws.addEventListener('close', () => setConnected(false))
        ws.addEventListener('message', (ev) => {
            if (paused) return
            try {
                const obj = JSON.parse(ev.data as string) as LogLine
                setLines((prev) => [...prev, obj].slice(-1000)) // cap at 1000 lines
            } catch { }
        })


        return () => ws.close()
    }, [paused])


    const clear = () => setLines([])
    const pauseResume = () => setPaused((p) => !p)


    const color = (lvl: LogLevel) => lvl


    return (
        <div className="container">
            <h1>Real-Time Log Viewer</h1>
            <p className="small">WebSocket: {connected ? 'Connected' : 'Disconnected'} · Stick to bottom when at end · ATC-themed logs</p>


            <div className="toolbar">
                <button onClick={pauseResume}>{paused ? 'Resume' : 'Pause'}</button>
                <button onClick={clear}>Clear</button>
            </div>


            <div ref={boxRef} className="logbox">
                {lines.map((l) => (
                    <div key={l.seq} className={`line ${color(l.level)}`}>
                        <span className="badge">[{l.level}]</span>
                        <span className="small">{new Date(l.timestamp).toLocaleTimeString()} · </span>
                        <span>{l.message}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}