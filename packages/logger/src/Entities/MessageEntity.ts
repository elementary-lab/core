import { LogLevel } from '../Types';
import { StackFrame } from 'stacktrace-parser';

export interface MessageEntity {
    category: string;
    level: LogLevel;
    time: Date;
    message: string;
    tags?: MessageTag[];
    data?: any;
    trace: StackFrame[];
    memoryUsage: number;
}

export interface MessageTag {
    [key: string]: string | boolean | number;
}
