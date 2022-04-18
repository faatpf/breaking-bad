import React from "react";
import "./style.css";

/**
 * @interface CardProps component Card Props
 */
interface CardProps {
  src?: string;
  description: Array<string>;
  className?: string;
}
/**
 * @name Card
 * @description Card component
 * @param props
 */
const Card: React.FC<CardProps> = (props: CardProps) => {
  const { src, description, className } = props;
  return (
    <div className={`breaking-bad-card${className ? ` ${className}` : ""}`}>
      {src && (
        <img
          className="breaking-bad-card__img"
          src={src}
          alt={`an image of breacking bad series character`}
        />
      )}
      <div className="breaking-bad-card__description">
        {description.map((des, idx) => (
          <div key={idx}>{des}</div>
        ))}
      </div>
    </div>
  );
};

export default Card;
