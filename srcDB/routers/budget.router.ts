import { Budget } from "../model/dataModels";
import { createBaseRouter } from "./factory.router";

export default createBaseRouter('budget', (data: any | any[]): Budget[] => {
    if (Array.isArray(data)) {
        return data.map(item => parseBudget(item));
    } else {
        return [parseBudget(data)];
    }
});

function parseBudget(data: any): Budget {
    return {
        id: data.id,
        name: data.name,
        limitsByCategoryId: JSON.parse(data.limitsByCategoryId) ?? {},
    };
}