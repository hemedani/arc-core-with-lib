import { wareSetup } from "./ware/mod.ts";
import { wareTypeSetup } from "./wareType/mod.ts";

export const dynamicSetup = () => {
  wareSetup();
  wareTypeSetup();
};
