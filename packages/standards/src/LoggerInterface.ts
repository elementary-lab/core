export interface LoggerInterface {
    info(message: string, context?: any, category?: string): void;
    emergency(message: string, context?: any, category?: string): void;
    error(message: string, context?: any, category?: string): void;
    debug(message: string, context?: any, category?: string): void;
    warn(message: string, context?: any, category?: string): void;
    profile(message: string, context?: any, category?: string): void;
}
