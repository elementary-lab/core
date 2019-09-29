export interface EventBusInterface {
    emit(eventName: string, ...args): boolean;

    on(action: string, handler: (...args: any[]) => void): EventBusInterface;

    once(action: string, handler: (...args: any[]) => void): EventBusInterface;
}
