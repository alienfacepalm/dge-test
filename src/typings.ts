export type Customer = {
  churnedAt: string | null;
  mrr: number;
  trialEndDate: string;
  type: string;
  firstPaidDate: string;
  name: string;
  id: string;
};

export type ActionType =
  | "addToSegmentAction"
  | "assignCSMAction"
  | "startConversationAction"
  | "createIndicatorAction";

export interface Filter {
  property: string;
  value: number;
  operator: string;
}

export interface Action {
  id: string;
  nextActionId: string | null;
  actionType: ActionType;
  parentBranchId: string | null;
}

export interface Branch {
  id: string;
  parentBranchId: string | null;
  name: string;
  position: number;
  filters: Filter[];
}

export interface ActionsData {
  [key: string]: Action;
}

export interface BranchesData {
  [key: string]: Branch;
}

export interface Data {
  actions: any;
  branches: any;
}
