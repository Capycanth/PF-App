import { CurrencyPipe, TitleCasePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChangesSubscribe } from "../changes-subscribe.component";
import { BudgetCategorySummary } from "./budget-panel.component";

@Component({
    selector: 'budget-panel-group',
    template: `
    <span>{{ type | titlecase }}</span>
    @for (summary of summaries; track summary.category.id) {
        <div class="budget-group-item">
            <mat-progress-bar class="budget-group-item-progress-bar" [value]="summary.percentSpent" />
            <div class="item-container">
                <span class="left-item">{{ summary.category.name | titlecase }}</span>
                <span class="right-item">{{ summary.amount | currency }} / {{ summary.limit | currency }}</span>
            </div>
        </div>
    }
    `,
    styles: `
    .budget-group-item {
        position: relative;
        margin-top: 8px;
        margin-bottom: 8px;
    }
    .budget-group-item-progress-bar {
        border-radius: 10px;
        height: 30px;
        width: 98%;
        left: 1%;
    }
    .item-container {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 95%;
        display: flex;
        justify-content: space-between;
    }
    `,
    imports: [CurrencyPipe, MatProgressBarModule, TitleCasePipe],
    standalone: true,
})
export class BudgetPanelGroupComponent extends ChangesSubscribe {
    @Input() type!: 'expense' | 'income';
    @Input() summaries!: BudgetCategorySummary[];

    protected override update(): void {
        this.summaries.sort((a, b) => b.limit - a.limit);
    }
}