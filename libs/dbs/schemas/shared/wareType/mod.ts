import {
  addInrelations,
  addOutRelations,
  addPureModel,
  InRelation,
  optional,
  OutRelation,
  string,
} from "/home/zahra/work/lesan/mod.ts";


export const pureWareTypeObj = {
name: string(),
description: optional(string()),
};



export const wareTypeOutRel:Record<string,OutRelation> = {
  wares: {
    schemaName: "ware",    number: 50,
    sort: { field: "_id", order: "desc" },
  },
};

export const wareTypeInRel = {};

addPureModel("wareType", pureWareTypeObj);

addOutRelations({
  schemaName: "wareType",
  outrelation: wareTypeOutRel,
});




