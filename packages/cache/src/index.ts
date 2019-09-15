import { CacheInterface } from '@elementary-lab/standards/CacheInterface';

export abstract class Cache implements CacheInterface {
  public keyPrefix: string;

  public serializer: string | boolean | null = false;

  public defaultDuration = 0;

  buildKey(key: string): string {
    return key;
  }

  async get<T>(key: string): Promise<T | boolean> {
    key = this.buildKey(key);
    return this.getValue(key).then(value => {
      if (value === undefined) {
        return false;
      }
      if (this.serializer === false) {
        return JSON.parse(value);
      }
      return value;
    });
  }

  async exists(key: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      key = this.buildKey(key);
      this.getValue(key)
        .then(content => {
          if (content != false) {
            resolve();
          } else {
            reject();
          }
        })
        .catch(() => reject);
    });
  }

  add(key: string, value: any, duration: number) {
    if (this.serializer === null) {
      value = JSON.parse(value);
    }
    key = this.buildKey(key);

    return this.addValue(key, value, duration);
  }

  delete(key): boolean {
    key = this.buildKey(key);
    return this.deleteValue(key);
  }

  flush(): boolean {
    return false;
    //return await this.flushValues();
  }

  getOrSet(key: string, callable: () => void, duration?: number) {}

  multiAdd(items: any[], duration: number) {}

  multiGet(keys: string[]): any[] {
    return [];
  }

  multiSet(items: any[], duration: number) {}

  set(key: string, value: any, duration?: number): Promise<boolean> {
    key = this.buildKey(key);
    value = JSON.stringify(value);
    return this.setValue(key, value, duration);
  }

  /**
   * Retrieves a value from cache with a specified key.
   * This method should be implemented by child classes to retrieve the data
   * from specific cache storage.
   * @param key string a unique key identifying the cached value
   * @return mixed|false the value stored in cache, false if the value is not in the cache or expired. Most often
   * value is a string. If you have disabled [[serializer]], it could be something else.
   */
  protected abstract async getValue(key: string);

  /**
   * Stores a value identified by a key in cache.
   * This method should be implemented by child classes to store the data
   * in specific cache storage.
   * @param key string the key identifying the value to be cached
   * @param value mixed : any the value to be cached. Most often it's a string. If you have disabled [[serializer]],
   * it could be something else.
   * @param duration number: number the number of seconds in which the cached value will expire. 0 means never expire.
   * @return bool true if the value is successfully stored into cache, false otherwise
   */
  protected abstract setValue(
    key: string,
    value: any,
    duration: number
  ): Promise<boolean>;

  /**
   * Stores a value identified by a key into cache if the cache does not contain this key.
   * This method should be implemented by child classes to store the data
   * in specific cache storage.
   * @param string key the key identifying the value to be cached
   * @param mixed value: any the value to be cached. Most often it's a string. If you have disabled [[serializer]],
   * it could be something else.
   * @param int duration: number the number of seconds in which the cached value will expire. 0 means never expire.
   * @return bool true if the value is successfully stored into cache, false otherwise
   */
  protected abstract addValue(
    key: string,
    value: any,
    duration: number
  ): Promise<any>;

  /**
   * Deletes a value with the specified key from cache
   * This method should be implemented by child classes to delete the data from actual cache storage.
   * @param string key the key of the value to be deleted
   * @return bool if no error happens during deletion
   */
  protected abstract deleteValue(key: string);

  /**
   * Deletes all values from cache.
   * Child classes may implement this method to realize the flush operation.
   * @return bool whether the flush operation was successful.
   */
  protected abstract flushValues(): Promise<boolean>;

  /**
   * Retrieves multiple values from cache with the specified keys.
   * The default implementation calls [[getValue()]] multiple times to retrieve
   * the cached values one by one. If the underlying cache storage supports multiget,
   * this method should be overridden to exploit that feature.
   * @param array keys a list of keys identifying the cached values
   * @return array a list of cached values indexed by the keys
   */
  protected getValues(key: string[]): void {
    const results = {};
    key.forEach((value: string, item: any) => {
      // results.{value} = item;
    });

    //return results;
  }

  /**
   * Stores multiple key-value pairs in cache.
   * The default implementation calls [[setValue()]] multiple times store values one by one. If the underlying cache
   * storage supports multi-set, this method should be overridden to exploit that feature.
   * @param data array where key corresponds to cache key while value is the value stored
   * @param duration: number the number of seconds in which the cached values will expire. 0 means never expire.
   * @return array array of failed keys
   */
  protected setValues(data: object, duration: number) {
    // failedKeys = [];
    // foreach (data as key => value: any) {
    // if (this->setValue(key: string, value: any, duration: number) === false) {
    //     failedKeys[] = key;
    // }
    //
    // return failedKeys;
  }

  /**
   * Adds multiple key-value pairs to cache.
   * The default implementation calls [[addValue()]] multiple times add values one by one. If the underlying cache
   * storage supports multi-add, this method should be overridden to exploit that feature.
   * @param data array where key corresponds to cache key while value is the value stored.
   * @param duration: number the number of seconds in which the cached values will expire. 0 means never expire.
   * @return array array of failed keys
   */
  protected addValues(data, duration: number) {
    // failedKeys = [];
    // foreach (data as key => value: any) {
    // if (this->addValue(key: string, value: any, duration: number) === false) {
    //     failedKeys[] = key;
    // }
    //
    // return failedKeys;
  }
}
