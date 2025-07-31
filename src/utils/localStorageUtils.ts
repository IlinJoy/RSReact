export const STORAGE_KEYS = {
  PREFIX: 'ilinjoy-',
  ANIME: 'task-anime',
} as const;

export const getFromLocalStorage = <T>(key: string) => {
  try {
    const data = localStorage.getItem(key);
    const parsedData: T = data && JSON.parse(data);
    return parsedData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setToLocalStorage = <T>(key: string, data: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};
