import "./PokemonInfo.css";
import IPokemonInfo from "../interfaces/IPokemonInfo";
import Image from "./Image";

interface IPokemonInfoProps {
  pokemonInfo: IPokemonInfo | undefined;
}

const PokemonInfo: React.FC<IPokemonInfoProps> = ({ pokemonInfo }) => {
    const {
        sprites: {
            front_default,
            back_default,
            front_shiny,
            back_shiny
        }
    } = pokemonInfo || { sprites: {} };
    
    return (
        <div className="info">
            <p>Species - <em>{pokemonInfo?.species.name}</em></p> 
            <div className="images-box">
                <Image imgURL={front_default || ""} />
                <Image imgURL={back_default || ""} />
                <Image imgURL={front_shiny || ""} />
                <Image imgURL={back_shiny || ""} />
            </div>
            <p className="stats">Stats -
                {pokemonInfo?.stats.map((item, index) => (
                    <em key={index}>{item.base_stat} - {item.effort}</em>
                ))}              
            </p> 
            <p className="stats">Types -
                {pokemonInfo?.types.map((item, index) => (
                    <em key={index}>{item.type.name}</em>
                ))}
            </p> 
            <p>Weight - <em>{pokemonInfo?.weight}</em></p> 
            <p className="stats">Moves -
                {pokemonInfo?.moves.map((item, index) => (
                    <em key={index}>{item.move.name}</em>
                ))}
            </p> 
        </div>
    );
};

export default PokemonInfo;