import { MessageEntity } from '../Entities/MessageEntity';
import { LogLevel } from '@elementary-lab/logger/src/Types/index';

export interface LoggerConfigInterface {
    flushInterval: number;
    traceLevel: number;
    targets: TargetConfigInterface[];
}

export interface TargetConfigInterface {
    enabled: boolean;
    categories?: string[];
    levels?: LogLevel[];
    except?: string[];
    prefix?: string;
    exportInterval?: number;
    messages?: MessageEntity[] | null;
}
