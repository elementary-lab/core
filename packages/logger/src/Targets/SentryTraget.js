"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractTarget_1 = require("./AbstractTarget");
const Sentry = require("@sentry/node");
class SentryTarget extends AbstractTarget_1.AbstractTarget {
    constructor(config) {
        super();
        this.configure(config);
        Sentry.init({
            dsn: this.dsn,
            release: this.release,
            environment: this.environment,
            attachStacktrace: true,
        });
    }
    export() {
        this.messages.map((item) => {
            let eventId;
            if (typeof item.data !== 'undefined' && typeof item.data.exception !== 'undefined') {
                eventId = Sentry.captureException(item.data.exception);
            }
            else {
                eventId = Sentry.captureEvent({
                    message: item.message,
                    stacktrace: this.convertTrace(item.trace)
                });
            }
        });
    }
    convertTrace(trace) {
        let newTrace = {
            frames: [],
            frames_omitted: [1, 2]
        };
        trace.map((item) => {
            newTrace.frames.push({
                abs_path: item.file,
                lineno: item.lineNumber,
                colno: item.column,
                vars: item.arguments
            });
        });
        return newTrace;
    }
}
exports.SentryTarget = SentryTarget;
//# sourceMappingURL=SentryTraget.js.map