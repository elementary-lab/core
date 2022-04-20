import { EventBusInterface } from '@elementary-lab/standards/src/EventBusInterface';

export class SenecaEventBus implements EventBusInterface<SenecaEventBus> {
    public emit(eventName: string, ...args): boolean {
        throw Error('not implemented yet');
    }

    public on(action: string, handler: (...args: any[]) => void): SenecaEventBus {
        throw Error('not implemented yet');
    }

    public once(action: string, handler: (...args: any[]) => void): SenecaEventBus {
        throw Error('not implemented yet');
    }

    public removeListener(action: string): Promise<SenecaEventBus> {
        return Promise.reject();
    }

    public listenerCount(action: string): number {
        throw Error('not implemented yet');
    }

}
