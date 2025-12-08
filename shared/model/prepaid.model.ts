import mongoose from "mongoose";
import { Base } from "./base.model";

export interface Prepaid extends Base {
    accountId: string;
    name: string;
    totalCost: number;
    saved: number;
    categoryId: string;
    subCategory: string;
}

const PrepaidSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    accountId: { type: String, required: true },
    totalCost: { type: Number, required: true },
    saved: { type: Number, default: 0 },
    categoryId: { type: String, required: true },
    subCategory: { type: String, required: true }
}, {
    timestamps: true
});

export const PrepaidDB = mongoose.model('Prepaid', PrepaidSchema);