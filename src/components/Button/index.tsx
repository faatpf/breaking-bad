import React from "react";
import "./style.css";

/**
 * @interface ButtonProps  Button Component Props
 */
interface ButtonProps {
  title?: string;
  htmlType?: "submit" | "reset" | "button";
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  containerClassName?: string;
}
/**
 * @description Button component
 * @param props: ButtonProps
 */
const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const {
    title,
    htmlType = "button",
    onClick,
    className,
    containerClassName,
  } = props;
  return (
    <div
      className={`breaking-bad-btn__container${
        containerClassName ? ` ${containerClassName}` : ""
      }`}
    >
      <button
        type={htmlType}
        onClick={onClick}
        className={`breaking-bad-btn${className ? ` ${className}` : ""}`}
      >
        {<span className={"breaking-bad-btn__title"}>{title}</span>}
      </button>
    </div>
  );
};

export default Button;
