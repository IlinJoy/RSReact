import { Component } from 'react';

import { animeApi } from '@/api/animeApi';
import type { Anime } from '@/models/animeModel';
import type { HomePageState } from '@/pages/HomePage/HomePage';
import { filterDuplicateResponseItemsById } from '@/utils/filterDuplicateResponseItemsById';
import { getError } from '@/utils/handleErrorMessage';

import AnimeListCard from '../AnimeListCard/AnimeListCard';
import ListComponent from '../ListComponent/ListComponent';
import styles from './AnimeList.module.scss';

type AnimeListProps = {
  searchTerm: string;
};

type AnimeListState = {
  isLoading: boolean;
  data: Anime[];
  error: Error | null;
  page: 1;
};

class AnimeList extends Component<AnimeListProps> {
  state: AnimeListState = {
    isLoading: false,
    data: [],
    error: null,
    page: 1,
  };

  componentDidMount() {
    this.fetchAnimeList();
  }

  componentDidUpdate(prevProps: HomePageState) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchAnimeList();
    }
  }

  fetchAnimeList = async () => {
    this.setState({ isLoading: true, error: null });
    try {
      const list = await animeApi.getAnimeList({
        q: this.props.searchTerm,
        page: this.state.page,
      });
      this.setState({ data: filterDuplicateResponseItemsById(list.data) });
    } catch (error) {
      this.setState({ error: getError(error) });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { data, isLoading, error } = this.state;

    return (
      <section className={styles.section}>
        {error ? (
          <div>{error.message}</div>
        ) : (
          <ListComponent
            isLoading={isLoading}
            data={data}
            renderItem={(data) => (
              <AnimeListCard data={data} key={data.mal_id} />
            )}
          />
        )}
      </section>
    );
  }
}

export default AnimeList;
