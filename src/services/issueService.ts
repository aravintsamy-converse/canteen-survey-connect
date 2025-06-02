export interface Issue {
  value: string;
  label: string;
}

export const fetchCaseSubtypes = async (issueFor: string): Promise<Issue[]> => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  try {
    const response = await fetch(
      `${apiUrl}/case-subtypes?case_type=${encodeURIComponent(issueFor)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Assuming data is an array of { value, label }
  } catch (err: any) {
    console.error('Error fetching case subtypes:', err.message);
    return [];
  }
};