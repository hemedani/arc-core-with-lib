import {
  addInrelations,
  addPureModel,
  array,
  boolean,
  date,
  enums,
  InRelation,
  number,
  optional,
  string,
} from "../../../deps.ts";

const level = enums(["Admin", "Editor", "Author", "Ghost", "Normal"]);
const gender = enums(["Male", "Female"]);

export const pureUserObj = {
  name: string(),
  age: number(),
  lastName: string(),
  phone: number(),
  gender: gender,
  birthDate: optional(date()),
  postalCode: string(),
  level: array(level),
  email: optional(string()),
  isActive: optional(boolean()),
  creditCardNumber: optional(number()),
};

export const userInRel: Record<string, InRelation> = {
  country: {
    schemaName: "country",
    type: "one",
  },
};
export const userOutRel = {};

addPureModel("user", pureUserObj);

addInrelations({
  schemaName: "user",
  inrelation: userInRel,
});
