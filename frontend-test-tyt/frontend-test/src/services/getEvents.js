import axios from 'axios';
import API_BASE_URL from '../config';

const getEvents = async (token) => {
  try {
    if (!token) {
      throw new Error('No token available');
    }

    const response = await axios.get(`${API_BASE_URL}/list-event/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export default getEvents;
