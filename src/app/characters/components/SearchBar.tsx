import { useDispatch, useSelector } from 'react-redux';
import { setNameFilter } from '../../store/filterSlice';
import { RootState } from '../../store/store';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

const SearchBar = () => {
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.filters.name);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(name || '');

  const debounced = useDebouncedCallback((value) => {
    dispatch(setNameFilter(value));
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debounced(value);
  };

  const clearSearch = () => {
    setInputValue('');
    dispatch(setNameFilter(''));
  };

  return (
    <div className="relative w-full">
      <div className={`relative group transition-all duration-300 ${
        isFocused ? 'scale-105' : 'scale-100'
      }`}>
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg 
            className={`w-5 h-5 transition-colors duration-300 ${
              isFocused ? 'text-green-400' : 'text-slate-400'
            }`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Search characters..."
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full pl-12 pr-12 py-3 bg-white/5 backdrop-blur-sm border rounded-xl text-white placeholder-slate-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 ${
            isFocused 
              ? 'border-green-400/50 bg-white/10 shadow-lg shadow-green-400/20' 
              : 'border-white/20 hover:border-white/30 hover:bg-white/10'
          }`}
        />

        {/* Clear Button */}
        {inputValue && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search suggestions or recent searches could go here */}
{/*       {isFocused && inputValue && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden z-50">
          <div className="p-3 text-sm text-slate-400">
            Searching for "{inputValue}"...
          </div>
        </div>
      )} */}

      {/* Animated background glow */}
{/*       <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 transition-opacity duration-300 pointer-events-none ${
        isFocused ? 'opacity-100' : 'opacity-0'
      }`}></div> */}
    </div>
  );
};

export default SearchBar;