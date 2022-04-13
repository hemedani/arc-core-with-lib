import {
    addInrelations,
    addOutRelations,
    addPureModel,
    createStruct,
    Infer,
    InRelation,
    optional,
    OutRelation,
    string,
} from "/home/zahra/work/lesan/mod.ts";
import db from "../../../db.ts";
import {
    pureWareCategoryObj as sharedPureWareCategoryObj,
    wareCategoryInRel as sharedWareCategoryInRel,
    wareCategoryOutRel as sharedWareCategoryOutRel,
} from "../../shared/mod.ts";

export const createEcommerceWareCateogySchema = () => {
    const wareCategoryPureObj: Partial<typeof sharedPureWareCategoryObj> = {
        name: string(),
    };
    const outRelWareCategory: Partial<typeof sharedWareCategoryOutRel> = {
        wares: {
            schemaName: "ware",
            number: 50,
            sort: { field: "_id", order: "desc" },
        },
    };
    const wareCategoryInRel: Partial<typeof sharedWareCategoryInRel> = {
        wareType: {
            schemaName: "wareType",
            type: "one",
        },
    };
    addPureModel("wareCategory", wareCategoryPureObj);

    addOutRelations({
        schemaName: "wareCategory",
        outrelation: outRelWareCategory as Record<string, OutRelation>,
    });

    addInrelations({
        schemaName: "wareCategory",
        inrelation: wareCategoryInRel as Record<string, InRelation>,
    });
    const wareCategoryStruct = createStruct("wareCategory");

    type wareCategory = Infer<typeof wareCategoryStruct>;

    return db.collection<wareCategory>("wareCategory");
};
