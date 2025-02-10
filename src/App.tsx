import { Component } from 'react';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Main from './components/Main.tsx';
import ErrorButton from './components/ErrorButton.tsx';
import { Anime } from './types.ts';
import { fetchAnime } from './api.ts';
import Loader from './components/Loader.tsx';
import ErrorFetch from './components/ErrorFetch.tsx';

interface AppState {
  searchTerm: string;
  animeList: Anime[];
  loading: boolean;
  error: string | null;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      animeList: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.loadAnimeData(this.state.searchTerm);
  }

  loadAnimeData = async (searchTerm: string) => {
    try {
      this.setState({ loading: true, error: null });
      const animeList = await fetchAnime(searchTerm);
      this.setState({ animeList });
    } catch (error) {
      this.setState({
        error:
          error instanceof Error
            ? 'Произошла ошибка при загрузке данных'
            : 'Неизвестная ошибка',
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = (searchTerm: string) => {
    const trimmedTerm = searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    this.setState({ searchTerm: trimmedTerm }, () => {
      this.loadAnimeData(trimmedTerm);
    });
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="app min-h-screen flex flex-col">
          <Header
            searchTerm={this.state.searchTerm}
            onSearch={this.handleSearch}
          />

          {this.state.loading ? (
            <Loader />
          ) : this.state.error ? (
            <ErrorFetch errorMessage={this.state.error} />
          ) : (
            <Main animeList={this.state.animeList} />
          )}

          <ErrorButton />
          <Footer />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
