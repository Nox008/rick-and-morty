import { useDispatch, useSelector } from 'react-redux';
import { setStatusFilter, setSpeciesFilter } from '../../store/filterSlice';
import { RootState } from '../../store/store';
import { useState } from 'react';

const Filters = () => {
  const dispatch = useDispatch();
  const { status, species } = useSelector((state: RootState) => state.filters);
  const [statusOpen, setStatusOpen] = useState(false);
  const [speciesOpen, setSpeciesOpen] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Statuses', emoji: '🔘' },
    { value: 'alive', label: 'Alive', emoji: '🟢' },
    { value: 'dead', label: 'Dead', emoji: '🔴' },
    { value: 'unknown', label: 'Unknown', emoji: '⚫' }
  ];

  const speciesOptions = [
    { value: '', label: 'All Species', emoji: '🌍' },
    { value: 'human', label: 'Human', emoji: '👨' },
    { value: 'alien', label: 'Alien', emoji: '👽' },
    { value: 'robot', label: 'Robot', emoji: '🤖' }
  ];

  const CustomSelect = ({ 
    value, 
    options, 
    onChange, 
    isOpen, 
    setIsOpen, 
    placeholder 
  }: {
    value: string;
    options: Array<{ value: string; label: string; emoji: string }>;
    onChange: (value: string) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    placeholder: string;
  }) => {
    const selectedOption = options.find(opt => opt.value === value) || options[0];

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 min-w-[140px] justify-between group"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">{selectedOption.emoji}</span>
            <span className="text-sm font-medium">{selectedOption.label}</span>
          </div>
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden z-50 shadow-2xl">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 ${
                  option.value === value ? 'bg-green-500/20 text-green-400' : 'text-black'
                }`}
              >
                <span className="text-sm">{option.emoji}</span>
                <span className="text-sm font-medium">{option.label}</span>
                {option.value === value && (
                  <div className="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Status Filter */}
      <CustomSelect
        value={status}
        options={statusOptions}
        onChange={(value) => dispatch(setStatusFilter(value))}
        isOpen={statusOpen}
        setIsOpen={setStatusOpen}
        placeholder="Filter by Status"
      />

      {/* Species Filter */}
      <CustomSelect
        value={species}
        options={speciesOptions}
        onChange={(value) => dispatch(setSpeciesFilter(value))}
        isOpen={speciesOpen}
        setIsOpen={setSpeciesOpen}
        placeholder="Filter by Species"
      />

      {/* Clear Filters Button */}
      {(status || species) && (
        <button
          onClick={() => {
            dispatch(setStatusFilter(''));
            dispatch(setSpeciesFilter(''));
          }}
          className="flex items-center gap-2 px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/30 hover:border-red-500/50 transition-all duration-300 group"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span className="text-sm font-medium">Clear</span>
        </button>
      )}
    </div>
  );
};

export default Filters;