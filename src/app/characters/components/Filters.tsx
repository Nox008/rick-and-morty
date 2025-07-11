import { useDispatch, useSelector } from 'react-redux';
import { setStatusFilter, setSpeciesFilter } from '../../store/filterSlice';
import { RootState } from '../../store/store';

const Filters = () => {
  const dispatch = useDispatch();
  const { status, species } = useSelector((state: RootState) => state.filters);

  return (
    <div className="flex space-x-4">
      <select
        value={status}
        onChange={(e) => dispatch(setStatusFilter(e.target.value))}
        className="p-2 rounded bg-gray-700 text-white"
      >
        <option value="">All Statuses</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <select
        value={species}
        onChange={(e) => dispatch(setSpeciesFilter(e.target.value))}
        className="p-2 rounded bg-gray-700 text-white"
      >
        <option value="">All Species</option>
        <option value="human">Human</option>
        <option value="alien">Alien</option>
        <option value="robot">Robot</option>
      </select>
    </div>
  );
};

export default Filters;