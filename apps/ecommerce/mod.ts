import {
  createEcommerceWareSchema,
  createEcommerceWareTypeSchema,
} from "../../libs/dbs/schemas/ecommerce/mod.ts";
import { ObjectID } from "../../libs/dbs/utils/deps.ts";
import {
  ActFn,
  getMainActs,
  MongoClient,
  number,
  object,
  optional,
  runServer,
  selectStruct,
  setAct,
  string,
  throwError,
} from "./deps.ts";

const client = new MongoClient();

// Connecting to a Local Database
await client.connect("mongodb://localhost:27017/arc");
const db = client.database("core");

const ware = createEcommerceWareSchema();
const wareType = createEcommerceWareTypeSchema();

///////////////////// Ware//////////////////////
//
// addWare validator
const addWareValidator = () => {
  return object({
    set: object({
      name: string(),
      brand: string(),
      price: number(),
      description: optional(string()),
      wareTypeId: string(),
    }),
    get: selectStruct("ware", { wareType: 1 }),
  });
};

/// addWareFn
const addWareFn: ActFn = async (body) => {
  const {
    set: { name, description, price, brand, wareTypeId },
    get,
  } = body.details;
  // check this wareType is exist
  const foundWareType = await wareType.findOne({
    _id: new ObjectID(wareTypeId),
  });
  !foundWareType && throwError("wareType not exist");

  await ware.insertOne({
    name,
    description,
    price,
    brand,
    wareType: {
      _id: foundWareType!._id,
      name: foundWareType!.name,
      description: foundWareType!.description,
    },
  });
  // TODO add ware to QQ To add WareTYpe
};
setAct({
  type: "dynamic",
  schema: "ware",
  fn: addWareFn,
  actName: "addWare",
  validator: addWareValidator(),
});

/////////////////// WareType//////////////////////
//
// addWareType
const addWareTypeValidator = () => {
  return object({
    set: object({
      name: string(),
      description: optional(string()),
    }),
    get: selectStruct("ware", { ware: 1 }),
  });
};

const addWareTypeFn: ActFn = async (body) => {
  const {
    set: { name, description },
    get,
  } = body.details;

  await wareType.insertOne({
    name,
    description,
  });
  return { name, description };
};
setAct({
  type: "dynamic",
  schema: "wareType",
  fn: addWareTypeFn,
  actName: "addWareType",
  validator: addWareTypeValidator(),
});
//// updateWareType
const updateWareTypeValidator = () => {
  return object({
    set: object({
      _id: string(),
      name: optional(string()),
      description: optional(string()),
    }),
    get: selectStruct("ware", { ware: 1 }),
  });
};

const updateWareTypeFn: ActFn = async (body) => {
  const {
    set: { _id, name, description },
    get,
  } = body.details;
  const foundedWareType = await wareType.findOne({ _id: new ObjectID(_id) });
  !foundedWareType && throwError("wareType not exist");
  // TODO QueryQueue for update for example ware
  await wareType.updateOne({ _id: new ObjectID(_id) }, { name, description });
};
setAct({
  type: "dynamic",
  schema: "wareType",
  fn: updateWareTypeFn,
  actName: "updateWareType",
  validator: updateWareTypeValidator(),
});
/////////////////////////////////////////////////////////

export const ecommerceMainActs = getMainActs();

runServer({ port: 8574, playground: true, db, typeGeneration: true });
