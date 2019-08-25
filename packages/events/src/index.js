"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class EventBus {
    constructor(logger) {
        this.logger = logger;
        this.bus = new events_1.EventEmitter();
    }
    emit(eventName, ...args) {
        this.logger.info('Emit event', eventName, 'EventBus');
        return this.bus.emit(eventName, ...args);
    }
    on(action, handler) {
        this.logger.info('Set listener', action, 'EventBus');
        this.bus.on(action, handler);
        return this;
    }
    once(action, handler) {
        this.logger.info('Set once listener', action, 'EventBus');
        this.bus.once(action, handler);
        return this;
    }
}
exports.EventBus = EventBus;
//# sourceMappingURL=index.js.map