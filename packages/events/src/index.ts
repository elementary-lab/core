import { EventEmitter } from 'events';
import { LoggerInterface } from '@elementary-lab/standards/LoggerInterface';

export class EventBus {
  private bus: EventEmitter;
  private logger: LoggerInterface;

  public constructor(logger: LoggerInterface) {
    this.logger = logger;
    this.bus = new EventEmitter();
  }

  public emit(eventName: string, ...args): boolean {
    this.logger.info('Emit event', eventName, 'EventBus');
    return this.bus.emit(eventName, ...args);
  }

  public on(action: string, handler: (...args: any[]) => void): EventBus {
    this.logger.info('Set listener', action, 'EventBus');
    this.bus.on(action, handler);
    return this;
  }

  /**
   *
   * @param action
   * @param handler
   */
  public once(action: string, handler: (...args: any[]) => void): EventBus {
    this.logger.info('Set once listener', action, 'EventBus');
    this.bus.once(action, handler);
    return this;
  }
}
