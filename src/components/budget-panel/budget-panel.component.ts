import { Component, Input } from "@angular/core";
import { Account, Budget, Category, Month, Transaction } from "../../../srcDB/model/dataModels";
import { ChangesSubscribe } from "../changes-subscribe.component";
import { BudgetPanelGroupComponent } from "./budget-panel-group.component";

export type BudgetCategorySummary = {
    category: Category;
    limit: number;
    current: number;
    remaining: number;
    percent_spent: number;
}

@Component({
    selector: 'budget-panel',
    template: `
    <div>
        <div class="title-card">
            <span style="padding-left: 8px; color: var(--text-color)">Income</span>
        </div>
        <budget-panel-group [summaries]="incomeCategorySummaries" />
    </div>
    <div style="margin-top: 8px;">
        <div class="title-card">
            <span style="padding-left: 8px;color: var(--text-color)">Expenses</span>
        </div>
        <budget-panel-group [summaries]="expenseCategorySummaries" />
    </div>
    `,
    styles: `
    .title-card {
        background-color: var(--primary-color);
        border-radius: 8px;
    }
    `,
    imports: [BudgetPanelGroupComponent],
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

        const budget: Budget | undefined = this.account.budgetsByMonth.get(this.month);
        if (!budget) {
            console.error(`No budget found for ${this.account.user} account`);
            return;
        }

        for (const [categoryId, limit] of budget.limitsByCategoryId.entries()) {
            const category: Category | undefined = this.categoryMap.get(categoryId);
            if (!category) {
                console.error(`Category with ID ${categoryId} not found.`);
                continue;
            }

            const transactions: Transaction[] = this.account.transactionsByMonth.get(this.month) ?? [];
            const categoryTransactions: Transaction[] =
                transactions.filter(tx => tx.categoryId === categoryId);

            const amount: number = categoryTransactions.reduce((sum, tx) => sum + tx.amount, 0);

            if (category.type === 'expense') {
                this.expenseCategorySummaries.push({
                    category: category,
                    limit,
                    current: amount,
                    remaining: limit - amount,
                    percent_spent: Math.min(100, (amount / limit) * 100)
                });
            } else if (category.type === 'income') {
                this.incomeCategorySummaries.push({
                    category: category,
                    limit,
                    current: amount,
                    remaining: amount - limit,
                    percent_spent: Math.min(100, (amount / limit) * 100)
                });
            }
        }
    }
}