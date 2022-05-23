import { EventInterface } from '@elementary-lab/standards/src/EventInterface';

export interface EventBusInterface<T> {
    emit(eventName: string | EventInterface, ...args): boolean;

    on(action: string, handler: (...args: any[]) => void): T;

    once(action: string, handler: (...args: any[]) => void): T;

    removeListener(action: string): Promise<T>;

    listenerCount(action: string): number
}
