import { Component, Input } from "@angular/core";
import { Account, Category, Month } from "../../../srcDB/model/dataModels";
import { ChangesSubscribe } from "../changes-subscribe.component";

type BudgetCategorySummary = {
    categoryName: string;
    limit: number;
    current: number;
    remaining: number;
}

@Component({
    selector: 'budget-panel',
    templateUrl: './budget-panel.component.html',
    styleUrl: './budget-panel.component.scss',
    imports: [],
    standalone: true,
})
export class BudgetPanelComponent extends ChangesSubscribe {
    @Input() account!: Account;
    @Input() month!: Month;
    @Input() categoryMap: Map<string, Category> = new Map<string, Category>();

    protected expenseCategorySummaries: BudgetCategorySummary[] = [];
    protected incomeCategorySummaries: BudgetCategorySummary[] = [];

    protected override update(): void {
        console.log("updating budget")
        this.expenseCategorySummaries = [];
        this.incomeCategorySummaries = [];

        /* TODO: re-implement when we have budget test data

        for (const [categoryId, limit] of this.budget.limitsByCategoryId.entries()) {
            const category: Category | undefined = this.categoryMap.get(categoryId);
            if (!category) {
                console.error(`Category with ID ${categoryId} not found.`);
                continue;
            }

            const categoryTransactions: Transaction[] =
                this.transactions.filter(tx => tx.categoryId === categoryId);

            const amount: number = categoryTransactions.reduce((sum, tx) => sum + tx.amount, 0);

            const summary: BudgetCategorySummary = {
                categoryName: category.name,
                limit,
                current: amount,
                remaining: limit - amount,
            };

            if (category.type === 'expense') {
                this.expenseCategorySummaries.push(summary);
            } else if (category.type === 'income') {
                this.incomeCategorySummaries.push(summary);
            }
        }*/
    }
}