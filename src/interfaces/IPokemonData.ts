import IPokemonInfo from "./IPokemonInfo";

export default interface IPokemonData {
    count: number;
    results: IPokemonInfo[] | undefined;
}