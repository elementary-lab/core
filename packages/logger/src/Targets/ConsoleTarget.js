"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../Types");
const AbstractTarget_1 = require("./AbstractTarget");
class ConsoleTarget extends AbstractTarget_1.AbstractTarget {
    constructor(config) {
        super();
        this.messagePrefixTemplate = '[{date}][{logLevel}][{category}] {text} [{userData}]';
        this.configure(config);
    }
    export() {
        this.messages.map((item) => {
            let string = this.getMessagePrefixTemplate();
            string = string.replace('{date}', this.getTime(item.time));
            string = string.replace('{logLevel}', Types_1.LogLevelString[item.level]);
            string = string.replace('{category}', item.category);
            string = string.replace('{text}', item.message);
            if (item.data !== undefined) {
                string = string.replace('{userData}', JSON.stringify(item.data, this.getCircularReplacer()));
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
    getCircularReplacer() {
        const seen = new WeakSet();
        return (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    }
    getMessagePrefixTemplate() {
        return this.messagePrefixTemplate;
    }
}
exports.ConsoleTarget = ConsoleTarget;
//# sourceMappingURL=ConsoleTarget.js.map