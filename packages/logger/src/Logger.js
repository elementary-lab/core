"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("./Types");
const stackTraceParser = require("stacktrace-parser");
class Logger {
    constructor(config) {
        this.flushInterval = 1000;
        this.traceLevel = 0;
        this.targets = [];
        this.messages = [];
        this.configure(config);
        this.init();
    }
    configure(config) {
        Object.keys(config).forEach((value) => {
            this[value] = config[value];
        });
    }
    init() {
        process.on('exit', () => {
            this.flush(this.messages, true);
        });
    }
    log(message, level, data, category = 'application', tags) {
        let time = new Date();
        let traces = [];
        if (this.traceLevel > 0) {
            let count = 0;
            let trace = stackTraceParser.parse(new Error().stack);
            trace.pop();
            trace.map((item) => {
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
            memoryUsage: process.memoryUsage().heapUsed
        });
        if (this.flushInterval > 0 && this.messages.length >= this.flushInterval) {
            this.flush(this.messages);
            this.messages = [];
        }
    }
    flush(messages, final = false) {
        let targetErrors = [];
        this.targets.map((target) => {
            if (target.enabled) {
                try {
                    target.collect(messages, final);
                }
                catch (exception) {
                    targetErrors.push({
                        level: Types_1.LogLevel.WARNING,
                        time: new Date(),
                        data: [
                            exception.name,
                            exception.message,
                            exception.stack
                        ],
                        message: 'Unable to send log via ' + target.constructor.name,
                        category: 'logger.core',
                        memoryUsage: process.memoryUsage().heapUsed,
                        trace: stackTraceParser.parse(new Error().stack)
                    });
                }
            }
        });
        if (targetErrors.length > 0) {
            this.flush(targetErrors, true);
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map