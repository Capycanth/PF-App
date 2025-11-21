import { Account } from "../model/dataModels";
import { createBaseRouter } from "./factory.router";

export default createBaseRouter('account', (data: any | any[]): Account[] => {
    if (Array.isArray(data)) {
        return data.map(item => parseAccount(item)) as Account[];
    } else {
        return [parseAccount(data)];
    }
});

function parseAccount(data: any): Account {
    return {
        id: data.id,
        user: data.user,
        year: data.year,
        transactionsByMonth: JSON.parse(data.transactionsByMonth) ?? {},
        budgetIdsByMonth: JSON.parse(data.budgetsByMonth) ?? {},
        icon: data.icon,
    };
}