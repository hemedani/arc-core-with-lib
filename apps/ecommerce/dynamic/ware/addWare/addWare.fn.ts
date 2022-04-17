import { throwError } from "../../../../utils/throwError.ts";
import { ObjectId } from "../../../deps.ts";
import { ActFn } from "../../../deps.ts";
import { ecommerceApp, ware, wareType } from "../../../mod.ts";

export const addWareFn: ActFn = async (body) => {
  const {
    set: { name, description, price, brand, wareTypeId },
    get,
  } = body.details;
  // check this wareType is exist
  const foundWareType = await wareType.findOne({
    _id: new ObjectId(wareTypeId),
  }, {
    _id: 1,
    name: 1,
    description: 1,
  });
  console.log(wareTypeId, foundWareType);
  !foundWareType && throwError("wareType not exist");

  console.log("---0:", foundWareType);
  const inWare = await ware.insertOne({
    name,
    description,
    price,
    brand,
    // wareType: foundWareType,
  });

  console.log("---1");
  // TODO add ware to QQ To add WareTYpe
};
