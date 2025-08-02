type MimeType = 'text/csv' | 'image/webp' | 'application/json';

type CreateDownloadUrlOptions<T> = { type: MimeType; mapFunction?: (data: T) => string };

export const createDownloadUrl = <T>(
  data: T,
  { type, mapFunction }: CreateDownloadUrlOptions<T>
) => {
  const string = mapFunction ? mapFunction(data) : JSON.stringify(data);
  const blob = new Blob([string], { type });
  return URL.createObjectURL(blob);
};

export const generateCsvFromObjectArray = <T extends Record<string, unknown>>(data: T[]) => {
  const titles = Object.keys(data[0]).join(', ');

  const rows = data.map((row) =>
    Object.values(row)
      .map((value) => (Array.isArray(value) ? `"${value.join(', ')}"` : `"${value}"`))
      .join(',')
  );

  return [titles, ...rows].join('\n');
};
