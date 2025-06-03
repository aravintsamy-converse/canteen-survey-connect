export interface Issue {
  value: string;
  label: string;
}

export interface SubmitIssuePayload {
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
    RefundAmount: null | number;
  }>;
}