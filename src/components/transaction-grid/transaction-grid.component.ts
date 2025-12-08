import { CurrencyPipe, DatePipe, NgClass, TitleCasePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { Month } from "../../../shared/enumeration/month.enum";
import { Account } from "../../../shared/model/account.model";
import { Category } from "../../../shared/model/category.model";
import { Transaction } from "../../../shared/model/transaction.model";
import { ChangesSubscribe } from "../shared/changes-subscribe.component";

type TransactionWithCategoryNames = Transaction & {
    categoryName?: string;
    subCategoryName?: string;
};

@Component({
    selector: 'transaction-grid',
    templateUrl: './transaction-grid.component.html',
    styles: `
    .odd-row {
        background-color: var(--highlight-dark-color) !important;
    }
    .even-row {
        background-color: var(--highlight-color) !important;
    }
    .row-shared {
        height: 2rem;
    }`,
    imports: [CurrencyPipe, DatePipe, MatTableModule, TitleCasePipe, NgClass],
    standalone: true,
})
export class TransactionGridComponent extends ChangesSubscribe {
    @Input() account!: Account;
    @Input() month!: Month;
    @Input() categoryMap: Map<string, Category> = new Map();

    protected displayedColumns: string[] = ['Date', 'Type', 'Category', 'Sub-Category', 'Amount', 'Note'];

    constructor() { super(); }

    protected transactionsWithCategoryNames: TransactionWithCategoryNames[] = [];

    protected override update(): void {
        console.log("updating transactions");

        const transactions: Transaction[] = this.account.transactionsByMonth[this.month] ?? [];
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
