import { Schema } from "mongoose";
import { TransactionType } from "../enumeration/transaction-type.enum";

export interface Transaction {
    date: string;
    type: TransactionType;
    categoryId: string;
    subCategory: string;
    amount: number;
    note?: string;
}

export const TransactionSchema = new Schema({
    date: { type: String, required: true },
    type: { type: String, required: true },
    categoryId: { type: String, required: true },
    subCategory: { type: String, required: true },
    amount: { type: Number, required: true },
    note: { type: String }
}, { _id: false });