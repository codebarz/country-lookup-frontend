import React, {Suspense, lazy} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

const HomePage = lazy(() => import('./pages/Home'))

function App() {
  return (
    <Suspense fallback="Loading...">
    <Router>
      <Route component={HomePage} />
    </Router>
    </Suspense>
  );
}

export default App;
