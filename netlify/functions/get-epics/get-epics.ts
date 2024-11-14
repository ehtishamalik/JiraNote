import { Handler } from '@netlify/functions';
import axios from 'axios';
import { urlEpic } from '../../constants';
import { formatEpics } from '../../utils';

export const handler: Handler = async () => {
  const username = process.env.API_USERNAME;
  const password = process.env.API_SECRET_KEY;

  try {
    const response = await axios.get(urlEpic, {
      auth: {
        username: username ?? '',
        password: password ?? '',
      },
    });

    const formattedEpics = formatEpics(response.data);

    return {
      statusCode: 200,
      body: JSON.stringify(formattedEpics),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
