import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../store/characterSlice';
import { RootState } from '../../store/store';

const Pagination = () => {
  const dispatch = useDispatch();
  const { page, totalPages } = useSelector((state: RootState) => state.characters);

  return (
    <div className="flex justify-center items-center space-x-4">
      <button
        onClick={() => dispatch(setPage(page - 1))}
        disabled={page === 1}
        className="p-2 rounded bg-gray-700 disabled:opacity-50"
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => dispatch(setPage(page + 1))}
        disabled={page === totalPages}
        className="p-2 rounded bg-gray-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;