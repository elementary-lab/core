export interface EventBusInterface<T> {
    emit(eventName: string, ...args): boolean;

    on(action: string, handler: (...args: any[]) => void): T;

    once(action: string, handler: (...args: any[]) => void): T;

    removeListener(action: string): Promise<T>;

    listenerCount(action: string): number
}
