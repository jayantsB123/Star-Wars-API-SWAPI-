// api.js
import axios from 'axios';

const BASE_URL = 'https://swapi.dev/api';

export const fetchPlanets = async (page) => {
  const response = await axios.get(`${BASE_URL}/planets/?page=${page}`);
  return response.data;
};

export const fetchResidents = async (residentUrls) => {
  const residentPromises = residentUrls.map((url) => axios.get(url));
  const residentsData = await Promise.all(residentPromises);
  return residentsData.map((residentData) => residentData.data);
};