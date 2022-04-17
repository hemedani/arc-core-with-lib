import {
  array,
  boolean,
  date,
  enums,
  Infer,
  InRelation,
  number,
  optional,
  string,
} from "../../../deps.ts";

import { coreApp } from "../../../../../apps/core/mod.ts";
import db from "../../../db.ts";
import {
  pureUserObj as sharedPureUser,
  userInRel as userInRelShared,
} from "../../shared/mod.ts";

export const createCoreUserSchema = () => {
  const {
    addInrelations,
    addPureModel,
    createStruct,
  } = coreApp.schemas;

  const level = enums(["Admin", "Editor", "Author", "Ghost", "Normal"]);
  const gender = enums(["Male", "Female"]);

  const pureUserObj: Partial<typeof sharedPureUser> = {
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

  const userInRel: Partial<typeof userInRelShared> = {
    country: {
      schemaName: "country",
      type: "one",
    },
  };
  const userOutRel = {};

  addPureModel("user", pureUserObj);

  addInrelations({
    schemaName: "user",
    inrelation: userInRel as Record<string, InRelation>,
  });

  //   it's comment due to create type when its need on app execution contenxt
  // export type PureUser = Infer<typeof pureUser>;

  const userStruct = createStruct("user");

  //   it's comment due to create type when its need on app execution contenxt
  type User = Infer<typeof userStruct>;

  return db.collection<User>("User");
};
