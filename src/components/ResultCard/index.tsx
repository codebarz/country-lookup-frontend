import React, { useEffect, useState } from 'react';
import endpoints from '../../action/endpoint';
import { post } from '../../helpers/request';
import numberToCurrency from '../../helpers/toCurrency';
import Card from '../Card';
import CurrecnyConverter from '../CurrencyConverter';
import loadingIndicator from '../../assets/images/loading-blue.svg';
import './styles.css';
import { useUserContext } from '../../store/userContext';
import { useLocation } from 'react-router-dom';

interface Currencies {
  code: string;
  name: string;
  symbol: string;
}

export interface Country {
  currency: string;
  name: string;
  population: number;
  currencyToSEK: number;
}

const ResultCard: React.FC<Country> = ({
  name,
  population,
  currency,
  currencyToSEK,
}) => {
  const [currencyInView, setCurrencyInView] = useState<string>(currency);

  const [toSEK, setToSEK] = useState<number>(currencyToSEK);
  const [currencyValue, setCurrencyValue] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token } = useUserContext();
  const { state } = useLocation();

  useEffect(() => {
    const holdRequest = setTimeout(() => {
      if (currencyValue) {
        setIsLoading(true);
        const locationState = state as { token: string };
        const userToken = locationState.token || token;
        post(
          endpoints.convertCurrency,
          {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          { code: currencyInView, amount: currencyValue, convertToCode: 'SEK' },
        )
          .then((response) => {
            setIsLoading(false);
            if (response.status === 200) {
              setToSEK(response.data.conversion);
            }
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error);
          });
      }
    }, 3000);

    return () => clearTimeout(holdRequest);
  }, [currencyValue, currencyInView, state, token]);

  const handleCurrencyInView = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    setCurrencyInView(e.currentTarget.innerText);
  };

  const handleCurrencyValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCurrencyValue(+e.target.value);
  };

  const renderCurrency = (currencies: Currencies[]) => {
    return currencies?.map((currency) => (
      <li key={currency.name}>
        {currency.code} {currency.name} {currency.symbol}
      </li>
    ));
  };

  const renderCurrencyOptions = (currencies: Currencies[]) =>
    currencies.map((currency) => (
      <li key={currency.name} onClick={handleCurrencyInView}>
        {currency.code}
      </li>
    ));

  return (
    <Card additionalClasses="single-country">
      <article>
        <h2>{name}</h2>
        <p className="country-detail">
          <span>Population</span>:{' '}
          {population ? numberToCurrency(population) : 'N/A'}
        </p>
        <p className="country-detail">
          <span>Currencies (code name symbol):</span>
        </p>
        <ul>
          <li>{currency}</li>
        </ul>
        <div className="currency-converter-wrapper">
          <h4>
            Currency Converter{' '}
            {isLoading ? (
              <span>
                <img src={loadingIndicator} alt="Loading..." />
              </span>
            ) : null}
          </h4>
          {currency ? (
            <div className="currency-options">
              <ul>
                <li>{currency}</li>
              </ul>
            </div>
          ) : null}
          <CurrecnyConverter
            currencyInViewCode={currencyInView}
            currencyToConvertToCode="SEK"
            conversionValue={toSEK}
            onCurrencyChange={handleCurrencyValueChange}
            currencyValue={currencyValue}
          />
        </div>
      </article>
    </Card>
  );
};

export default ResultCard;
