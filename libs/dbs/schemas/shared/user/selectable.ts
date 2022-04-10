import { assign, object } from "https://deno.land/x/lestruct/mod.ts";
import {
  baseSelectableFields,
  checkRelation,
  decreaseIterate,
  fieldType,
} from "../../../utils/mod.ts";
import { CountryInp, countrySelectable } from "../country/selectable.ts";

export type UserInp = {
  country: number | CountryInp;
};

export const userSelectable = (depth: number | UserInp = 2): any => {
  const returnObj = {
    ...baseSelectableFields,
    name: fieldType,
    age: fieldType,
    lastName: fieldType,
    phone: fieldType,
    gender: fieldType,
    birthDate: fieldType,
    postalCode: fieldType,
    level: fieldType,
    email: fieldType,
    isActive: fieldType,
    creditCardNumber: fieldType,
  };
  const numberDepth = (depth: number, pureObj: typeof returnObj) => {
    depth--;
    return depth > -1
      ? object({
        ...pureObj,
        country: countrySelectable(depth),
      })
      : object(pureObj);
  };

  const objectDepth = (depth: any, pureObj: Record<string, any>) => {
    depth = decreaseIterate<CountryInp>(depth);

    checkRelation(depth, "user") &&
      (pureObj = object({
        ...pureObj,
        country: countrySelectable(depth.country),
      }));

    return pureObj;
  };

  const completeObj = typeof depth === "number"
    ? numberDepth(depth, returnObj)
    : objectDepth(depth, returnObj);

  return completeObj;
};
