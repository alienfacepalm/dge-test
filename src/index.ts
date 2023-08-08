import * as data from "./data/entities.json";

import { Customer, Action, Branch } from "./typings";

function customerFlow(customer: Customer) {
  // Find the root action
  const rootAction: any = Object.values(data.actions).find(
    (action: any) => action.parentBranchId === null
  );

  // presort branches by MRR filter
  const branchFiltersSorted = Object.values(data.branches).sort(
    (a: Branch, b: Branch) => {
      const idx = a.filters.findIndex((f) => f.property === "mrr");
      const mrrA = a.filters[idx]?.value;
      const mrrB = b.filters[idx]?.value;
      return mrrA - mrrB;
    }
  );

  // Find the branches using customer MRR filter
  const parentBranch: any = Object.values(branchFiltersSorted).find(
    (branch: Branch) => {
      const filters = branch.filters;

      // Here we find the branch that matches MRR input
      if (filters.length > 0) {
        for (const filter of filters) {
          if (filter.property === "mrr") {
            switch (filter.operator) {
              case "less":
                if (customer.mrr < Number(filter.value)) return true;
                break;
              case "more":
                if (customer.mrr > Number(filter.value)) return true;
                break;
              default:
                return false;
            }
          }
        }
      } else {
        return true;
      }
    }
  );

  // Find the subsequent actions using the firstBranch
  const actionBranches: any = Object.values(data.actions).filter(
    (action: Action) => action.parentBranchId === parentBranch.id
  );

  actionBranches.sort(
    (a: any, b: any) => a.nextActionId < (b.nextActionId || null)
  );

  // Return merged
  return [
    { playbookActionId: rootAction.id },
    { playbookBranchId: parentBranch.id },
    ...actionBranches.map((action: Action) => ({
      playbookActionId: action.id,
    })),
  ];
}

/************************************************************/

// Customer 1
const customerOne: Customer = {
  churnedAt: null,
  mrr: 200,
  trialEndDate: "2021-09-09T00:44:56.421Z",
  type: "subscribed",
  firstPaidDate: "2022-10-06T00:44:56.421Z",
  name: "Airbnb",
  id: "fa26cef6-fadc-4d89-b270-1e1ac3f3c1b7",
};

// Customer 2
const customerTwo: Customer = {
  churnedAt: null,
  mrr: 2000,
  trialEndDate: "2022-01-05T00:44:59.136Z",
  type: "subscribed",
  firstPaidDate: "2023-02-01T00:44:59.136Z",
  name: "IGN",
  id: "fc33ceff-450a-4a29-9c55-b8f36b5a0202",
};

console.log("Customer One\n", customerFlow(customerOne));
console.log("Customer Two\n", customerFlow(customerTwo));
