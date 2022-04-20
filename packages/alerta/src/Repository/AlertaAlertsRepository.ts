import { CreateAlertRequestInterface, CreateAlertResponseInterface} from '../Domain/Interfaces/Alerts';
import Axios, {AxiosInstance, AxiosResponse} from 'axios';

export class AlertaAlertsRepository {
    private readonly alertaToken: string;
    private axiosAgent: AxiosInstance;

    public constructor(alertaApiUrl: string, alertaToken: string, axios?: AxiosInstance) {
        this.alertaToken = alertaToken;
        this.axiosAgent = axios ?? Axios.create({ baseURL: alertaApiUrl, timeout: 5000 });
    }

    public async create(alert: CreateAlertRequestInterface): Promise<CreateAlertResponseInterface> {
        return new Promise<CreateAlertResponseInterface>((resolve, reject) => {
            this.axiosAgent
                .post<CreateAlertResponseInterface>('alert', alert, { headers: this.getAuthHeaders() })
                .then((response: AxiosResponse) => {
                    if (response.status === 201 && response.data.status === 'ok') {
                        resolve(response.data);
                    }
                })
                .catch((error) => {
                    let body;
                    if( error.isAxiosError === true ) {
                        body = {
                            message: error.message,
                            errno: error.errno,
                            code: error.code
                        }
                    } else if (typeof error.response !== 'undefined' && typeof error.response.data !== 'undefined') {
                        body = error.response.data;
                    } else {
                        body = error.response;
                    }
                    reject({
                        id: null,
                        status: 'fail',
                        message: 'Can not send new alert to Alerta',
                        data: body
                    });
                });
        });
    }

    public ping() {
        return new Promise<boolean|object>((resolve, reject) => {
            this.axiosAgent
                .get<string>('_', { headers: this.getAuthHeaders() })
                .then((response: AxiosResponse) => {
                    if (response.status === 200 && response.data === 'OK') {
                        resolve();
                    } else {
                        resolve();
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    protected getAuthHeaders(): object {
        return {
            'Authorization': 'Key ' + this.alertaToken,
            'Content-type': 'application/json',
        };
    }
}
