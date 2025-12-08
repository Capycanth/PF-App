import mongoose from "mongoose";
import { PartialRecord } from "../type/types";
import { Base } from "./base.model";

export interface Budget extends Base {
    name: string;
    limitsByCategoryId: PartialRecord<string, PartialRecord<string, number>>;
}

const BudgetSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    limitsByCategoryId: {
        type: Map,
        of: {
            type: Map,
            of: Number
        },
        default: {}
    }
}, {
    timestamps: true
});

export const BudgetDB = mongoose.model('Budget', BudgetSchema);