import { number, object, string } from "../../../../deps.ts";
import { selectStruct } from "../../../../mod.ts";

export const addCounntryValidator = () => {
    return object({
        set: object({
            name: string(),
            age: number(),
        }),
        get: selectStruct("country", 2),
    });
};
