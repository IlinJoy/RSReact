export const STORAGE_KEYS = {
  PREFIX: 'ilinjoy-',
  ANIME: 'task-anime',
};

export class AppStorage<T = string> {
  private keyPrefix = STORAGE_KEYS.PREFIX;
  private key;

  constructor(key: string) {
    this.key = this.keyPrefix + key;
  }

  public setData(data: T) {
    try {
      localStorage.setItem(this.key, JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }

  public getData() {
    try {
      const data = localStorage.getItem(this.key);
      const parsedData: T = data && JSON.parse(data);
      return parsedData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const storage = new AppStorage(STORAGE_KEYS.ANIME);
