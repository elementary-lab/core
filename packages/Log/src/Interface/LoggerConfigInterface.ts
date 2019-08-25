import {MessageEntity} from '../Entities/MessageEntity';
import {LogLevel} from '@Core/Log/Types';

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
