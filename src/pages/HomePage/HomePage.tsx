import { Component } from 'react';

import AnimeList from '@/components/AnimeList/AnimeList';
import { storage } from '@/services/localStorage';

export type HomePageState = {
  searchTerm: string;
};

class HomePage extends Component {
  state: HomePageState = {
    searchTerm: storage.getData() || '',
  };

  handleUpdate = (searchTerm: string) => {
    storage.setData(searchTerm);
    this.setState({ searchTerm });
  };

  render() {
    return <AnimeList {...this.state} />;
  }
}

export default HomePage;
