import axios from 'axios';
import API_BASE_URL from '../config.js';

const register = async (userData) => {
  console.log(userData,"userData")
  try {
    const response = await axios.post(`${API_BASE_URL}/user-register/`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default {
  register,
}; 
