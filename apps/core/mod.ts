import {
  createCoreCountrySchema,
  createCoreUserSchema,
} from "../../libs/dbs/schemas/core/mod.ts";
import { ecommerceMainActs } from "../ecommerce/mod.ts";
import { userInp } from "./declarations/selectInp.ts";
import {
  ActFn,
  getAtcsWithServices,
  getDynamicActs,
  getSchemas,
  MongoClient,
  number,
  object,
  runServer,
  selectStruct,
  setAct,
  setService,
  string,
} from "./deps.ts";

const client = new MongoClient();

// Connecting to a Local Database
await client.connect("mongodb://localhost:27017/arc");
const db = client.database("core");

const country = createCoreCountrySchema();
const user = createCoreUserSchema();

const addUserValidator = () => {
  return object({
    set: object({
      name: string(),
      age: number(),
    }),
    get: selectStruct<userInp>("user", { country: { user: 1 } }),
  });
};

const addUserFn: ActFn = (body) => {
  const acts = getAtcsWithServices();

  /*
  *  @LOG @DEBUG @INFO
  *  This log written by ::==> {{ syd }}
  *
  *  Please remove your log after debugging
  */
  console.group("acts ------ inside addUserFn");
  console.log(" ============= ");
  console.log();
  console.info(acts, " ------ ");
  console.log();
  console.log(" ============= ");
  console.groupEnd();

  return {
    what: "what you said",
  };
};
setAct({
  type: "dynamic",
  schema: "user",
  fn: addUserFn,
  actName: "addUser",
  validator: addUserValidator(),
});

const addCounntryValidator = () => {
  return object({
    set: object({
      name: string(),
      age: number(),
    }),
    get: selectStruct("country", 2),
  });
};

const addCountryfn: ActFn = (body) => {
  /*
  *  @LOG @DEBUG @INFO
  *  This log written by ::==> {{ syd }}
  *
  *  Please remove your log after debugging
  */
  console.group("body ------ from addCountryfn");
  console.log(" ============= ");
  console.log();
  console.info({ body }, " ------ ");
  console.log();
  console.log(" ============= ");
  console.groupEnd();
};

setAct({
  type: "dynamic",
  schema: "country",
  fn: addCountryfn,
  actName: "addCountry",
  validator: addCounntryValidator(),
});

////// set Service For ecommerce //////////
////  url Base
// setService("ecommerce", "http://localhost:8574/lesan");

/// set Service
//  Act Base
// setService("ecommerce", {
//    dynamic: {
//        wareType: {
//            addWareTypee: {
//                validator: addWareTypeValidator(),
//                fn: addWareTypeFn,
//            },
//        },
//    },
//    static: {},
// });

setService("ecommerce", "http://localhost:8574/lesan");
// setService("ecommerce", ecommerceMainActs);
runServer({ port: 8585, playground: false, db, typeGeneration: true });
