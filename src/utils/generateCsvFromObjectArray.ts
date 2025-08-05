export const generateCsvFromObjectArray = <T extends Record<string, unknown>>(data: T[]) => {
  const titles = Object.keys(data[0]).join(', ');

  const rows = data.map((row) =>
    Object.values(row)
      .map((value) => (Array.isArray(value) ? `"${value.join(', ')}"` : `"${value}"`))
      .join(',')
  );

  return [titles, ...rows].join('\n');
};
