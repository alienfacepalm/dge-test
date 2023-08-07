export type Customer = {
  churnedAt: string | null;
  mrr: number;
  trialEndDate: string;
  type: string;
  firstPaidDate: string;
  name: string;
  id: string;
};

export interface Filter {
  property: string;
  value: number;
  operator: string;
}

export interface Action {
  id: string;
  nextActionId: string | null;
  actionType: string;
  parentBranchId: string | null;
}

export interface Branch {
  id: string;
  parentBranchId: string | null;
  name: string;
  position: number;
  filters: Filter[];
}
