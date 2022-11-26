import axios from "axios";
import IPokemonInfo from "../interfaces/IPokemonInfo";

export const getCurrentPokemon = async (url: string): Promise<IPokemonInfo> => {
  const { data } = await axios.get(url);
  return data;
};
