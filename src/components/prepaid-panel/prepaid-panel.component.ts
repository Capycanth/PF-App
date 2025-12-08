import { Component, Input } from '@angular/core';
import { Account } from '../../../shared/model/account.model';
import { Category } from '../../../shared/model/category.model';
import { Prepaid } from '../../../shared/model/prepaid.model';
import { PrepaidService } from '../../services/prepaid.service';
import { ChangesSubscribe } from '../shared/changes-subscribe.component';
import { InlineProgressBarComponent } from "../shared/inline-progress-bar.component";

@Component({
  selector: 'prepaid-panel',
  template: `
    @for (prepaid of prepaids; track prepaid.id) {
      <div class="prepaid-item-card">
        <inline-progress-bar [name]="prepaid.name" [value]="prepaid.saved" [max]="prepaid.totalCost" />
      </div>
    }
  `,
  styles: `
    .prepaid-item-card {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  `,
  imports: [InlineProgressBarComponent],
})
export class PrepaidPanelComponent extends ChangesSubscribe {
  @Input() account!: Account;
  @Input() categoryMap: Map<string, Category> = new Map<string, Category>();

  protected prepaids: Prepaid[] = [];

  constructor(private readonly prepaidService: PrepaidService) { super(); }

  protected override update(): void {
    this.prepaidService.getAll().subscribe((prepaids) => {
      this.prepaids = prepaids.filter(prepaid => prepaid.accountId === this.account.id);

      this.prepaids.sort((a, b) => {
        const aProgress = a.saved / a.totalCost;
        const bProgress = b.saved / b.totalCost;
        return bProgress - aProgress;
      });
    });
  }
}
