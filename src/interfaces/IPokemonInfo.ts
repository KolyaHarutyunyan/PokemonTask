import IPokemonCard from "./IPokemonCard"

type Sprite = {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
}

type Stat = {
    base_stat: number;
    effort: number
}

export default interface IPokemonInfo {
    species: IPokemonCard;
    sprites: Sprite;
    stats: Stat[];
    types: { type: IPokemonCard }[];
    weight: number;
    moves: { move: IPokemonCard }[];
    name?: string;
    imgUrl?: string;
    url: string;
}