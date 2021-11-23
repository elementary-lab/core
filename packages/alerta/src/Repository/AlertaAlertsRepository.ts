import { CreateAlertRequestInterface, CreateAlertResponseInterface, SeverityLevels } from '../Domain/Interfaces/Alerts';
import Axios, { AxiosInstance } from 'axios';

export class AlertaAlertsRepository {
    private alertaToken: string;
    private axiosAgent: AxiosInstance;

    public constructor(alertaApiUrl: string, alertaToken: string) {
        this.alertaToken = alertaToken;
        this.axiosAgent = Axios.create({
            baseURL: alertaApiUrl,
        });
    }

    public async create(alert: CreateAlertRequestInterface): Promise<CreateAlertResponseInterface> {
        return new Promise<CreateAlertResponseInterface>((resolve, reject) => {
            this.axiosAgent
                .post<CreateAlertResponseInterface>('alert', alert, { headers: this.getAuthHeaders() })
                .then(response => {
                    if (response.status === 201 && response.data.status === 'ok') {
                        resolve(response.data);
                    }
                })
                .catch(() => {
                    reject({
                        id: null,
                        status: 'fail',
                        message: 'Can not send new alert to alerta',
                    });
                });
        });
    }

    protected getAuthHeaders(): object {
        return {
            Authorization: 'Key ' + this.alertaToken,
            'Content-type': 'application/json',
        };
    }
}
