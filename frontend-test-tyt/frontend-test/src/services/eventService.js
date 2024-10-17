import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../config.js';

const useEventService = () => {
  const { token } = useAuth();

  const getEvents = async () => {
    if (!token) {
      throw new Error('No token available');
    }

    const response = await axios.get(`${API_BASE_URL}/events/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  };

  const getEventGames = async (id_event) => {
    if (!token) {
      throw new Error('No token available');
    }

    const response = await axios.get(`${API_BASE_URL}/games/${id_event}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  };

  return {
    getEvents,
    getEventGames,
  };
};

export default useEventService;
