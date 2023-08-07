import * as data from "./data/entities.json";

type Customer = {
  churnedAt: string | null;
  mrr: number;
  trialEndDate: string;
  type: string;
  firstPaidDate: string;
  name: string;
  id: string;
};

// const customer: Customer = {
//   churnedAt: null,
//   mrr: 200,
//   trialEndDate: "2021-09-09T00:44:56.421Z",
//   type: "subscribed",
//   firstPaidDate: "2022-10-06T00:44:56.421Z",
//   name: "Airbnb",
//   id: "fa26cef6-fadc-4d89-b270-1e1ac3f3c1b7",
// };

const customer: Customer = {
  churnedAt: null,
  mrr: 2000,
  trialEndDate: "2022-01-05T00:44:59.136Z",
  type: "subscribed",
  firstPaidDate: "2023-02-01T00:44:59.136Z",
  name: "IGN",
  id: "fc33ceff-450a-4a29-9c55-b8f36b5a0202",
};

function customerFlow(customer: Customer, data: any) {
  //   console.log({ customer, data });
  // Find the first action
  const firstAction = Object.values(data.actions).find(
    (action: any) => action.parentBranchId === null
  );
  console.log({ firstAction });

  // presort branches by MRR
  const branchFiltersSorted = Object.values(data.branches).sort((a: any, b: any) => {
    const mrrA = a.filters[0]?.value || Infinity;
    const mrrB = b.filters[0]?.value || Infinity;
    return mrrA - mrrB;
  });

  // Find the branches using customer data
  const firstBranch = Object.values(branchFiltersSorted).find((branch: any) => {
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
  });

  //   console.log({ firstBranch });

  // Now we find the subsequent actions using the firstBranch
  const actionBranches = 
}

customerFlow(customer, data);
