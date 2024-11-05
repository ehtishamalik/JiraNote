import { SelectOption } from '../types';

export const fetchOptions = async (url: string): Promise<SelectOption[]> => {
  try {
    const response = await fetch(url);

    return response.json();
  } catch (error) {
    console.error('Failed to fetch options:', error);
    return [];
  }
};
