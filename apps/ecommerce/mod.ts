import {
    ActFn,
    number,
    object,
    optional,
    runServer,
    selectStruct,
    setAct,
    string,
    throwError,
} from "/home/zahra/work/lesan/mod.ts";
import { createEcommerceWareSchema, createEcommerceWareTypeSchema } from "../../libs/dbs/schemas/ecommerce/mod.ts";
import { ObjectID } from "../../libs/dbs/utils/deps.ts";

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
    const foundWareType = await wareType.findOne({ _id: new ObjectID(wareTypeId) });
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
};
setAct({
    type: "dynamic",
    schema: "ware",
    fn: addWareFn,
    actName: "addWare",
    validator: addWareValidator(),
});

/////////////////// WareType//////////////////////
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
    console.log(body.details);

    const {
        set: { name, description },
        get,
    } = body.details;

    await wareType.insertOne({
        name,
        description,
    });
};
setAct({
    type: "dynamic",
    schema: "wareType",
    fn: addWareTypeFn,
    actName: "addWareType",
    validator: addWareTypeValidator(),
});

/////////////////////////////////////////////////////////
runServer({ port: 8585, playground: true });
