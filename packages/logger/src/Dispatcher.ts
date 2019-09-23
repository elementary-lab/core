import { LogLevel } from './Types';
import { MessageEntity, MessageTag } from './Entities/MessageEntity';
import { AbstractTarget } from './Targets/AbstractTarget';
import { StackFrame } from 'stacktrace-parser';
import * as stackTraceParser from 'stacktrace-parser';
import { LoggerConfigInterface, TargetConfigInterface } from './Interface/LoggerConfigInterface';

export class Dispatcher implements LoggerConfigInterface {
    public flushInterval = 1000;

    public traceLevel = 0;

    public targets: TargetConfigInterface[] = [];

    private messages: MessageEntity[] = [];

    public constructor(config: LoggerConfigInterface) {
        this.configure(config);
        this.init();
    }

    public configure(config: LoggerConfigInterface): void {
        Object.keys(config).forEach(value => {
            this[value] = config[value];
        });
    }

    public init(): void {
        process.on('exit', () => {
            this.flush(this.messages, true);
        });
    }

    public log(message: string, level: LogLevel, data?: any, category = 'application', tags?: MessageTag[]): void {
        const time = new Date();
        const traces: StackFrame[] = [];
        if (this.traceLevel > 0) {
            let count = 0;
            const trace = stackTraceParser.parse(new Error().stack);
            trace.pop();
            trace.map((item: StackFrame) => {
                if (count++ >= this.traceLevel) {
                    return;
                }
                traces.push(item);
            });
        }
        this.messages.push({
            level,
            time,
            data,
            message,
            tags,
            category,
            trace: traces,
            memoryUsage: process.memoryUsage().heapUsed,
        });

        if (this.flushInterval > 0 && this.messages.length >= this.flushInterval) {
            this.flush(this.messages);
            this.messages = [];
        }
    }

    public flush(messages: MessageEntity[], final = false): void {
        const targetErrors: MessageEntity[] = [];

        this.targets.map((target: AbstractTarget) => {
            if (target.enabled) {
                try {
                    target.collect(messages, final);
                } catch (exception) {
                    targetErrors.push({
                        level: LogLevel.WARNING,
                        time: new Date(),
                        data: [exception.name, exception.message, exception.stack],
                        message: 'Unable to send log via ' + target.constructor.name,
                        category: 'logger.core',
                        memoryUsage: process.memoryUsage().heapUsed,
                        trace: stackTraceParser.parse(new Error().stack),
                    });
                }
            }
        });
        if (targetErrors.length > 0) {
            this.flush(targetErrors, true);
        }
    }
}
