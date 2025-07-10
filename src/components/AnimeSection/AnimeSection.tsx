import { Component } from 'react';

import { animeApi } from '@/api/animeApi';
import type { Anime } from '@/models/animeModel';
import { handleErrorMessage } from '@/utils/handleErrorMessage';

type CardsListState = {
  list: Anime[];
  isLoading: boolean;
  error: string;
  page: number;
};

type AnimeSectionProps = {
  isLoading: boolean;
  searchTerm: string;
  setLoading: (state: boolean) => void;
};

class AnimeSection extends Component<AnimeSectionProps> {
  state: CardsListState = {
    list: [],
    isLoading: false,
    error: '',
    page: 1,
  };

  componentDidMount() {
    this.fetchList();
  }

  fetchList = async () => {
    this.props.setLoading(true);

    try {
      const list = await animeApi.getAnimeList({
        q: this.props.searchTerm,
        page: this.state.page,
      });
      console.log(list);
      this.setState({ list: list.data });
    } catch (error) {
      this.setState({ error: handleErrorMessage(error) });
    } finally {
      this.props.setLoading(false);
    }
  };

  render() {
    const { isLoading, error, list } = this.state;

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <section>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <div>
            {list.map((element) => (
              <div key={element.mal_id}>{element.title_english}</div>
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default AnimeSection;
