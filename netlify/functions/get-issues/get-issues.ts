import { Handler } from '@netlify/functions';
import axios from 'axios';

export const handler: Handler = async (event) => {
  if (!event.queryStringParameters) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Sprint ID required',
      }),
    };
  }

  const { sprintid } = event.queryStringParameters;
  const url = `https://trustbooks.atlassian.net/rest/agile/1.0/board/15/sprint/${sprintid}/issue`;

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
      statusCode: 401,
      body: JSON.stringify(error),
    };
  }
};
