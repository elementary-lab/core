import {MessageEntity} from '../Entities/MessageEntity';
import {LogLevel} from '../Types';
import {TargetConfigInterface} from "@elementary-lab/logger/Interface/LoggerConfigInterface";

export abstract class AbstractTarget implements TargetConfigInterface {
    public enabled: boolean = true;
    public levels: LogLevel[] = [];
    public categories: string[] = [];
    public except: string[] = [];
    public prefix: string;
    public exportInterval: number = 1;
    public messages: MessageEntity[] | null;

    abstract export(): void;

    public configure(config: TargetConfigInterface) {
        Object.keys(config).forEach((value) => {
            this[value] = config[value];
        });
    }

    public collect(messages: MessageEntity[], final:boolean = false): void {
        this.messages = this.filterMessages(messages, this.levels, this.categories, this.except);
        if (this.messages.length > 0 && (final || this.exportInterval > 0 && this.messages.length >= this.exportInterval)) {
            // set exportInterval to 0 to avoid triggering export again while exporting
            const oldExportInterval = this.exportInterval;
            this.exportInterval = 0;
            this.export();
            this.exportInterval = oldExportInterval;
        }
    }

    public filterMessages(messages: MessageEntity[], levels: LogLevel[] = [], categories:string[] = [], except:string[] = []): MessageEntity[] {
        // TODO filter
        return messages.filter((value: MessageEntity) => {
            return levels.includes(value.level);
        });

    }

    /**
     *
     * @param date
     */
    protected getTime(date: Date): string {
        return date.toISOString().replace(/T/, ' ').replace(/Z/, '');
    }
}
