import { ActFn } from "../../deps.ts";
import { wareType } from "../../mod.ts";

export const addWareTypeFn: ActFn = async (body) => {
    const {
        set: { name, description },
        get,
    } = body.details;

    await wareType.insertOne({
        name,
        description,
    });
};
