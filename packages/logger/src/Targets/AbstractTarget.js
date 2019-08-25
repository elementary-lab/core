"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractTarget {
    constructor() {
        this.enabled = true;
        this.levels = [];
        this.categories = [];
        this.except = [];
        this.exportInterval = 1;
    }
    configure(config) {
        Object.keys(config).forEach((value) => {
            this[value] = config[value];
        });
    }
    collect(messages, final = false) {
        this.messages = this.filterMessages(messages, this.levels, this.categories, this.except);
        if (this.messages.length > 0 && (final || this.exportInterval > 0 && this.messages.length >= this.exportInterval)) {
            const oldExportInterval = this.exportInterval;
            this.exportInterval = 0;
            this.export();
            this.exportInterval = oldExportInterval;
        }
    }
    filterMessages(messages, levels = [], categories = [], except = []) {
        return messages.filter((value) => {
            return levels.includes(value.level);
        });
    }
    getTime(date) {
        return date.toISOString().replace(/T/, ' ').replace(/Z/, '');
    }
}
exports.AbstractTarget = AbstractTarget;
//# sourceMappingURL=AbstractTarget.js.map