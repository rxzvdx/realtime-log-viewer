export type LogLevel = 'INFO' | 'WARN' | 'ERROR'
export type LogLine = {
    level: LogLevel         // severity
    message: string         // human legible text
    timestamp: string       // ISO datetime
    seq: number             // numeric ID for react keys
}