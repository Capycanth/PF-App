import { CurrencyPipe, DatePipe, NgClass, TitleCasePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Account, Category, Month, ObjectId, Transaction } from "../../../srcDB/model/dataModels";
import { ChangesSubscribe } from "../shared/changes-subscribe.component";

type TransactionWithCategoryNames = Transaction & {
    categoryName?: string;
    subCategoryName?: string;
};

@Component({
    selector: 'transaction-grid',
    templateUrl: './transaction-grid.component.html',
    styleUrl: './transaction-grid.component.scss',
    imports: [CurrencyPipe, DatePipe, TitleCasePipe, NgClass],
    standalone: true,
})
export class TransactionGridComponent extends ChangesSubscribe {
    @Input() account!: Account;
    @Input() month!: Month;
    @Input() categoryMap: Map<ObjectId, Category> = new Map();
    @Input() test: boolean = false;

    constructor() { super(); }

    protected transactionsWithCategoryNames: TransactionWithCategoryNames[] = [];

    protected override update(): void {
        console.log("updating transactions");

        const transactions: Transaction[] = this.account.transactionsByMonth.get(this.month) ?? [];
        this.transactionsWithCategoryNames = transactions.map(tx => this.parseTransaction(tx));
        this.transactionsWithCategoryNames.sort((a, b) => new Date(b.date.split('/').reverse().join('/')).getTime() - new Date(a.date.split('/').reverse().join('/')).getTime());
    }

    private parseTransaction(tx: Transaction): TransactionWithCategoryNames {
        const category: Category | undefined = this.categoryMap.get(tx.categoryId);
        if (!category) {
            console.error(`Category with ID ${tx.categoryId} not found.`);
            return {
                ...tx,
                categoryName: "error",
                subCategoryName: "error"
            }
        }

        const subCategory: string | undefined = tx.subCategory;
        return {
            ...tx,
            categoryName: category.name,
            subCategoryName: subCategory ? category.subCategories.includes(subCategory) ? subCategory : "Error" : undefined,
        };
    }
}
