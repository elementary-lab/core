import { Dispatcher } from './Dispatcher';
import { LoggerConfigInterface } from './Interface/LoggerConfigInterface';
import { LogLevel } from './Types';
import { LoggerInterface } from '@elementary-lab/standards/src/LoggerInterface';

export class Logger implements LoggerInterface {
    private dispatcher: Dispatcher;

    public constructor(config: LoggerConfigInterface) {
        this.dispatcher = new Dispatcher(config);
    }

    public debug(message: string, context?: any, category?: string): void {
        this.dispatcher.log(message, LogLevel.DEBUG, context, category);
    }

    public emergency(message: string, context?: any, category?: string): void {
        this.dispatcher.log(message, LogLevel.EMERGENCY, context, category);
    }

    public error(message: string, context?: any, category?: string): void {
        this.dispatcher.log(message, LogLevel.ERROR, context, category);
    }

    public info(message: string, context?: any, category?: string): void {
        this.dispatcher.log(message, LogLevel.INFO, context, category);
    }

    public profile(message: string, context?: any, category?: string): void {
        this.dispatcher.log(message, LogLevel.PROFILE, context, category);
    }

    public warn(message: string, context?: any, category?: string): void {
        this.dispatcher.log(message, LogLevel.WARNING, context, category);
    }
}
