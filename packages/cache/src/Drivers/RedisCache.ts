
import {ClientOpts, RedisClient} from "redis";
import {Cache} from "@elementary-lab/cache/index";

export class RedisCache extends Cache {

    private readonly _config: ClientOpts;

    private _connection?: RedisClient;

    constructor(config: ClientOpts) {
        super();
        this._config = config;
    }

    private getConnection(): RedisClient {

        if (this._connection == null) {
            this._connection = new RedisClient(this._config);
        }
        return this._connection;
    }

    async exists(key: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            key = this.buildKey(key);
            let res = this.getConnection().exists(key,(error, reply) => {
                if(error || reply == 0 ) {
                    reject(error)
                } else {
                    resolve()
                }
            });
            if(res == false) {
                reject()
            }
        });
    }


    protected async getValue(key: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.getConnection().get(key, (error: Error, data: string) => {
                if(error) {
                    reject(error)
                } else {
                    resolve(data);
                }
            });
        });
    }


    protected addValue(key: string, value: any, duration: number = 0): Promise<any> {
        return new Promise((resolve, reject) => {
            if(duration === 0) {
                this.getConnection().set(key, value, 'EX', (error, data) => {
                    if(error) {
                        reject(error)
                    } else {
                        resolve(data);
                    }
                });
            } else {
                duration = duration * 1000;
                this.getConnection().sendCommand('SET', [key, value, 'PX', duration, 'NX'], (error, data) => {
                    if(error) {
                        reject(error)
                    } else {
                        resolve(data);
                    }
                });
            }
        });

    }

    /**
     *
     * @param key
     * @param value
     * @param duration
     */
    protected async setValue(key: string, value: any, duration: number = 0): Promise<any> {
        return new Promise((resolve, reject) => {
            if(duration === 0) {
                this.getConnection().set(key, value, (error, data) => {
                    if(error) {
                        reject(error)
                    } else {
                        resolve(data);
                    }
                });
            } else {
                duration = duration * 1000;
                this.getConnection().set(key, value, 'PX', duration, (error, data) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(data);
                    }
                })
            }
        })
    }

    protected flushValues(): Promise<boolean> {
        return Promise.resolve(true);
    }

    protected deleteValue(key: string) {
    }


    public getDefaultConfiguration(): ClientOpts {
        return {

        };
    }



}
