import { Component } from 'react';

import AnimeList from '@/components/AnimeList/AnimeList';
import ErrorButton from '@/components/ErrorButton/ErrorButton';
import SearchBar from '@/components/SearchBar/SearchBar';
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
    return (
      <>
        <SearchBar onSearch={this.handleUpdate} {...this.state} />
        <AnimeList {...this.state} />
        <ErrorButton />
      </>
    );
  }
}

export default HomePage;
