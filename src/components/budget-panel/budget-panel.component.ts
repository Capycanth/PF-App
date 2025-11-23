import { Component, Input } from "@angular/core";
import { Account, Budget, Category, Month, ObjectId, Transaction } from "../../../srcDB/model/dataModels";
import { BudgetService } from "../../services/budget.service";
import { TestDataUtil } from "../../test/testDataUtil";
import { ChangesSubscribe } from "../shared/changes-subscribe.component";
import { InlineProgressBarComponent } from "../shared/inline-progress-bar.component";

export type BudgetCategorySummary = {
    category: Category;
    limit: number;
    amount: number;
    remaining: number;
    percentSpent: number;
    subCategorySummaries: Map<string, SubCategorySummary>;
}

export type SubCategorySummary = {
    subCategory: string;
    limit: number;
    amount: number;
    remaining: number;
    percentSpent: number;
}

@Component({
    selector: 'budget-panel',
    template: `
    <div style="overflow-y: auto; max-height: 40vh;">
        <div>
            <div class="title-card">
                <span>Income</span>
            </div>
            @for (summary of incomeCategorySummaries; track summary.category.id) {
                <inline-progress-bar
                    [name]="summary.category.name"
                    [value]="summary.amount"
                    [max]="summary.limit" />
            }
        </div>
        <div style="padding-top: 8px;">
            <div class="title-card">
                <span>Expenses</span>
            </div>
            @for (summary of expenseCategorySummaries; track summary.category.id) {
                <inline-progress-bar
                    [name]="summary.category.name"
                    [value]="summary.amount"
                    [max]="summary.limit" />
            }
        </div>
    </div>
    `,
    styles: `
    .title-card {
        background-color: var(--primary-color);
        border-radius: 8px;
        padding-left: 8px;
        color: var(--text-color);
        padding-top: 4px;
        padding-bottom: 4px;
    }
    `,
    imports: [InlineProgressBarComponent],
    standalone: true,
})
export class BudgetPanelComponent extends ChangesSubscribe {
    @Input() account!: Account;
    @Input() month!: Month;
    @Input() categoryMap: Map<string, Category> = new Map<string, Category>();
    @Input() test: boolean = false;

    protected expenseCategorySummaries: BudgetCategorySummary[] = [];
    protected incomeCategorySummaries: BudgetCategorySummary[] = [];

    constructor(private readonly budgetService: BudgetService) { super(); }

    protected override update(): void {
        console.log("updating budget")
        this.expenseCategorySummaries = [];
        this.incomeCategorySummaries = [];

        if (this.test) {
            this.processBudget(TestDataUtil.getBudget());
        } else {
            const budgetId: ObjectId | undefined = this.account.budgetIdsByMonth.get(this.month);
            if (!budgetId) {
                console.error(`No budget Id for ${this.account.user} for the month of ${this.month}`);
                return;
            }
            this.budgetService.getById(budgetId).subscribe({
                next: (budget) => {
                    this.processBudget(budget);
                },
                error: () => {
                    console.error(`Failed to retrieve budget with id ${budgetId} for ${this.account.user} for the month of ${this.month}`);
                }
            });
        }
    }

    private processBudget(budget: Budget): void {
        if (!budget) {
            console.error(`No budget found for ${this.account.user} account`);
            return;
        }

        for (const [categoryId, subCategoryToLimit] of budget.limitsByCategoryId.entries()) {
            const category: Category | undefined = this.categoryMap.get(categoryId);
            if (!category) {
                console.error(`Category with ID ${categoryId} not found.`);
                continue;
            }

            let subCategorySummaries: Map<string, SubCategorySummary> = new Map();
            let categoryAmount: number = 0;
            let categoryLimit: number = 0;

            for (const [subCategory, limit] of subCategoryToLimit.entries()) {
                const transactions: Transaction[] = this.account.transactionsByMonth.get(this.month) ?? [];
                const subCategoryTransactions: Transaction[] =
                    transactions.filter(tx => tx.categoryId === categoryId && tx.subCategory === subCategory);

                const amount: number = subCategoryTransactions.reduce((sum, tx) => sum + tx.amount, 0);
                categoryAmount += amount;
                categoryLimit += limit;

                subCategorySummaries.set(subCategory, {
                    subCategory: subCategory,
                    limit,
                    amount,
                    remaining: this.getRemaining(category.type, limit, amount),
                    percentSpent: Math.min(100, (amount / limit) * 100),
                });
            }

            if (category.type === 'expense') {
                this.expenseCategorySummaries.push({
                    category: category,
                    limit: categoryLimit,
                    amount: categoryAmount,
                    remaining: this.getRemaining(category.type, categoryLimit, categoryAmount),
                    percentSpent: Math.min(100, (categoryAmount / categoryLimit) * 100),
                    subCategorySummaries
                });
            } else if (category.type === 'income') {
                this.incomeCategorySummaries.push({
                    category: category,
                    limit: categoryLimit,
                    amount: categoryAmount,
                    remaining: this.getRemaining(category.type, categoryLimit, categoryAmount),
                    percentSpent: Math.min(100, (categoryAmount / categoryLimit) * 100),
                    subCategorySummaries
                });
            }
        }

        this.expenseCategorySummaries.sort((a, b) => b.limit - a.limit);
        this.incomeCategorySummaries.sort((a, b) => b.limit - a.limit);
    }

    private getRemaining(type: 'expense' | 'income', limit: number, amount: number): number {
        switch (type) {
            case "expense":
                return limit - amount;
            case "income":
                return amount - limit;
            default:
                {
                    console.error("Unknown transaction type.")
                    const _exaustiveCheck: never = type;
                    return 0;
                }
        }
    }
}