import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Account, Category, getMonth, Month, ObjectId, Transaction } from "../../../srcDB/model/dataModels";
import { AccountService } from "../../services/account.service";

@Component({
    selector: 'transition-dialog',
    template: `
        <mat-dialog-content [formGroup]="formGroup">

            <!-- Date -->
            <mat-form-field appearance="outline">
                <mat-label>Date</mat-label>
                  <input
                    matInput
                    formControlName="date"
                    placeholder="MM/DD/YYYY"
                >
            </mat-form-field>

            <!-- Type -->
            <mat-form-field appearance="outline">
                <mat-label>Type</mat-label>
                <mat-select formControlName="type">
                    <mat-option value="income">Income</mat-option>
                    <mat-option value="expense">Expense</mat-option>
                </mat-select>
            </mat-form-field>

            <!-- Category -->
            <mat-form-field appearance="outline">
                <mat-label>Category</mat-label>
                <mat-select formControlName="categoryId">
                    @for (category of categories; track category.id) {
                        <mat-option [value]="category.id">{{ category.name }}</mat-option>
                    }
                </mat-select>
            </mat-form-field>

            <!-- Sub-Category -->
            <mat-form-field appearance="outline">
                <mat-label>Sub Category</mat-label>
                <mat-select formControlName="subCategory" [disabled]="subCategories.length === 0">
                    @for (sub of subCategories; track sub) {
                        <mat-option [value]="sub">{{ sub }}</mat-option>
                    }
                </mat-select>
            </mat-form-field>

            <!-- Amount -->
            <mat-form-field appearance="outline">
                <mat-label>Amount</mat-label>
                <input matInput type="number" formControlName="amount">
            </mat-form-field>

            <!-- Note -->
            <mat-form-field appearance="outline">
                <mat-label>Note</mat-label>
                <textarea matInput formControlName="note"></textarea>
            </mat-form-field>

        </mat-dialog-content>

        <mat-dialog-actions align="end">
            <button mat-raised-button color="primary" (click)="confirm()">Confirm</button>
            <button mat-button (click)="close()">Close</button>
        </mat-dialog-actions>
    `,
    imports: [MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule],
})
export class TransitionDialogComponent implements OnInit {
    private readonly account!: Account;
    private readonly categoryByIdMap!: Map<ObjectId, Category>;

    protected categories: Category[] = [];
    protected subCategories: string[] = [];

    protected formGroup: FormGroup = new FormGroup({
        date: new FormControl('', [
            Validators.required,
            Validators.pattern(String.raw`^(0[1-9]|1[0-2])/(0[1-9]|[12]\d|3[01])/\d{4}$`)
        ]),
        type: new FormControl('', Validators.required),
        categoryId: new FormControl('', Validators.required),
        subCategory: new FormControl(''),
        amount: new FormControl(0, [Validators.required, Validators.min(0.01)]),
        note: new FormControl('')
    });

    constructor(
        private readonly accountService: AccountService,
        public dialogRef: MatDialogRef<TransitionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.account = data.account;
        this.categoryByIdMap = data.categoryByIdMap;
    }

    ngOnInit(): void {
        this.categories = [...this.categoryByIdMap.values()];

        const test = this.formGroup.get('categoryId');

        // Update subCategories when Category changes
        this.formGroup.get('categoryId')?.valueChanges.subscribe((categoryId) => {
            const category: Category | undefined = this.categoryByIdMap.get(categoryId);

            this.subCategories = category?.subCategories ?? [];

            // Reset subCategory when category changes
            this.formGroup.get('subCategory')?.reset('');
        });
    }

    close() {
        this.dialogRef.close(false);
    }

    confirm() {
        if (!this.formGroup.valid) return;

        const formData = this.formGroup.value;
        const date: string[] = (formData.date as string).split('/');

        if (date.length !== 3) return;

        const month: Month = getMonth(Number(date[0]));
        const monthTransactions: Transaction[] = this.account.transactionsByMonth.get(month) ?? [];

        monthTransactions.push({
            date: formData.date,
            type: formData.type,
            categoryId: formData.categoryId,
            subCategory: formData.subCategory,
            amount: formData.amount,
            note: formData.note
        });

        this.account.transactionsByMonth.set(month, monthTransactions);

        this.accountService.post({
            ...this.account
        }).subscribe({
            next: _response => {
                this.dialogRef.close(true);
            },
            error: _error => {
                this.dialogRef.close(true);
            }
        });
    }
}