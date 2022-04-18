import React from "react";
import "./style.css";

/**
 * @interface LoaderProps  Loader Component Props
 */
interface LoaderProps {
  className?: string;
  containerClassName?: string;
}
/**
 * @description Loader component
 * @param props: LoaderProps
 */
const Loader: React.FC<LoaderProps> = (props: LoaderProps) => {
  const { className, containerClassName } = props;
  return (
    <div
      className={`breaking-bad-Loader__container${
        containerClassName ? ` ${containerClassName}` : ""
      }`}
    >
      <div className={`breaking-bad-Loader${className ? ` ${className}` : ""}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
