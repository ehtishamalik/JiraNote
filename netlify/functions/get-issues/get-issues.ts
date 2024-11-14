import { Handler } from '@netlify/functions';
import axios from 'axios';
import { urlIssues, urlSprint } from '../../constants';
import { summarizeTicketsByRecipient } from '../../utils';
import { Sprint } from '../../types';

export const handler: Handler = async () => {
  const username = process.env.API_USERNAME;
  const password = process.env.API_SECRET_KEY;

  try {
    const sprints = await axios.get(urlSprint, {
      auth: {
        username: username ?? '',
        password: password ?? '',
      },
    });

    const activeSprint: Sprint[] = sprints.data.values.filter(
      (sprint: Sprint) => sprint.state === 'active'
    );
    if (!activeSprint.length) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Could not find sprints' }),
      };
    }
    const sprintid = activeSprint[0].id;

    const response = await axios.get(`${urlIssues}/${sprintid}/issue`, {
      auth: {
        username: username ?? '',
        password: password ?? '',
      },
    });

    const { data } = response;
    if ('issues' in data) {
      const formattedData = summarizeTicketsByRecipient(data);
      return {
        statusCode: 200,
        body: JSON.stringify(formattedData),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not format issues' }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
