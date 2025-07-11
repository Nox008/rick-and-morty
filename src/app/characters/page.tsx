'use client';

import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState, AppDispatch } from '../store/store';
import { getCharacters } from '../store/characterSlice';
import CharacterCard from './components/CharacterCard';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import Pagination from './components/Pagination';

const CharactersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { characters, status, error, page } = useSelector((state: RootState) => state.characters);
  const filters = useSelector((state: RootState) => state.filters);

  useEffect(() => {
    dispatch(getCharacters({ page, ...filters }));
  }, [dispatch, page, filters]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <SearchBar />
        <Filters />
      </div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
          <div className="mt-4">
            <Pagination />
          </div>
        </>
      )}
    </div>
  );
};

const Page = () => (
  <Provider store={store}>
    <CharactersPage />
  </Provider>
);

export default Page;