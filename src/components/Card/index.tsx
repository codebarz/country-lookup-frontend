import React from 'react';
import './styles.css';

interface ComponentProps extends React.PropsWithChildren<unknown> {
  additionalClasses?: string;
}

const Card: React.FC<ComponentProps> = ({ children, additionalClasses }) => {
  return <div className={`card ${additionalClasses || ''}`}>{children}</div>;
};

export default Card;
