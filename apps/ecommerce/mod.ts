import { wares, wareTypes } from "../../libs/dbs/schemas/ecommerce/mod.ts";
import { lesan, MongoClient } from "./deps.ts";
import { addWareFn, addWareValidator } from "./ware/mod.ts";
import { addWareTypeFn, addWareTypeValidator, updateWareTypeFn, updateWareTypeValidator } from "./wareType/mod.ts";

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

///////////////////// WareAct//////////////////////
setAct({
    type: "dynamic",
    schema: "ware",
    fn: addWareFn,
    actName: "addWare",
    validator: addWareValidator(),
});

/////////////////// WareType//////////////////////
setAct({
    type: "dynamic",
    schema: "wareType",
    fn: addWareTypeFn,
    actName: "addWareType",
    validator: addWareTypeValidator(),
});
setAct({
    type: "dynamic",
    schema: "wareType",
    fn: updateWareTypeFn,
    actName: "updateWareType",
    validator: updateWareTypeValidator(),
});
/////////////////////////////////////////////////////////
ecommerceApp.odm.setDb(db);
export const ecommerceMainActs = getMainActs();

ecommerceApp.runServer({
    port: 8574,
    playground: true,
    typeGeneration: true,
});
