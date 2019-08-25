"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../Types");
const AbstractTarget_1 = require("./AbstractTarget");
const winston = require("winston");
class WinstonTarget extends AbstractTarget_1.AbstractTarget {
    constructor() {
        super();
        this.messagePrefixTemplate = '[{date}][{logLevel}][{category}] {text} [{userData}]';
        this.logger = winston.createLogger(this.loggerOptions);
    }
    export() {
        this.messages.map((item) => {
            let string = this.getMessagePrefixTemplate();
            string = string.replace('{date}', this.getTime(item.time));
            string = string.replace('{logLevel}', Types_1.LogLevelString[item.level]);
            string = string.replace('{category}', item.category);
            string = string.replace('{text}', item.message);
            if (item.data !== undefined) {
                string = string.replace('{userData}', JSON.stringify(item.data));
            }
            else {
                string = string.replace('{userData}', '');
            }
            switch (item.level) {
                case Types_1.LogLevel.EMERGENCY:
                    console.error(string);
                    break;
                case Types_1.LogLevel.DEBUG:
                    console.debug(string);
                    break;
                case Types_1.LogLevel.PROFILE:
                    console.profile(string);
                    break;
                case Types_1.LogLevel.WARNING:
                    console.warn(string);
                    break;
                default:
                    console.info(string);
            }
        });
    }
    getMessagePrefixTemplate() {
        return this.messagePrefixTemplate;
    }
}
exports.WinstonTarget = WinstonTarget;
//# sourceMappingURL=WinstonTraget.js.map