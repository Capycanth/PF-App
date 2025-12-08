import mongoose from "mongoose";
import { Month } from "../enumeration/month.enum";
import { PartialRecord } from "../type/types";
import { Base } from "./base.model";
import { Transaction, TransactionSchema } from "./transaction.model";

export interface Account extends Base {
    owner: string;
    year: number;
    transactionsByMonth: PartialRecord<Month, Transaction[]>;
    budgetIdsByMonth: PartialRecord<Month, string>;
    icon: string;
}

const AccountSchema = new mongoose.Schema({
    id: { type: String, required: true },
    owner: { type: String, required: true },
    year: { type: Number, required: true },
    transactionsByMonth: {
        type: Map,
        of: [TransactionSchema],   // each key holds an array of Transactions
        default: {}
    },
    budgetIdsByMonth: {
        type: Map,
        of: String,             // each key holds budgetId (string)
        default: {}
    },
    icon: { type: String, default: '' }
}, {
    timestamps: true
});

export const AccountDB = mongoose.model('Account', AccountSchema);
