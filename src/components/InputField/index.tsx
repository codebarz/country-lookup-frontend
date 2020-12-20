import React, { InputHTMLAttributes } from 'react';
import './styles.css';

interface ComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  showLabel?: boolean;
  aditionalClass?: string;
}

const Input: React.FC<ComponentProps> = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  id,
  showLabel,
  disabled,
  aditionalClass,
}) => {
  return (
    <div className={`input-wrapper ${aditionalClass ? aditionalClass : ''}`}>
      {showLabel ? <label htmlFor={id}>{label}</label> : null}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
