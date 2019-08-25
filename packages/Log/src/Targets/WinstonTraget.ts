import {MessageEntity} from '../Entities/MessageEntity';
import {LogLevel, LogLevelString} from '../Types';
import {AbstractTarget} from './AbstractTarget';
import {TargetConfigInterface} from '@Core/Log/Interface/LoggerConfigInterface';
import * as winston from 'winston';
import {LoggerOptions} from 'winston';

export class WinstonTarget extends AbstractTarget implements FileLogConfigInterface {

    private logger: winston.Logger;
    loggerOptions: LoggerOptions;
    messagePrefixTemplate: string = '[{date}][{logLevel}][{category}] {text} [{userData}]';

    public constructor() {
        super();
        this.logger = winston.createLogger(this.loggerOptions);
    }

    public export(): void {
        this.messages.map((item: MessageEntity) => {
            // tslint:disable-next-line:variable-name
            let string = this.getMessagePrefixTemplate();
            string = string.replace('{date}', this.getTime(item.time));
            string = string.replace('{logLevel}', LogLevelString[item.level]);
            string = string.replace('{category}', item.category);
            string = string.replace('{text}', item.message);

             if (item.data !== undefined) {
                 string = string.replace('{userData}', JSON.stringify(item.data));
             } else {
                 string = string.replace('{userData}', '');
             }
            switch (item.level) {
                case LogLevel.EMERGENCY:
                    console.error(string);
                    break;
                case LogLevel.DEBUG:
                    console.debug(string);
                    break;
                case LogLevel.PROFILE:
                    console.profile(string);
                    break;
                case LogLevel.WARNING:
                    console.warn(string);
                    break;
                default:
                    console.info(string);
            }
        });
    }

    public getMessagePrefixTemplate(): string {
        return this.messagePrefixTemplate;
    }
}



interface FileLogConfigInterface extends TargetConfigInterface {
    loggerOptions: LoggerOptions;
    messagePrefixTemplate: string;
}
