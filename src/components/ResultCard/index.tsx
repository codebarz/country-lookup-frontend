import React, { useState } from 'react';
import numberToCurrency from '../../helpers/toCurrency';
import Card from '../Card';
import Input from '../InputField';
import './styles.css';

interface Currencies {
  code: string;
  name: string;
  symbol: string;
}

export interface Country {
  currencies: Currencies[];
  name: string;
  population: number;
  currencyToSEK: number;
}

const ResultCard: React.FC<Country> = ({
  name,
  population,
  currencies,
  currencyToSEK,
}) => {
  const [currencyInView, setCurrencyInView] = useState<string>(
    currencies[0].code,
  );

  const handleCurrencyInView = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    setCurrencyInView(e.currentTarget.innerText);
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
          <span>Population</span>: {numberToCurrency(population)}
        </p>
        <p className="country-detail">
          <span>Currencies (code name symbol):</span>
        </p>
        <ul>{renderCurrency(currencies)}</ul>
        <div className="currency-converter-wrapper">
          <h4>Currency Converter</h4>
          {currencies.length > 1 ? (
            <div className="currency-options">
              <ul>{renderCurrencyOptions(currencies)}</ul>
            </div>
          ) : null}
          <div className="currency-converter">
            <Input
              type="number"
              value="1"
              label={currencyInView}
              showLabel
              onChange={() => {}}
              name=""
              id=""
              aditionalClass="currency-input"
            />
            <Input
              type="number"
              value={currencyToSEK.toString()}
              label="SEK"
              showLabel
              onChange={() => {}}
              name=""
              id=""
              aditionalClass="currency-input"
            />
          </div>
        </div>
      </article>
    </Card>
  );
};

export default ResultCard;
