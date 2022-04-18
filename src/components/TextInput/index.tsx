import React from "react";
import './style.css'

/**
 * @interface TextInputProps  TextInput Component Props
 */
interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
  id?: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "number";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  containerClassName?: string;
}

/**
 * @description TextInput component
 * @param props: TextInputProps
 */
const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {
  const {
    id,
    label,
    placeholder,
    className = "",
    containerClassName = "",
    onBlur,
    onChange,
    ...rest
  } = props;

  return (
    <div
      className={`breaking-bad-text-input${className ? ` ${className}` : ""}`}
    >
      <div
        className={`breaking-bad-text-input-label__container${
          containerClassName ? ` ${containerClassName}` : ""
        }`}
      >
        {label && (
          <label htmlFor={id} className={`breaking-bad-text-input__label`}>
            {label}
          </label>
        )}
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={onChange}
          {...rest}
        />
      </div>
    </div>
  );
};

export default TextInput;
