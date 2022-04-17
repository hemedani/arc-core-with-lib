import { wares, wareTypes } from "../../libs/dbs/schemas/ecommerce/mod.ts";
import { lesan, MongoClient } from "./deps.ts";
import { dynamicSetup } from "./dynamic/mod.ts";

export const ecommerceApp = lesan();

export const ware = wares();
export const wareType = wareTypes();
export const {
  selectStruct,
} = ecommerceApp.schemas;
export const {
  setAct,
  getMainActs,
} = ecommerceApp.acts;

const client = new MongoClient();

// Connecting to a Local Database
await client.connect("mongodb://localhost:27017/arc");
const db = client.database("ecommerce");

ecommerceApp.odm.setDb(db);
dynamicSetup();
export const ecommerceMainActs = getMainActs();

ecommerceApp.runServer({
  port: 8574,
  playground: true,
  typeGeneration: true,
});
