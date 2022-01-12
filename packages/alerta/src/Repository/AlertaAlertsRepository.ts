import { CreateAlertRequestInterface, CreateAlertResponseInterface} from '../Domain/Interfaces/Alerts';
import Axios, { AxiosInstance } from 'axios';

export class AlertaAlertsRepository {
    private readonly alertaToken: string;
    private axiosAgent: AxiosInstance;

    public constructor(alertaApiUrl: string, alertaToken: string, axios?: AxiosInstance) {
        this.alertaToken = alertaToken;
        this.axiosAgent = axios ?? Axios.create({ baseURL: alertaApiUrl });
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
                    let body;
                    if (typeof error.response.data !== 'undefined') {
                        body = error.response.data;
                    } else {
                        body = error.response;
                    }

                    reject({
                        id: null,
                        status: 'fail',
                        message: 'Can not send new alert to alerta',
                        data: body
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
