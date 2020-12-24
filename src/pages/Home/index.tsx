import React, { useState, useEffect } from 'react';
import Layout from '../../commons/Layout';
import Input from '../../components/InputField';
import ResultCard, { Country } from '../../components/ResultCard';
import endpoints from '../../action/endpoint';
import { get } from '../../helpers/request';
import loadingIndicator from '../../assets/images/loading-blue.svg';
import toast from 'react-hot-toast';
import './styles.css';
import { useUserContext } from '../../store/userContext';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Array<Country> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token } = useUserContext();
  const { state } = useLocation();

  //Send search request 3 seconds after user stops typing
  //instead of on every key press
  useEffect(() => {
    if (searchQuery && searchQuery.trim().length) {
      setIsLoading(true);
    }
    const holdRequest = setTimeout(() => {
      if (searchQuery && searchQuery.trim().length) {
        const locationState = state as { token: string };
        const userToken = locationState.token || token;
        get(endpoints.searchCountry(searchQuery.trim()), {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        })
          .then((response) => {
            setIsLoading(false);
            if (response.status === 200) {
              setSearchResults(response.data.payload);
            }
          })
          .catch((error) => {
            setIsLoading(false);
            toast.error(error.message);
            setSearchResults(null);
          });
      }
    }, 3000);

    return () => clearTimeout(holdRequest);
  }, [searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const renderCountriesResult = () => {
    return searchResults ? (
      searchResults.map((country) => {
        return (
          <ResultCard
            key={country.name}
            name={country.name}
            currencies={country.currencies}
            population={country.population}
            currencyToSEK={country.currencyToSEK}
          />
        );
      })
    ) : (
      <h1 id="no-results">No results found :(</h1>
    );
  };
  return (
    <Layout>
      <main className="home-wrapper">
        <section className="search-input">
          <Input
            label="Enter country name"
            type="text"
            value={searchQuery}
            name="search"
            onChange={handleChange}
            id="search"
            placeholder="Search country by name"
            showLabel
          />
        </section>
        <section className="search-results">
          {!isLoading ? (
            renderCountriesResult()
          ) : (
            <div className="search-loading">
              <img src={loadingIndicator} alt="Loading..." />
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
};

export default Home;
