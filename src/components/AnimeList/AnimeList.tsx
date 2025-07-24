import { Component } from 'react';

import { animeApi } from '@/api/animeApi';
import { AnimeListCard } from '@/components/AnimeListCard/AnimeListCard';
import { FallbackUi } from '@/components/FallbackUi/FallbackUi';
import { ListComponent } from '@/components/ListComponent/ListComponent';
import type { Anime } from '@/models/animeModel';
import { filterDuplicateResponseItemsById } from '@/utils/filterDuplicateResponseItemsById';
import { getError } from '@/utils/handleErrorMessage';

import styles from './AnimeList.module.scss';

export type AnimeListProps = {
  searchTerm: string;
  onError: (term: string) => void;
};

type AnimeListState = {
  isLoading: boolean;
  data: Anime[];
  error: Error | null;
  page: number;
};

export class AnimeList extends Component<AnimeListProps, AnimeListState> {
  state: AnimeListState = {
    isLoading: false,
    data: [],
    error: null,
    page: 1,
  };

  componentDidMount() {
    this.fetchAnimeList();
  }

  componentDidUpdate(prevProps: AnimeListProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchAnimeList();
    }
  }

  fetchAnimeList = async () => {
    this.setState<'isLoading' | 'error'>({ isLoading: true, error: null });
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

  handleFetchError = () => {
    this.props.onError('');
    window.location.reload();
  };

  render() {
    const { data, isLoading, error } = this.state;

    return (
      <section className={styles.section}>
        {error ? (
          <FallbackUi
            error={error}
            resetError={this.handleFetchError}
            buttonMessage="Back To List"
          />
        ) : (
          <ListComponent
            isLoading={isLoading}
            data={data}
            renderItem={(data) => <AnimeListCard data={data} key={data.mal_id} />}
          />
        )}
      </section>
    );
  }
}
