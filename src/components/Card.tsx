import "./Card.css";
import Button from "./Button";
import IPokemonInfo from "../interfaces/IPokemonInfo";
import Image from "./Image";

interface ICardProps {
  card: IPokemonInfo;
  onViewMore: (card: IPokemonInfo) => void;
}

const Card: React.FC<ICardProps> = ({ card, onViewMore }) => {
  return (
    <div className="card">
      <span className="card-name">{card.name}</span>
        <div className="card-img">
          <Image imgURL={card.imgUrl || ""} />
        </div>
      <Button
        label="View More"
        onClick={() => onViewMore(card)}
      />
    </div>
  );
};

export default Card;