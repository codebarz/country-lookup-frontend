import React from 'react';
import Header from '../Header';

interface ComponentProps extends React.PropsWithChildren<unknown> {}

const Layout: React.FC<ComponentProps> = ({ children }) => {
  return (
    <div className="page-wrapper">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
