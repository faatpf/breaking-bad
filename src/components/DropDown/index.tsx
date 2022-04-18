import React from "react";
import "./style.css";

/**
 * @interface DropDownProps  DropDown Component Props
 */
interface DropDownProps {
  label?: string;
  options: Array<number | string>;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
  className?: string;
}
/**
 * @description DropDown component
 * @param props: DropDownProps
 */
const DropDown: React.FC<DropDownProps> = (props: DropDownProps) => {
  const { label, options, onChange, value, className } = props;

  return (
    <div
      className={`breaking-bad-drop-down${className ? ` ${className}` : ""}`}
    >
      <label className="breaking-bad-drop-down__label">
        {label}
        <select
          onChange={onChange}
          value={value}
          className="breaking-bad-drop-down__select"
        >
          {options.map((option, idx) => (
            <option value={option} key={idx}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default DropDown;
