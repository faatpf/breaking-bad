import React from "react";

/**
 * @interface CardP component Card
 */
interface CardP {
  src: string;
  description: Array<string>;
}
/**
 * @name Card
 * @description Card component
 * @param props
 */
const Card: React.FC<CardP> = (props: CardP) => {
  const { src,description } = props;
  return (
    <div className="breaking-bad-card">
      <img
        className="breaking-bad-card__img"
        src={src}
        alt={`an image of breacking bad series character`}
      />
      <div className="breaking-bad-card__description">
        {description.map((des,idx)=> <div key={idx}>{des}</div>)}
      </div>
    </div>
  );
};

export default Card;
