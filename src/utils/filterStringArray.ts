export const filterStringArray = (array: string[], query: string) =>
  array.filter((element) => element.toLowerCase().includes(query.toLowerCase()));
