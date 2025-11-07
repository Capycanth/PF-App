import { SubCategory } from "../model/dataModels";
import { createBaseRouter } from "./factory.router";

export default createBaseRouter('subcategory', (data: any | any[]): SubCategory[] => {
    if (Array.isArray(data)) {
        return data.map(item => parseSubCategory(item));
    } else {
        return [parseSubCategory(data)];
    }
});

function parseSubCategory(data: any): SubCategory {
    return {
        id: data.id,
        name: data.name,
    };
}