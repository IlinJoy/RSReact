export const generateCsvFromObjectArray = <T extends Record<string, unknown>>(data: T[]) => {
  const titles = Object.keys(data[0]).join(', ');

  const rows = data.map((row) =>
    Object.values(row)
      .map((value) => (Array.isArray(value) ? `"${value.join(', ')}"` : `"${value}"`))
      .join(',')
  );

  return [titles, ...rows].join('\n');
};

export const isObjectArray = (value: unknown): value is Array<Record<string, unknown>> => {
  return Array.isArray(value) && value.every((item) => typeof item === 'object' && item !== null);
};
