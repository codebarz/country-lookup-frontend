import React, { InputHTMLAttributes } from 'react';
import './styles.css';

interface ComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  showLabel?: boolean;
}

const Input: React.FC<ComponentProps> = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  id,
  showLabel,
}) => {
  return (
    <div className="input-wrapper">
      {showLabel ? <label htmlFor={id}>{label}</label> : null}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
      />
    </div>
  );
};

export default Input;
