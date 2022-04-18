import React from "react";

/**
 * @interface TextInput Component TextInput Props
 */
interface ITextInputProps extends React.HTMLProps<HTMLInputElement> {
  /* input related Props */
  id?: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "number";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /* style related Props */
  className?: string;
  containerClassName?: string;
}

/**
 * @description TextInput
 * @param props: ITextInputProps
 */
const TextInput: React.FC<ITextInputProps> = (props: ITextInputProps) => {
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
    <div className={`breaking-bad-text-input ${className}`.trim()}>
      <div
        className={`breaking-bad-text-input-label__container ${containerClassName}`.trim()}
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
