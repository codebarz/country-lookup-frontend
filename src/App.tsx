import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoutes';

const HomePage = lazy(() => import('./pages/Home'));
const LoginPage = lazy(() => import('./pages/Login'));

function App() {
  return (
    <Suspense fallback="Loading...">
      <Router>
        <ProtectedRoute exact={true} path="/" Component={HomePage} />
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="*" render={() => <div>404 Not found</div>} />
      </Router>
      <Toaster />
    </Suspense>
  );
}

export default App;
