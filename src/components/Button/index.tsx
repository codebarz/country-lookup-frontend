import React, { ButtonHTMLAttributes } from 'react';
import './styles.css';
import loading from '../../assets/images/loading-white.svg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
  additionalClasses?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  isLoading,
  additionalClasses,
  onClick,
}) => {
  return (
    <button className={`btn ${additionalClasses || ''}`} onClick={onClick}>
      {!isLoading ? text : <img src={loading} alt="Loading..." />}
    </button>
  );
};

export default Button;
