export interface LoggerInterface {
  info(message: string, context?: any, category?: string);
  emergency(message: string, context?: any, category?: string);
  error(message: string, context?: any, category?: string);
  debug(message: string, context?: any, category?: string);
  warn(message: string, context?: any, category?: string);
  profile(message: string, context?: any, category?: string);
}
