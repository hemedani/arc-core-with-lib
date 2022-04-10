import {
  ActFn,
  getActs,
  getDynamicActs,
  getSchemas,
  number,
  object,
  runServer,
  selectStruct,
  setAct,
  string,
} from "/Users/syd/work/arc/lesan/mod.ts";
import {
  createCoreCountrySchema,
  createCoreUserSchema,
} from "../../libs/dbs/schemas/core/mod.ts";

const country = createCoreCountrySchema();
const user = createCoreUserSchema();

const addUserValidator = () => {
  return object({
    set: object({
      name: string(),
      age: number(),
    }),
    get: selectStruct("user", { country: 1, nnno: 1 }),
  });
};
const addUserFn: ActFn = (body) => {
  const schemas = getSchemas();
  const acts = getDynamicActs();

  /*
  *  @LOG @DEBUG @INFO
  *  This log written by ::==> {{ syd }}
  *
  *  Please remove your log after debugging
  */
  console.group("schemas ------ ");
  console.log(" ============= ");
  console.log();
  console.info("schemas", JSON.stringify(schemas, null, 2));
  console.log();
  console.log(" ============= ");
  console.groupEnd();

  /*
  *  @LOG @DEBUG @INFO
  *  This log written by ::==> {{ syd }}
  *
  *  Please remove your log after debugging
  */
  console.group("acts ------ ");
  console.log(" ============= ");
  console.log();
  console.info(JSON.stringify(acts, null, 2));
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

runServer({ port: 8585, playground: true });
