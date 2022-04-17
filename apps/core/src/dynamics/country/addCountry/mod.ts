export * from "./addCountry.fn.ts";
export * from "./addCountry.val.ts";

import { coreApp } from "../../../../mod.ts";
import { addCountryfn } from "./addCountry.fn.ts";
import { addCounntryValidator } from "./addCountry.val.ts";

export const addCountrySetup = () =>
    coreApp.acts.setAct({
        type: "dynamic",
        schema: "country",
        fn: addCountryfn,
        actName: "addCountry",
        validator: addCounntryValidator(),
    });
