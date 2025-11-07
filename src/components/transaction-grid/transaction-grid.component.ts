import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Category, SubCategory, Transaction } from "../../../srcDB/model/dataModels";
import { CurrencyPipe, DatePipe, TitleCasePipe, NgClass } from "@angular/common";
import { startWith, Subject } from "rxjs";
import { ChangesSubscribe } from "../changes-subscribe.component";

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
    @Input() transactions: Transaction[] = [];
    @Input() categoryMap: Map<string, Category> = new Map<string, Category>();
    @Input() subCategoryMap: Map<string, SubCategory> = new Map<string, SubCategory>();

    protected transactionsWithCategoryNames: TransactionWithCategoryNames[] = [];

    protected override update(): void {
        console.log("updating transactions");
        this.transactionsWithCategoryNames = this.transactions.map(tx => {
            const category: Category | undefined = this.categoryMap.get(tx.categoryId);
            const subCategory: SubCategory | undefined = this.subCategoryMap.get(tx.subCategoryId || '');

            if (!category) console.error(`Category with ID ${tx.categoryId} not found.`);
            if (tx.subCategoryId && !subCategory) console.error(`Sub-Category with ID ${tx.subCategoryId} not found.`);

            return {
                ...tx,
                categoryName: category ? category.name : undefined,
                subCategoryName: subCategory ? subCategory.name : undefined,
            };
        });
    }
}
