import {
  addOutRelations,
  addPureModel,
  optional,
  OutRelation,
  string,
} from "../../../deps.ts";

export const pureWareTypeObj = {
  name: string(),
  description: optional(string()),
};

export const wareTypeOutRel: Record<string, OutRelation> = {
  wares: {
    schemaName: "ware",
    number: 50,
    sort: { field: "_id", order: "desc" },
  },
};

export const wareTypeInRel = {};

addPureModel("wareType", pureWareTypeObj);

addOutRelations({
  schemaName: "wareType",
  outrelation: wareTypeOutRel,
});
