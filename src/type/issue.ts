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

export interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export interface LocationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (location: string) => void
}