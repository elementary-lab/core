import { MessageEntity } from '../Entities/MessageEntity';
import { LogLevel, LogLevelString } from '../Types';
import { AbstractTarget } from './AbstractTarget';
import { TargetConfigInterface } from '@elementary-lab/logger/Interface/LoggerConfigInterface';

export class ConsoleTarget extends AbstractTarget
  implements ConsoleTargetConfig {
  messagePrefixTemplate =
    '[{date}][{logLevel}][{category}] {text} [{userData}]';

  public constructor(config: ConsoleTargetConfig) {
    super();
    this.configure(config);
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
        string = string.replace(
          '{userData}',
          JSON.stringify(item.data, this.getCircularReplacer())
        );
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

  private getCircularReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  }

  public getMessagePrefixTemplate(): string {
    return this.messagePrefixTemplate;
  }
}

interface ConsoleTargetConfig extends TargetConfigInterface {
  messagePrefixTemplate?: string;
}
