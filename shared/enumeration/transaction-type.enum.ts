export enum TransactionType {
    INCOME = 0,
    EXPENSE = 1
}

export function getTransactionTypeLabel(tt: TransactionType): string {
    switch (tt) {
        case TransactionType.INCOME:
            return 'Income';
        case TransactionType.EXPENSE:
            return 'Expense';
        default:
            const _exhaustiveCheck: never = tt;
            return 'error';
    }
}