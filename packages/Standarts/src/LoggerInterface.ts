export interface LoggerInterface {
    info(message: string, data?: any, category?: string)
    emergency(message: string, data?: any, category?: string)
    error(message: string, data?: any, category?: string)
    debug(message: string, data?: any, category?: string)
    warn(message: string, data?: any, category?: string)
    profile(message: string, data?: any, category?: string)
}
