import { Handler } from '@netlify/functions';
import axios from 'axios';

export const handler: Handler = async () => {
  // API URL
  const url = 'https://trustbooks.atlassian.net/rest/agile/1.0/board/14/sprint';

  const username = process.env.API_USERNAME;
  const password = process.env.API_SECRET_KEY;

  try {
    const data = await axios.get(url, {
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
