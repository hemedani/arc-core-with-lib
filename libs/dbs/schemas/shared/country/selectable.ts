import { assign, object } from "https://deno.land/x/lestruct/mod.ts";
import {
  baseSelectableFields,
  checkRelation,
  decreaseIterate,
  fieldType,
} from "../../../utils/mod.ts";
import { UserInp, userSelectable } from "../user/mod.ts";

export type CountryInp = {
  user: number | UserInp;
};

export const countrySelectable = (depth: number | CountryInp = 2): any => {
  const returnObj = {
    ...baseSelectableFields,
    name: fieldType,
    enName: fieldType,
    countryCode: fieldType,
  };
  const numberDepth = (depth: number, pureObj: typeof returnObj) => {
    depth--;
    return depth > -1
      ? object({
        ...pureObj,
        user: userSelectable(depth),
      })
      : object(pureObj);
  };

  const objectDepth = (depth: any, pureObj: Record<string, any>) => {
    depth = decreaseIterate<CountryInp>(depth);

    checkRelation(depth, "user") &&
      (pureObj = object({
        ...pureObj,
        user: userSelectable(depth.user),
      }));

    return pureObj;
  };

  const completeObj = typeof depth === "number"
    ? numberDepth(depth, returnObj)
    : objectDepth(depth, returnObj);

  return completeObj;
};
