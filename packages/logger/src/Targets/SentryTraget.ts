import {MessageEntity} from '../Entities/MessageEntity';
import {AbstractTarget} from './AbstractTarget';
import * as Sentry from '@sentry/node';
import {StackFrame} from 'stacktrace-parser';
import {Stacktrace} from '@sentry/node';
import {TargetConfigInterface} from "@elementary-lab/logger/Interface/LoggerConfigInterface";

export class SentryTarget extends AbstractTarget implements SentryTargetConfig {

    dsn: string;
    environment: string;
    release: string;

    public constructor(config: SentryTargetConfig) {
        super();
        this.configure(config);
        Sentry.init({
            dsn: this.dsn,
            release: this.release,
            environment: this.environment,
            attachStacktrace: true,
        });
    }

    public export(): void {
        this.messages.map((item: MessageEntity) => {
            let eventId;
            if (typeof item.data !== 'undefined' && typeof item.data.exception !== 'undefined') {
                eventId = Sentry.captureException(item.data.exception);
            } else {
                eventId = Sentry.captureEvent({
                    message: item.message,
                    stacktrace: this.convertTrace(item.trace)
                });
            }
            //Core.debug('Send event to Sentry', [eventId], 'Logger');
        });
    }

    private convertTrace(trace:StackFrame[]): Stacktrace {
        let newTrace:Stacktrace = {
            frames: [],
            frames_omitted:[1, 2]
        };
        trace.map((item: StackFrame) => {
            newTrace.frames.push({
                abs_path: item.file,
                lineno:item.lineNumber,
                colno: item.column,
                vars: item.arguments
            });
        });
        return newTrace;
    }

}


interface SentryTargetConfig extends TargetConfigInterface {
    dsn: string;
    environment: string;
    release: string;
}
