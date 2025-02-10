import { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Anime } from '../types';
import { fetchAnime } from '../api';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';
import AnimeDetails from '../components/AnimeDetails';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import ErrorFetch from '../components/ErrorFetch';

const MainPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useLocalStorage<string>('searchTerm', '');
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const currentPage = Number(searchParams.get('page')) || 1;
  const selectedId = searchParams.get('details');

  const loadAnimeData = async (term: string, page: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAnime(term, page);
      setAnimeList(data.data);
      setTotalPages(
        Math.ceil(data.pagination.items.total / data.pagination.items.per_page)
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Произошла ошибка при загрузке данных'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnimeData(searchTerm, currentPage);
  }, [searchTerm, currentPage]);

  useEffect(() => {
    if (selectedId) {
      const anime = animeList.find((a) => a.mal_id === Number(selectedId));
      if (anime) {
        setSelectedAnime(anime);
      }
    }
  }, [selectedId, animeList]);

  const handlePageChange = (page: number) => {
    setSearchParams({
      page: page.toString(),
      ...(selectedId && { details: selectedId }),
    });
  };

  const handleAnimeSelect = (anime: Anime) => {
    setSelectedAnime(anime);
    setSearchParams({
      page: currentPage.toString(),
      details: String(anime.mal_id),
    });
  };

  const handleCloseDetails = () => {
    setSelectedAnime(null);
    setSearchParams({ page: currentPage.toString() });
  };

  const handleSearch = (term: string) => {
    const trimmedTerm = term.trim();
    setSearchTerm(trimmedTerm);
    setSearchParams({ page: '1' });
  };

  return (
    <>
      <Header searchTerm={searchTerm} onSearch={handleSearch} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorFetch errorMessage={error} />
        ) : (
          <div className="flex flex-grow relative">
            <div
              className={`flex-1 transition-all duration-300 ${
                selectedAnime ? '2xl:w-1/2 2xl:pr-4' : 'w-full'
              }`}
            >
              <SearchResults
                animeList={animeList}
                onAnimeSelect={handleAnimeSelect}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
            {selectedAnime && (
              <div className="fixed 2xl:static inset-0 2xl:w-1/2 bg-white 2xl:bg-transparent z-10 overflow-auto">
                <div className="h-full 2xl:border-l 2xl:border-gray-200">
                  <AnimeDetails
                    animeId={Number(selectedAnime.mal_id)}
                    onClose={handleCloseDetails}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default MainPage;
