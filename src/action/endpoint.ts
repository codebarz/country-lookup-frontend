const API_URI = process.env.REACT_APP_API_URL;

const endpoints = {
  login: `${API_URI}/api/v1/auth/login`,
  searchCountry: (country: string) => `${API_URI}/api/v1/country/${country}`,
};

export default endpoints;
