import type { MockInstance } from 'vitest';

import { AppStorage, STORAGE_KEYS } from '@/services/localStorage';

const mockedData = { data: 'something' };
const mockedDataJson = JSON.stringify(mockedData);
const STORAGE_KEY = STORAGE_KEYS.PREFIX + STORAGE_KEYS.ANIME;
const mockedErrorFn = vi.fn(() => {
  throw new Error();
});

describe('AppStorage', () => {
  let storage: AppStorage<typeof mockedData>;
  let errorSpy: MockInstance;

  beforeEach(() => {
    storage = new AppStorage(STORAGE_KEYS.ANIME);
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.clear();
  });

  describe('Success Cases', () => {
    it('should return data from localStorage', () => {
      localStorage.setItem(STORAGE_KEY, mockedDataJson);

      expect(storage.getData()).toEqual(mockedData);
    });

    it('should return null if there no data from localStorage', () => {
      expect(storage.getData()).toBeNull();
    });

    it('should save data to localStorage', () => {
      storage.setData(mockedData);

      expect(localStorage.getItem(STORAGE_KEY)).toBe(mockedDataJson);
    });
  });

  describe('Error Cases', () => {
    beforeEach(() => {
      vi.stubGlobal('localStorage', {
        getItem: mockedErrorFn,
        setItem: mockedErrorFn,
        clear: vi.fn(),
      });
    });

    it('should return null and log error when getData fails', () => {
      const result = storage.getData();

      expect(result).toBeNull();
      expect(errorSpy).toHaveBeenCalled();
    });

    it('should log error when setData fails', () => {
      storage.setData(mockedData);

      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
