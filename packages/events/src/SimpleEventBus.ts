import { EventEmitter } from 'events';
import { LoggerInterface } from '@elementary-lab/standards/src/LoggerInterface';
import { EventBusInterface } from '@elementary-lab/standards/src/EventBusInterface';

export class SimpleEventBus implements EventBusInterface<SimpleEventBus> {
    private bus: EventEmitter;
    private logger: LoggerInterface;

    public constructor(logger: LoggerInterface) {
        this.logger = logger;
        this.bus = new EventEmitter();
    }

    public emit(eventName: string, ...args): boolean {
        this.logger.debug('Emit event', eventName, 'SimpleEventBus');
        return this.bus.emit(eventName, ...args);
    }

    public on(action: string, handler: (...args: any[]) => void): SimpleEventBus {
        this.logger.debug('Set listener', action, 'SimpleEventBus');
        this.bus.on(action, handler);
        return this;
    }

    public once(action: string, handler: (...args: any[]) => void): SimpleEventBus {
        this.logger.debug('Set once listener', action, 'SimpleEventBus');
        this.bus.once(action, handler);
        return this;
    }

    public listenerCount(action: string): number {
        return this.bus.listenerCount(action);
    }


    /**
     *
     * @param action
     */
    public removeListener(action: string): Promise<SimpleEventBus> {
        return new Promise<SimpleEventBus>((resolve): void => {
            this.logger.debug('Remove listener', action, 'EventBus');
            this.bus.removeListener(action, () => {
                this.logger.debug('Remove listener done', action, 'EventBus');
                resolve(this);
            });
        });
    }
}
