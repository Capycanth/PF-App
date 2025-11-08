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
            <div class="item-container">
                <span class="left-item">{{ summary.category.name | titlecase }}</span>
                <span class="right-item">{{ summary.current | currency }} / {{ summary.limit | currency }}</span>
            </div>
            
            <mat-progress-bar class="budget-group-item-progress-bar" [value]="summary.percent_spent" />
        </div>
    }
    `,
    styles: `
    .budget-group-item {
        padding-top: 8px;
        padding-bottom: 8px;
        margin-top: 4px;
        margin-bottom: 4px;
        background-color: var(--highlight-color);
        border-radius: 8px;
    }
    .budget-group-item-progress-bar {
        border-radius: 2.5px;
        height: 5px;
        width: 98%;
        left: 1%;
    }
    .item-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    .left-item,
    .right-item {
        padding-left: 4px;
        padding-right: 4px;
    }
    `,
    imports: [CurrencyPipe, MatProgressBarModule, TitleCasePipe],
    standalone: true,
})
export class BudgetPanelGroupComponent extends ChangesSubscribe {
    @Input() type!: 'expense' | 'income';
    @Input() summaries!: BudgetCategorySummary[];

    protected override update(): void {
        this.summaries.sort((a, b) => a.limit - b.limit);
    }
}