export type CheckedItem = {
  id: number;
  title: string;
  title_japanese: string;
  genres: string[];
  episodes: number;
  duration: string;
  year: number;
  image: string;
};

export type CheckedItemsState = {
  ids: number[];
  entities: { [key: number]: CheckedItem };
};
