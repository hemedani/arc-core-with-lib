import { ecommerceApp } from "../../mod.ts";
import { addWareTypeFn, addWareTypeValidator } from "../mod.ts";

export * from "./addWareType.fn.ts";
export * from "./addWareType.val.ts";

ecommerceApp.acts.setAct({
  type: "dynamic",
  schema: "wareType",
  fn: addWareTypeFn,
  actName: "addWareType",
  validator: addWareTypeValidator(),
});
