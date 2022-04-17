import { InRelation, number, optional, string } from "../../../deps.ts";

export const pureWareObj = {
  name: string(),
  brand: string(),
  price: number(),
  description: optional(string()),
};

export const wareInRel: Record<string, InRelation> = {
  warType: {
    schemaName: "wareType",
    type: "one",
  },
};

export const wareOutRel = {};

// comment for know because we want create it whenever we create a new server for it
// addPureModel("ware", pureWareObj);
//
// addInrelations({
//   schemaName: "ware",
//   inrelation: wareInRel,
// });
