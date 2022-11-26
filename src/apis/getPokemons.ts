import axios from "axios";
import IPokemonData from "../interfaces/IPokemonData";

export const getPokemons = async (offset: number = 0, limit: number = 16): Promise<IPokemonData> => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  return data;
};
