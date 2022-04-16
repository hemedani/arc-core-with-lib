import {
  addInrelations,
  addPureModel,
  InRelation,
  number,
  optional,
  string,
} from "../../../deps.ts";

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

addPureModel("ware", pureWareObj);

addInrelations({
  schemaName: "ware",
  inrelation: wareInRel,
});
