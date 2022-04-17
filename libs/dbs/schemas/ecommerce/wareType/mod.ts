import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import db from "../../../db.ts";
import { Infer, optional, OutRelation, string } from "../../../deps.ts";

import {
  pureWareTypeObj as sharedPureWareTypeObj,
  wareTypeOutRel as sharedWareTypeOutRel,
} from "../../shared/mod.ts";

const wareTypePureObj: Partial<typeof sharedPureWareTypeObj> = {
  name: string(),
  description: optional(string()),
};

const wareTypeInRel = {};

const wareTypeOutRel: Partial<typeof sharedWareTypeOutRel> = {
  wares: {
    schemaName: "ware",
    number: 50,
    sort: { field: "_id", order: "desc" },
  },
};

export const wareTypes = () =>
  ecommerceApp.odm.setModel(
    "wareType",
    wareTypePureObj,
    wareTypeInRel,
    wareTypeOutRel as Record<string, OutRelation>,
  );
