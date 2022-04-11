import {
  addInrelations,
  addOutRelations,
  addPureModel,
  array,
  createStruct,
  Infer,
  number,
  object,
  optional,
  OutRelation,
  string,
} from "/home/zahra/work/lesan/mod.ts";
import db from "../../../db.ts";
import {
  countryOutRel as sharedCountryOutRel,
  pureCountryObj as sharedPureCountryObj,
} from "../../shared/mod.ts";

export const createCoreCountrySchema = () => {
  const countryPureObj: Partial<typeof sharedPureCountryObj> = {
    name: string(),
    enName: optional(string()),
    countryCode: optional(array(string())),
    geometries: optional(object({
      type: string(),
      coordinates: array(array(number())),
    })),
  };

  const countryInRel = {};

  const outRelCountry: Partial<typeof sharedCountryOutRel> = {
    user: {
      schemaName: "user",
      number: 50,
      sort: { field: "_id", order: "desc" },
    },
  };

  addPureModel("country", countryPureObj);

  addOutRelations({
    schemaName: "country",
    outrelation: outRelCountry as Record<string, OutRelation>,
  });

  addInrelations({
    schemaName: "country",
    inrelation: countryInRel,
  });
  const countryStruct = createStruct("country");

  type Country = Infer<typeof countryStruct>;

  return db.collection<Country>("Country");
};
