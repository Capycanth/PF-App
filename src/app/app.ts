import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, first } from 'rxjs';
import { Account, Category, Month, ObjectId, User } from '../../srcDB/model/dataModels';
import { BudgetPanelComponent } from "../components/budget-panel/budget-panel.component";
import { DateSelectEvent, DateSelectorComponent } from '../components/date-selector/date-selector.component';
import { TransactionGridComponent } from "../components/transaction-grid/transaction-grid.component";
import { AccountService } from '../services/account.service';
import { CategoryService } from '../services/category.service';
import { TestDataUtil } from '../test/testDataUtil';

@Component({
  selector: 'app-root',
  imports: [BudgetPanelComponent, DateSelectorComponent, TransactionGridComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  // Selected Account Info
  protected selectedUser: User = User.JOINT;
  protected selectedMonth: Month = (Object.values(Month) as Month[])[new Date().getMonth()];
  protected selectedYear: number = new Date().getFullYear();

  // Accounts Info
  protected accounts: Account[] = [];
  protected selectedAccount!: Account;

  // Category Info
  protected categoryByIdMap: Map<ObjectId, Category> = new Map();

  // Helper Fields
  protected initialized: boolean = false;
  protected test: boolean = false;

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
        const params = this.router.routerState.snapshot.root.queryParams;
        console.log(params);
        this.test = params['test'] === 'true';
        this.reload().then(() => this.initialized = true);
      });
  }

  protected onDateSelected(event: DateSelectEvent): void {
    this.selectedMonth = event.month;
    this.selectedYear = event.year;

    this.reload();
  }

  private reload(): Promise<void> {
    if (this.test) {
      return new Promise<void>(resolve => {
        this.accounts = TestDataUtil.getAccounts();
        const selAct: Account | undefined = this.accounts.find(acc => acc.user === this.selectedUser && acc.year === this.selectedYear);
        if (!selAct) {
          console.error(`Account for ${this.selectedUser} : ${this.selectedYear} not found.`);
          // TODO: Toast
          return resolve();
        }
        this.selectedAccount = selAct;

        this.categoryByIdMap = TestDataUtil.getCategoryMap();
        resolve();
      });
    } else {
      return new Promise<void>(resolve => {
        this.accountService.getAll().subscribe(accounts => {
          this.accounts = accounts;

          const selAct: Account | undefined = accounts.find(acc => acc.user === this.selectedUser && acc.year === this.selectedYear);
          if (!selAct) {
            console.warn(`Account for ${this.selectedUser} : ${this.selectedYear} not found.`);
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
}
