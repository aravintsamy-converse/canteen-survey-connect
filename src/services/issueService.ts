import axios from 'axios';
import type { Issue, SubmitIssuePayload } from '../type/issue';
import { getRuntimeConfig } from '../utils/config';

let apiUrl: string = ''; 

const init = async () => {
  const config = await getRuntimeConfig(); 
  apiUrl = config.API_URL;       
  console.log('API URL:', apiUrl);
};

init();

export const fetchCaseSubtypes = async (issueType: string): Promise<Issue[]> => {
  try {
    const response = await axios.get(`${apiUrl}/case-subtypes?case_type=${issueType}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching case subtypes:', error);
    throw error;
  }
};

export const submitIssue = async (payload: SubmitIssuePayload): Promise<void> => {
  try {
    await axios.post(`${apiUrl}/${payload.ProblemType.POSProblem ? 'machine-problem' : 'need-refund'}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error submitting issue:', error);
    throw new Error('Failed to submit issue');
  }
};