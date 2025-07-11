import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './characterSlice';
import filtersReducer from './filterSlice'

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;