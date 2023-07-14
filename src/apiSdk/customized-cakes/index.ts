import axios from 'axios';
import queryString from 'query-string';
import { CustomizedCakeInterface, CustomizedCakeGetQueryInterface } from 'interfaces/customized-cake';
import { GetQueryInterface } from '../../interfaces';

export const getCustomizedCakes = async (query?: CustomizedCakeGetQueryInterface) => {
  const response = await axios.get(`/api/customized-cakes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCustomizedCake = async (customizedCake: CustomizedCakeInterface) => {
  const response = await axios.post('/api/customized-cakes', customizedCake);
  return response.data;
};

export const updateCustomizedCakeById = async (id: string, customizedCake: CustomizedCakeInterface) => {
  const response = await axios.put(`/api/customized-cakes/${id}`, customizedCake);
  return response.data;
};

export const getCustomizedCakeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/customized-cakes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCustomizedCakeById = async (id: string) => {
  const response = await axios.delete(`/api/customized-cakes/${id}`);
  return response.data;
};
