import {
    addInrelations,
    addOutRelations,
    addPureModel,
    InRelation,
    optional,
    OutRelation,
    string,
} from "/home/zahra/work/lesan/mod.ts";

export const pureWareCategoryObj = {
    name: string(),
};

export const wareCategoryOutRel: Record<string, OutRelation> = {
    wares: {
        schemaName: "ware",
        sort: { field: "_id", order: "desc" },
        number: 50,
    },
};
export const wareCategoryInRel: Record<string, InRelation> = {
    wareType: {
        schemaName: "wareType",
        type: "one",
    },
};

addPureModel("wareCategory", pureWareCategoryObj);

addOutRelations({
    schemaName: "wareCategory",
    outrelation: wareCategoryOutRel,
});

addInrelations({ schemaName: "wareCategory", inrelation: wareCategoryInRel });
