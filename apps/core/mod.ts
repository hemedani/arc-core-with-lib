import { countries, users } from "../../libs/dbs/schemas/core/mod.ts";
import { ecommerceMainActs } from "../ecommerce/mod.ts";
import { userInp } from "./declarations/selectInp.ts";
import { ActFn, lesan, MongoClient, number, object, string } from "./deps.ts";

export const coreApp = lesan();

const user = users();
const country = countries();

const {
  setAct,
  setService,
  getAtcsWithServices,
  getDynamicActs,
} = coreApp.acts;

const {
  selectStruct,
  getSchemas,
} = coreApp.schemas;

const client = new MongoClient();

// Connecting to a Local Database
await client.connect("mongodb://localhost:27017/arc");
const db = client.database("core");

const addUserValidator = () => {
  return object({
    set: object({
      name: string(),
      age: number(),
    }),
    get: selectStruct<userInp>("user", { country: { user: 1 } }),
  });
};

const addUserFn: ActFn = async (body) => {
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

  const {
    set: { name, age },
    get,
  } = body.details;

  await user.insertOne({
    name,
    age,
  });

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
coreApp.odm.setDb(db);
coreApp.runServer({ port: 8585, playground: false, typeGeneration: true });
