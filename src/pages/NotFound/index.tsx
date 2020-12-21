import React from 'react';
import NotFoundIndicator from '../../assets/images/404.svg';
import { Link } from 'react-router-dom';
import './styles.css';

const NotFound = () => {
  return (
    <main className="page-wrapper notfound-page">
      <img src={NotFoundIndicator} alt="404 Not Found" />
      <section>
        <Link to="/">Back to Home</Link>
      </section>
    </main>
  );
};

export default NotFound;
