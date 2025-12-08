import mongoose from 'mongoose';
import { TransactionType } from "../enumeration/transaction-type.enum";
import { Base } from "./base.model";

export interface Category extends Base {
    name: string;
    type: TransactionType;
    subCategories: string[];
}

const CategorySchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: TransactionType, required: true },
    subCategories: { type: [String], default: [] },
}, {
    timestamps: true
});

export const CategoryDB = mongoose.model('Category', CategorySchema);