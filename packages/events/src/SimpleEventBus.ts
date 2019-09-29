import { EventEmitter } from 'events';
import { LoggerInterface } from '@elementary-lab/standards/src/LoggerInterface';
import { EventBusInterface } from '@elementary-lab/standards/src/EventBusInterface';

export class SimpleEventBus implements EventBusInterface {
    private bus: EventEmitter;
    private logger: LoggerInterface;

    public constructor(logger: LoggerInterface) {
        this.logger = logger;
        this.bus = new EventEmitter();
    }

    public emit(eventName: string, ...args): boolean {
        this.logger.info('Emit event', eventName, 'SimpleEventBus');
        return this.bus.emit(eventName, ...args);
    }

    public on(action: string, handler: (...args: any[]) => void): SimpleEventBus {
        this.logger.info('Set listener', action, 'SimpleEventBus');
        this.bus.on(action, handler);
        return this;
    }

    public once(action: string, handler: (...args: any[]) => void): SimpleEventBus {
        this.logger.info('Set once listener', action, 'SimpleEventBus');
        this.bus.once(action, handler);
        return this;
    }
}
