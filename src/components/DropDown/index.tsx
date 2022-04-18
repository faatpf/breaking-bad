import React from "react";

/**
 * @interface DropDownProps  DropDown Component Props
 */
interface DropDownProps {
  label?: string;
  options: Array<number | string>;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value:string;
}
/**
 * @description DropDown component
 * @param props: DropDownProps
 */
const DropDown: React.FC<DropDownProps> = (props: DropDownProps) => {
  const { label, options, onChange,value} = props;

  return (
    <div className="breaking-bad-drop-down">
      <label className="breaking-bad-drop-down__label">
        {label}
        <select onChange={onChange} value={value}>
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
