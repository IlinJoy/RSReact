import { generateCsvFromObjectArray } from '@utils/generateCsvFromObjectArray';

type MimeType = 'text/csv' | 'image/webp' | 'application/json';

export type CreateDownloadUrlOptions<T> = { type: MimeType; mapFunction?: (data: T) => string };

export const createDownloadUrl = <T>(
  data: T,
  { type, mapFunction }: CreateDownloadUrlOptions<T>
) => {
  const string = mapFunction ? mapFunction(data) : JSON.stringify(data);
  const blob = new Blob([string], { type });
  return URL.createObjectURL(blob);
};

export const csvBaseOptions = {
  type: 'text/csv',
  mapFunction: generateCsvFromObjectArray,
} as const;
