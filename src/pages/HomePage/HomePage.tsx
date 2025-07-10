import { Component } from 'react';

import AnimeSection from '@/components/AnimeSection/AnimeSection';

type HomePageState = {
  searchTerm: string;
  isLoading: boolean;
};

class HomePage extends Component {
  state: HomePageState = {
    isLoading: false,
    searchTerm: '',
  };

  handleLoading = (state: boolean) => {
    this.setState({ isLoading: state });
  };

  render() {
    return (
      <AnimeSection
        setLoading={this.handleLoading}
        isLoading={this.state.isLoading}
        searchTerm={this.state.searchTerm}
      />
    );
  }
}

export default HomePage;
