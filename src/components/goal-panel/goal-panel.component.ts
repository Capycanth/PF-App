import { Component, Input } from '@angular/core';
import { Account, Category, Goal } from '../../../srcDB/model/dataModels';
import { GoalService } from '../../services/goal.service';
import { TestDataUtil } from '../../test/testDataUtil';
import { ChangesSubscribe } from '../shared/changes-subscribe.component';
import { InlineProgressBarComponent } from "../shared/inline-progress-bar.component";

@Component({
  selector: 'goal-panel',
  template: `
    @for (goal of goals; track goal.id) {
      <div class="goal-item-card">
        <inline-progress-bar [name]="goal.name" [value]="goal.saved" [max]="goal.total_cost" />
      </div>
    }
  `,
  styles: `
    .goal-item-card {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  `,
  imports: [InlineProgressBarComponent],
})
export class GoalPanelComponent extends ChangesSubscribe {
  @Input() account!: Account;
  @Input() categoryMap: Map<string, Category> = new Map<string, Category>();
  @Input() test: boolean = false;

  protected goals: Goal[] = [];

  constructor(private readonly goalsService: GoalService) { super(); }

  protected override update(): void {
    if (this.test) {
      this.goals = TestDataUtil.getGoals().filter(goal => goal.accountId === this.account.id);
      this.goals.sort((a, b) => {
        const aProgress = a.saved / a.total_cost;
        const bProgress = b.saved / b.total_cost;
        return bProgress - aProgress;
      });
    } else {
      this.goalsService.getAll().subscribe((goals) => {
        this.goals = goals.filter(goal => goal.accountId === this.account.id);

        this.goals.sort((a, b) => {
          const aProgress = a.saved / a.total_cost;
          const bProgress = b.saved / b.total_cost;
          return bProgress - aProgress;
        });
      });
    }

  }
}
