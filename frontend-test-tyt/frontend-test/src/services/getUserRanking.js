import axios from 'axios';
import API_BASE_URL from '../config'; // Importa la URL base de la API

const getUserRanking = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user-ranking/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Utiliza el token proporcionado como argumento
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user ranking');
  }
};

export default getUserRanking;
