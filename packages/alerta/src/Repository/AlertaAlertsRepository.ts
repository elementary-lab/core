import { CreateAlertRequestInterface, CreateAlertResponseInterface, SeverityLevels } from '../Domain/Interfaces/Alerts';
import Axios, { AxiosInstance } from 'axios';

export class AlertaAlertsRepository {
    private alertaToken: string;
    private axiosAgent: AxiosInstance;

    public constructor(alertaApiUrl: string, alertaToken: string, axios?: AxiosInstance) {
        this.alertaToken = alertaToken;
        this.axiosAgent = axios ?? Axios.create({baseURL: alertaApiUrl});
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
                .catch((error) => {
                    reject({
                        id: null,
                        status: 'fail',
                        message: 'Can not send new alert to alerta',
                        data: error.response.data
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
