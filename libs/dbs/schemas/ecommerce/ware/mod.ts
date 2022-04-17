import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import db from "../../../db.ts";
import { Infer, InRelation, number, optional, string } from "../../../deps.ts";

import {
  pureWareObj as sharedPureWareObj,
  wareInRel as sharedWareInRel,
} from "../../shared/mod.ts";

export const createEcommerceWareSchema = () => {
  const {
    addInrelations,
    addOutRelations,
    addPureModel,
    createStruct,
  } = ecommerceApp.schemas;

  const warePureObj: Partial<typeof sharedPureWareObj> = {
    name: string(),
    brand: string(),
    price: number(),
    description: optional(string()),
  };

  const wareInRel: Partial<typeof sharedWareInRel> = {
    warType: {
      schemaName: "wareType",
      type: "one",
    },
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
