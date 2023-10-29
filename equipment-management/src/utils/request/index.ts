import { notification } from 'antd';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { split } from 'lodash-es';
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  timeout: 5000,
});

const errorHandler = (error: AxiosError): Promise<any> => {
  if (error.response) {
    const { data } = error.response;
    notification.error({
      message: 'Oops,there are error occurred',
      description: `${split(data + '', '\n', 1)}`,
    });
  }
  return Promise.reject(error);
};

const responseHandler = (response: AxiosResponse): AxiosResponse<any> | Promise<any> | any => {
  return response.data;
};
instance.interceptors.response.use(responseHandler, errorHandler);

export default instance;
