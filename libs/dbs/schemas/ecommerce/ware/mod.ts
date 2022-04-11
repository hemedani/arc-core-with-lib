import {
  addInrelations,
  addOutRelations,
  addPureModel,
  createStruct,
  Infer,
  number,
  optional,
  string,
  InRelation
} from "/home/zahra/work/lesan/mod.ts";
import db from "../../../db.ts";

import {
  wareInRel as sharedWareInRel,
  pureWareObj as sharedPureWareObj,
} from "../../shared/mod.ts";

export const createEcommerceWareSchema = () => {
  const warePureObj: Partial<typeof sharedPureWareObj> = {
    name: string(),
    brand: string(),
    price:number(),
    description: optional(string()),
  };

  const wareInRel:Partial<typeof sharedWareInRel> = {
    warType: {
     schemaName: "wareType",
     type: "one",
    }
  };

  const outRelWare = {};

  addPureModel("ware", warePureObj);

  addOutRelations({
    schemaName: "ware",
    outrelation: outRelWare,
  });

  addInrelations({
    schemaName: "ware",
    inrelation: wareInRel as Record<string, InRelation>,
  });
  const wareStruct = createStruct("ware");

  type ware = Infer<typeof wareStruct>;

  return db.collection<ware>("ware");
};
