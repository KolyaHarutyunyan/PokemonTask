import axios from "axios";
import IPokemonInfo from "../interfaces/IPokemonInfo";

export const getPokemonByName = async (name: string): Promise<IPokemonInfo> => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return data;
};