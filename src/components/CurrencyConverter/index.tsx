import React from 'react';
import Input from '../InputField';

interface ComponentProps {
  currencyInViewCode: string;
  currencyToConvertToCode: string;
  conversionValue: number;
  onCurrencyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currencyValue: number;
  isLoading?: boolean;
}

const CurrecnyConverter: React.FC<ComponentProps> = ({
  currencyInViewCode,
  currencyToConvertToCode,
  conversionValue,
  onCurrencyChange,
  currencyValue,
  isLoading,
}) => {
  return (
    <div className="currency-converter">
      <Input
        type="number"
        value={currencyValue.toString()}
        label={currencyInViewCode}
        showLabel
        onChange={onCurrencyChange}
        name={currencyInViewCode}
        id={currencyInViewCode}
        aditionalClass="currency-input"
        disabled={isLoading}
      />
      <Input
        type="number"
        value={conversionValue?.toString() || '0'}
        label={currencyToConvertToCode}
        showLabel
        onChange={() => {}}
        name={currencyToConvertToCode}
        id={currencyToConvertToCode}
        disabled
        aditionalClass="currency-input"
      />
    </div>
  );
};

export default CurrecnyConverter;
