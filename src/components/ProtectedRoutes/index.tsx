import React from 'react';
import cookie from 'js-cookie';
import { Route, Redirect } from 'react-router-dom';

interface ComponentProps {
  Component: React.FC<any>;
  exact: boolean;
  path: string;
}

const ProtectedRoute: React.FC<ComponentProps> = ({
  Component,
  path,
  exact,
}) => {
  const isAuthenticated = cookie.get('gid');

  return isAuthenticated ? (
    <Route component={Component} path={path} exact={exact} />
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
