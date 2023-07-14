import axios from 'axios';
import queryString from 'query-string';
import { CakeDesignInterface, CakeDesignGetQueryInterface } from 'interfaces/cake-design';
import { GetQueryInterface } from '../../interfaces';

export const getCakeDesigns = async (query?: CakeDesignGetQueryInterface) => {
  const response = await axios.get(`/api/cake-designs${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCakeDesign = async (cakeDesign: CakeDesignInterface) => {
  const response = await axios.post('/api/cake-designs', cakeDesign);
  return response.data;
};

export const updateCakeDesignById = async (id: string, cakeDesign: CakeDesignInterface) => {
  const response = await axios.put(`/api/cake-designs/${id}`, cakeDesign);
  return response.data;
};

export const getCakeDesignById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/cake-designs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCakeDesignById = async (id: string) => {
  const response = await axios.delete(`/api/cake-designs/${id}`);
  return response.data;
};
