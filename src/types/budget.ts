export interface Budget {
    id_budget: number;
    description: string;
    id_appointment: number;
    status: {
      id_budget_status: number;
      name: string;
    };
    created_at: string; // ISO 8601 format
    amount: string; // Represented as string to preserve exact formatting
  }