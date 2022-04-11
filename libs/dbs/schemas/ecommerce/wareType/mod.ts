import {
  addInrelations,
  addOutRelations,
  addPureModel,
  createStruct,
  Infer,
  optional,
  OutRelation,
  string,
} from "/home/zahra/work/lesan/mod.ts";
import db from "../../../db.ts";

import {
  wareTypeOutRel as sharedWareTypeOutRel,
  pureWareTypeObj as sharedPureWareTypeObj,
} from "../../shared/mod.ts";

export const createEcommerceWareTypeSchema = () => {
  const wareTypePureObj: Partial<typeof sharedPureWareTypeObj> = {
    name: string(),
    description: optional(string()),
  };

  const wareTypeInRel = {};

  const outRelWareType: Partial<typeof sharedWareTypeOutRel> = {
    wares: {
      schemaName: "ware",
      number: 50,
      sort: { field: "_id", order: "desc" },
    },
  };

  addPureModel("wareType", wareTypePureObj);

  addOutRelations({
    schemaName: "wareType",
    outrelation: outRelWareType as Record<string, OutRelation>,
  });

  addInrelations({
    schemaName: "wareType",
    inrelation: wareTypeInRel,
  });
  const wareTypeStruct = createStruct("wareType");

  type wareType = Infer<typeof wareTypeStruct>;

  return db.collection<wareType>("wareType");
};
