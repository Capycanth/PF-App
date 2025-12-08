import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, first } from 'rxjs';
import { Month } from '../../shared/enumeration/month.enum';
import { Account } from '../../shared/model/account.model';
import { Category } from '../../shared/model/category.model';
import { BudgetPanelComponent } from "../components/budget-panel/budget-panel.component";
import { DateSelectEvent, DateSelectorComponent } from '../components/date-selector/date-selector.component';
import { PrepaidPanelComponent } from "../components/prepaid-panel/prepaid-panel.component";
import { ToolbarHeaderComponent } from "../components/toolbar-header/toolbar-header.component";
import { TransactionGridComponent } from "../components/transaction-grid/transaction-grid.component";
import { AccountService } from '../services/account.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-root',
  imports: [BudgetPanelComponent, DateSelectorComponent, TransactionGridComponent, ToolbarHeaderComponent, PrepaidPanelComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  // Selected Account Info
  protected selectedMonth: Month = (Object.values(Month) as Month[])[new Date().getMonth()];
  protected selectedYear: number = new Date().getFullYear();

  // Accounts Info
  protected accounts: Account[] = [];
  protected selectedAccount!: Account;

  // Category Info
  protected categoryByIdMap: Map<string, Category> = new Map();

  // Helper Fields
  protected initialized: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly accountService: AccountService,
    private readonly categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.initialized = false;
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        first()
      )
      .subscribe(() => {
        this.reload().then(() => this.initialized = true);
      });
  }

  protected onDateSelected(event: DateSelectEvent): void {
    this.selectedMonth = event.month;
    this.selectedYear = event.year;

    this.reload();
  }

  protected onAccountSelected(account: Account): void {
    this.selectedAccount = account;

    this.reload();
  }

  private reload(): Promise<void> {
    console.log(`Reloading data for ${this.selectedAccount.owner} : ${this.selectedYear}`);

    return new Promise<void>(resolve => {
      this.accountService.getAll().subscribe(accounts => {
        this.accounts = accounts;

        const selAct: Account | undefined = accounts.find(acc => acc.owner === this.selectedAccount.owner && acc.year === this.selectedYear);
        if (!selAct) {
          console.warn(`Account for ${this.selectedAccount.owner} : ${this.selectedYear} not found.`);
          // TODO: Toast
          return resolve();
        }
        this.selectedAccount = selAct;

        this.categoryService.getAll().subscribe(categories => {
          this.categoryByIdMap = new Map(categories.map(cat => [cat.id, cat]));
          return resolve();
        });
      });
    })
  }
}
