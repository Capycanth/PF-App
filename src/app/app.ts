import { Component, OnInit, signal } from '@angular/core';
import { DateSelectEvent, DateSelectorComponent } from '../components/date-selector/date-selector.component';
import { TransactionGridComponent } from "../components/transaction-grid/transaction-grid.component";
import { AccountService } from '../services/account.service';
import { Account, Budget, Category, SubCategory, Transaction, User } from '../../srcDB/model/dataModels';
import { CategoryService } from '../services/category.service';
import { NavigationEnd, Router } from '@angular/router';
import { TestDataUtil } from '../test/testDataUtil';
import { filter, first } from 'rxjs';
import { BudgetPanelComponent } from "../components/budget-panel/budget-panel.component";

@Component({
  selector: 'app-root',
  imports: [BudgetPanelComponent, DateSelectorComponent, TransactionGridComponent,],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected initialized: boolean = false;

  protected selectedUser: User = User.JOINT;
  protected accounts: Account[] = [];
  protected transactions: Transaction[] = [];
  protected budgets: Budget[] = [];
  protected categoryMap: Map<string, Category> = new Map<string, Category>();
  protected subCategoryMap: Map<string, SubCategory> = new Map<string, SubCategory>();


  private testMode: boolean = false;

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
        this.testMode = params['testMode'] === 'true';
        this.initialized = true;
      });
  }

  protected onDateSelected(event: DateSelectEvent): void {
    if (this.testMode) {
      this.transactions = TestDataUtil.getSampleTransactions();
      this.categoryMap = TestDataUtil.getCategoryMap();
      this.subCategoryMap = TestDataUtil.getSubCategoryMap();
    } else {
      this.loadAll(event);
    }

  }

  private loadAll(event: DateSelectEvent): void {
    this.loadAccounts(event).then(() => {
      this.loadCategories();
    });

  }

  private loadAccounts(event: DateSelectEvent): Promise<void> {
    return new Promise<void>(resolve => {
      this.accountService.getAll().subscribe(accounts => {
        this.accounts = accounts.filter(acc => acc.year === event.year);
        this.transactions = this.accounts.find(acc => acc.user === this.selectedUser)?.transactionsByMonth.get(event.month) || [];
        resolve();
      });
    });

  }

  private loadCategories(): void {
    this.categoryService.getAll().subscribe(categories => {
      this.categoryMap = new Map(categories.map(cat => [cat.id, cat]));
    });
  }
}
