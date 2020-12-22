import axios, { AxiosResponse } from 'axios';
import cookie from 'js-cookie';

const token: string = cookie.get('gid') || '';

export const get = (
  url: string,
  headers: Record<string, unknown>,
): Promise<AxiosResponse<any>> => {
  const requestHeader = token
    ? { ...headers, authorization: `Bearer ${token}` }
    : { ...headers };
  return axios({
    url,
    headers: requestHeader,
    method: 'GET',
  })
    .then((response) => response)
    .catch((error) => {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error);
      }
    });
};

export const post = (
  url: string,
  headers: Record<string, unknown>,
  data: Record<string, unknown>,
): Promise<AxiosResponse<any>> => {
  const requestHeader = token
    ? { ...headers, authorization: `Bearer ${token}` }
    : { ...headers };
  return axios({ url, headers: requestHeader, data, method: 'POST' })
    .then((response) => response)
    .catch((error) => {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error);
      }
    });
};
