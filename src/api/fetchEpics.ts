import axios from 'axios';
import { SelectOption } from '../types';

export const fetchEpics = async (): Promise<SelectOption[]> => {
  try {
    const response = await axios.get('/.netlify/functions/get-epics');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recipients:', error);
    return [];
  }
};
