import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  name: string;
  status: string;
  species: string;
}

const initialState: FiltersState = {
  name: '',
  status: '',
  species: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setNameFilter(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setSpeciesFilter(state, action: PayloadAction<string>) {
      state.species = action.payload;
    },
  },
});

export const { setNameFilter, setStatusFilter, setSpeciesFilter } = filtersSlice.actions;
export default filtersSlice.reducer;