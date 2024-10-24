import { SelectOption } from '../types';

export const fetchOptions = async (url: string): Promise<SelectOption[]> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Failed to fetch options:', error);
    return [];
  }
};
