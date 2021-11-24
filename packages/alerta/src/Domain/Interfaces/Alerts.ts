export enum SeverityLevels {
    security = 'security',
    critical = 'critical',
    major = 'major',
    minor = 'minor',
    warning = 'warning',
    informational = 'informational',
    debug = 'debug',
    trace = 'trace',
    indeterminate = 'indeterminate',
    cleared = 'cleared',
    normal = 'normal',
    ok = 'ok',
    unknown = 'unknown',
}
export enum AlertStatus {
    open = 'open',
    assign = 'assign',
    ack = 'ack',
    closed = 'closed',
    expired = 'expired',
    blackout = 'blackout',
    shelved = 'shelved',
    unknown = 'unknown',
}

export interface CreateAlertRequestInterface {
    resource: string;
    event: string;
    attributes?: {
        [key: string]: string;
    };
    correlate?: string[];
    environment?: string;
    group?: string;
    origin?: string;
    service?: string[];
    severity?: SeverityLevels;
    status?: AlertStatus;
    tags?: string[];
    text?: string;
    type?: string;
    value?: string;
    createTime?: Date;
    rawData?: string;
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
