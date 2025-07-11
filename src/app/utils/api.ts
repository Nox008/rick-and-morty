import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character';

export const fetchCharacters = async (page: number, name: string, status: string, species: string) => {
  const response = await axios.get(API_URL, {
    params: { page, name, status, species },
  });
  return response.data;
};