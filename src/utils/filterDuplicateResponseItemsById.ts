type ResponseWithId = { mal_id: number };
export const filterDuplicateResponseItemsById = <T extends ResponseWithId>(
  arr: T[]
) => {
  const filteredItems = new Map(arr.map((item) => [item.mal_id, item]));
  return [...filteredItems].map(([, item]) => item);
};
