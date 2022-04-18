import React from "react";

/**
 * @interface ButtonProps  Button Component Props
 */
interface ButtonProps {
  title?: string;
  htmlType?: 'submit' | 'reset' | 'button';
  onClick?: (event?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement> | React.FormEvent<HTMLFormElement>) => void;
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
        htmlType='button',
        onClick,
        className,
        containerClassName
      } = props;
  return (
    <div className={`breaking-bad-btn ${containerClassName}`.trim()}>
        <button
          type={htmlType}
          onClick={onClick}
          className={className}
        >
        {<span className={'breaking-bad-btn__title'}>{title}</span>}
        </button>
    </div>
  );
};

export default Button;
