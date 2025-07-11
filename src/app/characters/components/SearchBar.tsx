import { useDispatch, useSelector } from 'react-redux';
import { setNameFilter } from '../../store/filterSlice';
import { RootState } from '../../store/store';
import { useDebouncedCallback } from 'use-debounce';

const SearchBar = () => {
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.filters.name);

  const debounced = useDebouncedCallback((value) => {
    dispatch(setNameFilter(value));
  }, 300);

  return (
    <input
      type="text"
      placeholder="Search by name..."
      onChange={(e) => debounced(e.target.value)}
      defaultValue={name}
      className="p-2 rounded bg-gray-700 text-white"
    />
  );
};

export default SearchBar;