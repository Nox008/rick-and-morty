import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchCharacters } from '../utils/api';
import { Character } from '../types';

interface CharacterState {
  characters: Character[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  totalPages: number;
}

const initialState: CharacterState = {
  characters: [],
  status: 'idle',
  error: null,
  page: 1,
  totalPages: 1,
};

export const getCharacters = createAsyncThunk(
  'characters/getCharacters',
  async ({ page, name, status, species }: { page: number; name: string; status: string; species: string }) => {
    const response = await fetchCharacters(page, name, status, species);
    return response;
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.characters = action.payload.results;
        state.totalPages = action.payload.info.pages;
      })
      .addCase(getCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setPage } = charactersSlice.actions;
export default charactersSlice.reducer;