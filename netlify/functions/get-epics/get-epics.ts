import { Handler } from '@netlify/functions';
import axios from 'axios';
import { urlEpic } from '../../constants';

export const handler: Handler = async () => {
  const username = process.env.API_USERNAME;
  const password = process.env.API_SECRET_KEY;

  try {
    const data = await axios.get(urlEpic, {
      auth: {
        username: username ?? '',
        password: password ?? '',
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(data.data),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
