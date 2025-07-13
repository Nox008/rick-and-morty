'use client';

import { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    dispatch(getCharacters({ page, ...filters }));
  }, [dispatch, page, filters]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const progress = Math.min(scrollTop / 100, 1);
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('.menu-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <link href="https://fonts.googleapis.com/css2?family=Creepster&display=swap" rel="stylesheet" />
      
      <div className="relative z-10">
        {/* Header with smooth transitions */}
        <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-20 transition-all duration-300">
          <div className="container mx-auto px-4 py-6">
            <motion.div 
              className="text-center"
              animate={{
                opacity: 1 - scrollProgress,
                scale: 1 - (scrollProgress * 0.1),
                y: scrollProgress * -40,
                marginBottom: isScrolled ? '0' : '2rem',
                height: isScrolled ? '0' : 'auto',
                overflow: 'hidden'
              }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2" style={{ fontFamily: 'Creepster, cursive' }}>
                Rick & Morty
              </h1>
              <p className="text-slate-300 text-lg">Character Explorer</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col lg:flex-row gap-4 items-center justify-between"
              animate={{
                opacity: isScrolled ? 0 : 1,
                height: isScrolled ? 0 : 'auto'
              }}
              transition={{ type: 'spring', damping: 20 }}
              style={{ overflow: isScrolled ? 'hidden' : 'visible' }}
            >
              <div className="w-full lg:w-auto lg:flex-1 max-w-md">
                <SearchBar />
              </div>
              <div className="w-full lg:w-auto">
                <Filters />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hamburger Menu Button */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ 
                opacity: scrollProgress,
                scale: 1,
                y: 0
              }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-4 right-4 z-50 menu-container"
            >
              <motion.button
                onClick={toggleMenu}
                className="w-12 h-12 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={isMenuOpen ? "open" : "closed"}
                  className="w-6 h-6 flex flex-col items-center justify-center"
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 6 }
                    }}
                    className="w-5 h-0.5 bg-white block mb-1.5 origin-center transition-all duration-300"
                  />
                  <motion.span
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 }
                    }}
                    className="w-5 h-0.5 bg-white block mb-1.5 transition-all duration-300"
                  />
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -6 }
                    }}
                    className="w-5 h-0.5 bg-white block origin-center transition-all duration-300"
                  />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Slide-out Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-lg border-l border-white/10 z-50 menu-container"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="mb-8">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2"
                    style={{ fontFamily: 'Creepster, cursive' }}
                  >
                    Rick & Morty
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-slate-300 text-sm"
                  >
                    Character Explorer
                  </motion.p>
                </div>

                <div className="flex-1 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Search Characters
                    </label>
                    <SearchBar />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Filter Options
                    </label>
                    <Filters />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  <p className="text-slate-400 text-xs text-center">
                    Click anywhere outside to close
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {status === 'loading' && (
            <div className="flex justify-center items-center py-20">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
          
          {status === 'failed' && (
            <div className="text-center py-20">
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-400 text-lg">⚠️ Error: {error}</p>
              </div>
            </div>
          )}
          
          {status === 'succeeded' && (
            <>
              <div className="mb-6">
                <p className="text-slate-400 text-sm">
                  {/* Found {characters.length} characters */}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-12">
                {characters.map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>
              
              <div className="flex justify-center">
                <Pagination />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Page = () => (
  <Provider store={store}>
    <CharactersPage />
  </Provider>
);

export default Page;