import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoutes';
import Loading from './commons/Loading';
import DetailContext from './store/userContext';

const HomePage = lazy(() => import('./pages/Home'));
const LoginPage = lazy(() => import('./pages/Login'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <DetailContext>
            <ProtectedRoute exact={true} path="/" Component={HomePage} />
            <Route path="/login" component={LoginPage} />
          </DetailContext>
          <Route path="*" render={() => <NotFoundPage />} />
        </Switch>
      </Router>
      <Toaster />
    </Suspense>
  );
}

export default App;
