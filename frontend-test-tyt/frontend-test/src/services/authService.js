import axios from 'axios';
import API_BASE_URL from '../config.js';

const login = async (cedula) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, { cedula });
    return response.data;
  } catch (error) {
    console.log(error);
    
    if (error.response) {
      throw new Error(error.response.data.non_field_errors[0] || 'Por favor validar la cédula.');
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error('Error in login request');
    }
  }
};

export default {
  login,
};
