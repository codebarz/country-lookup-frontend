import React from 'react';
import './styles.css';
import loading from '../../assets/images/loading-white.svg';

interface ButtonProps {
  text: string;
  isLoading?: boolean;
  additionalClasses?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  isLoading,
  additionalClasses,
}) => {
  return (
    <button className={`btn ${additionalClasses || ''}`}>
      {!isLoading ? text : <img src={loading} alt="Loading..." />}
    </button>
  );
};

export default Button;
