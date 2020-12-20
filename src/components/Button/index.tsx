import React from 'react';
import './styles.css';

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
      {!isLoading ? text : 'Loading...'}
    </button>
  );
};

export default Button;
