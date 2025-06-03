// src/services/issueService.ts

import axios from 'axios';
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

interface Issue {
  value: string;
  label: string;
}

interface SubmitIssuePayload {
  ProblemType: {
    POSProblem: boolean;
    Refund: boolean;
  };
  ConnectLocationNumber: string;
  ProblemDescription: string | null;
  RequesterDetails: {
    Name: string;
    Email: string;
    Phone: string;
  };
  Incidents: Array<{
    CaseType: {
      guid: string;
    };
    RefundAmount: null;
  }>;
}

export const fetchCaseSubtypes = async (issueType: string): Promise<Issue[]> => {
  try {
    // Replace with your actual API endpoint and logic
    const response = await axios.get(`${apiUrl}/case-subtypes?case_type=${issueType}`);
    return response.data; // Assuming response.data is an array of { value: string, label: string }
  } catch (error) {
    console.error('Error fetching case subtypes:', error);
    throw error;
  }
};

export const submitIssue = async (payload: SubmitIssuePayload): Promise<void> => {
  console.log("🚀 ~ submitIssue ~ payload:", payload)
  try {
    // Replace with your actual API endpoint
    await axios.post(`${apiUrl}/submit-issue`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error submitting issue:', error);
    throw new Error('Failed to submit issue');
  }
};