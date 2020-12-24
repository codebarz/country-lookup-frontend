import axios, { AxiosResponse } from 'axios';

export const get = (
  url: string,
  headers: Record<string, unknown>,
): Promise<AxiosResponse<any>> => {
  return axios({
    url,
    headers,
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
  return axios({ url, headers, data, method: 'POST' })
    .then((response) => response)
    .catch((error) => {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error);
      }
    });
};
