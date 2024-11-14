import axios from 'axios';
import { SelectOption } from '../types';

export const fetchRecipients = async (): Promise<SelectOption[]> => {
  try {
    const response = await axios.get('/json/recipients.json');

    return response.data;
  } catch (error) {
    console.error('Failed to fetch recipients:', error);
    return [];
  }
};
