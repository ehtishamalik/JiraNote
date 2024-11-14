import axios from 'axios';
import { IRecipient } from '../types';

export const fetchIssues = async (): Promise<IRecipient[] | null> => {
  try {
    const response = await axios.get('/.netlify/functions/get-issues');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recipients:', error);
    return null;
  }
};
