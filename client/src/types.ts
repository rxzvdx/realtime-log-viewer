export type LogLevel = 'INFO' | 'WARN' | 'ERROR'
export type LogLine = {
    level: LogLevel
    message: string
    timestamp: string
    seq: number
}