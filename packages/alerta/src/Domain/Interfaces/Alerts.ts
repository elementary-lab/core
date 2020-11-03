export enum SeverityLevels {
    critical,
    major,
    minor,
    warning

}
export enum AlertStatus {
    open = 1,
    assign = 2,
    ack = 3,
    closed = 4,
    expired = 5,
    blackout = 6,
    shelved = 7,
    unknown = 9,
}

export interface CreateAlertRequestInterface {
    attributes: {
        [key: string]: string;
    };
    correlate: string[];
    environment: string;
    event: string;
    group: string;
    origin: string;
    resource: string;
    service: string[];
    severity: SeverityLevels;
    tags: string[];
    text: string;
    type: string;
    value: string;
}
export interface CreateAlertResponseInterface {
    alert?: {
        attributes: Attributes;
        correlate?: (string)[] | null;
        createTime: string;
        customer?: null;
        duplicateCount: number;
        environment: string;
        event: string;
        group: string;
        history?: (HistoryEntity)[] | null;
        href: string;
        id: string;
        lastReceiveId: string;
        lastReceiveTime: string;
        origin: string;
        previousSeverity: string;
        rawData?: null;
        receiveTime: string;
        repeat: boolean;
        resource: string;
        service?: (string)[] | null;
        severity: SeverityLevels;
        status: AlertStatus;
        tags?: (string)[] | null;
        text: string;
        timeout: number;
        trendIndication: string;
        type: string;
        value: string;
    };
    id: string;
    status: string;
    message?: string;
}

export interface RetrieveAlertResponseInterface {
    alert: Alert;
    status: string;
    total: number;
}
export interface Alert {
    attributes: Attributes;
    correlate?: (string)[] | null;
    createTime: string;
    customer?: null;
    duplicateCount: number;
    environment: string;
    event: string;
    group: string;
    history?: (HistoryEntity)[] | null;
    href: string;
    id: string;
    lastReceiveId: string;
    lastReceiveTime: string;
    origin: string;
    previousSeverity: string;
    rawData?: null;
    receiveTime: string;
    repeat: boolean;
    resource: string;
    service?: (string)[] | null;
    severity: string;
    status: string;
    tags?: (string)[] | null;
    text: string;
    timeout: number;
    trendIndication: string;
    type: string;
    value: string;
}
export interface Attributes {
    flapping: boolean;
    ip: string;
    notify: boolean;
    region: string;
}
export interface HistoryEntity {
    event: string;
    href: string;
    id: string;
    severity: string;
    status?: null;
    text: string;
    type: string;
    updateTime: string;
    value: string;
}
