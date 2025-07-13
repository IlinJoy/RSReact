class Storage<T = string> {
  private keyPrefix = 'ilinjoy-';
  private key;

  constructor(key: string) {
    this.key = this.keyPrefix + key;
  }

  public setData(data: T) {
    try {
      localStorage.setItem(this.key, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  public getData() {
    try {
      const data = localStorage.getItem(this.key);
      const parsedData: T = data && JSON.parse(data);
      return parsedData;
    } catch (error) {
      console.log(error);
    }
  }
}

export const storage = new Storage('task-anime');
