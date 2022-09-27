import axios from 'axios';

const API_URL = 'http://localhost:3001/api';
const headers = { 'Content-Type': 'application/json' };

const getAllProducts = () => axios.get(`${API_URL}/products`, { headers });

export default {
  getAllProducts,
};
