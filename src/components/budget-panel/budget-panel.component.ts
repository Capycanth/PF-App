import { Component, OnInit, OnChanges, Input, SimpleChanges } from "@angular/core";
import { Budget, Category, Transaction } from "../../../srcDB/model/dataModels";
import { Subject } from "rxjs";

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
export class BudgetPanelComponent implements OnInit, OnChanges {
    @Input() budget!: Budget;
    @Input() transactions: Transaction[] = [];
    @Input() categoryMap: Map<string, Category> = new Map<string, Category>();

    protected expenseCategorySummaries: BudgetCategorySummary[] = [];
    protected incomeCategorySummaries: BudgetCategorySummary[] = [];

    protected onChanges = new Subject<SimpleChanges>();

    ngOnInit(): void {
        this.onChanges.subscribe(() => {
            this.updateCategorySummaries();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.onChanges.next(changes);
    }

    private updateCategorySummaries(): void {
        this.expenseCategorySummaries = [];
        this.incomeCategorySummaries = [];

        for (const [categoryId, limit] of  this.budget.limitsByCategoryId.entries()) {
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
        }
    }
}