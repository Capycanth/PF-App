import { Goal } from "../model/dataModels";
import { createBaseRouter } from "./factory.router";

export default createBaseRouter('goal', (data: any | any[]): Goal[] => {
    if (Array.isArray(data)) {
        return data.map(item => parseGoal(item));
    } else {
        return [parseGoal(data)];
    }
});

function parseGoal(data: any): Goal {
    return {
        id: data.id,
        name: data.name,
        note: data.note,
        total_cost: data.total_cost,
        saved: data.saved,
        categoryId: data.categoryId,
        subCategory: data.subCategory,
    };
}
