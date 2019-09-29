import { EventBusInterface } from '@elementary-lab/standards/src/EventBusInterface';

export class SenecaEventBus implements EventBusInterface {
    public emit(eventName: string, ...args): boolean {
        throw Error('not implemented yet');
    }

    public on(action: string, handler: (...args: any[]) => void): SenecaEventBus {
        throw Error('not implemented yet');
    }

    public once(action: string, handler: (...args: any[]) => void): SenecaEventBus {
        throw Error('not implemented yet');
    }
}
