import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../store/characterSlice';
import { RootState } from '../../store/store';

const Pagination = () => {
  const dispatch = useDispatch();
  const { page, totalPages } = useSelector((state: RootState) => state.characters);

  const generatePageNumbers = (isMobile: boolean = false) => {
    const pages = [];
    const maxVisiblePages = isMobile ? 3 : 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (isMobile) {
        // Mobile: Show current page and adjacent pages only
        if (page === 1) {
          pages.push(1, 2, '...', totalPages);
        } else if (page === totalPages) {
          pages.push(1, '...', totalPages - 1, totalPages);
        } else {
          pages.push(1, '...', page, '...', totalPages);
        }
      } else {
        // Desktop: Show more pages
        if (page <= 3) {
          pages.push(1, 2, 3, 4, '...', totalPages);
        } else if (page >= totalPages - 2) {
          pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
        }
      }
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();
  const mobilePageNumbers = generatePageNumbers(true);

  const PageButton = ({ 
    pageNum, 
    isActive, 
    onClick, 
    disabled = false,
    isMobile = false
  }: { 
    pageNum: number | string; 
    isActive?: boolean; 
    onClick: () => void; 
    disabled?: boolean; 
    isMobile?: boolean;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled || pageNum === '...'}
      className={`relative font-medium transition-all duration-300 ${
        isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-2'
      } rounded-xl ${
        isActive
          ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg shadow-green-500/25 scale-105'
          : disabled || pageNum === '...'
          ? 'text-slate-500 cursor-not-allowed'
          : 'text-slate-300 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95'
      }`}
    >
      {pageNum}
      {isActive && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 animate-pulse"></div>
      )}
    </button>
  );

  const NavButton = ({ 
    direction, 
    onClick, 
    disabled,
    isMobile = false
  }: { 
    direction: 'prev' | 'next'; 
    onClick: () => void; 
    disabled: boolean; 
    isMobile?: boolean;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 font-medium transition-all duration-300 ${
        isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-2'
      } rounded-xl ${
        disabled
          ? 'text-slate-500 cursor-not-allowed opacity-50'
          : 'text-slate-300 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95'
      }`}
    >
      {direction === 'prev' && (
        <svg className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      )}
      {!isMobile && (direction === 'prev' ? 'Previous' : 'Next')}
      {direction === 'next' && (
        <svg className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      {/* Desktop Pagination */}
      <div className="hidden sm:flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2">
        {/* Previous Button */}
        <NavButton
          direction="prev"
          onClick={() => dispatch(setPage(page - 1))}
          disabled={page === 1}
        />

        {/* Page Numbers */}
        <div className="flex items-center gap-1 mx-2">
          {pageNumbers.map((pageNum, index) => (
            <PageButton
              key={`${pageNum}-${index}`}
              pageNum={pageNum}
              isActive={pageNum === page}
              onClick={() => {
                if (typeof pageNum === 'number') {
                  dispatch(setPage(pageNum));
                }
              }}
            />
          ))}
        </div>

        {/* Next Button */}
        <NavButton
          direction="next"
          onClick={() => dispatch(setPage(page + 1))}
          disabled={page === totalPages}
        />
      </div>

      {/* Mobile Pagination */}
      <div className="flex sm:hidden items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2">
        {/* Previous Button */}
        <NavButton
          direction="prev"
          onClick={() => dispatch(setPage(page - 1))}
          disabled={page === 1}
          isMobile={true}
        />

        {/* Page Numbers - Mobile */}
        <div className="flex items-center gap-1 mx-2">
          {mobilePageNumbers.map((pageNum, index) => (
            <PageButton
              key={`mobile-${pageNum}-${index}`}
              pageNum={pageNum}
              isActive={pageNum === page}
              onClick={() => {
                if (typeof pageNum === 'number') {
                  dispatch(setPage(pageNum));
                }
              }}
              isMobile={true}
            />
          ))}
        </div>

        {/* Next Button */}
        <NavButton
          direction="next"
          onClick={() => dispatch(setPage(page + 1))}
          disabled={page === totalPages}
          isMobile={true}
        />
      </div>

      {/* Page Info */}
      <div className="text-sm text-slate-400 order-first sm:order-last">
        Page {page} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;