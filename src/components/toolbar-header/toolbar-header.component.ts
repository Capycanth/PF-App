import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Account } from "../../../srcDB/model/dataModels";
import { ChangesSubscribe } from "../changes-subscribe.component";

@Component({
    selector: 'toolbar-header',
    template: `
    <div class="toolbar-wrapper">
        @for (account of accounts; track account.id) {
            @if (account.id === selectedAccount.id) {
                <div class="account-icon selected-account" title="{{account.user}}">
                    <button (click)="accountSelected.emit(account)"><i [class]="account.icon"></i></button>
                </div>
            } @else {
                <div class="account-icon" title="{{account.user}}">
                    <button (click)="accountSelected.emit(account)"><i [class]="account.icon"></i></button>
                </div>
            }
        }
    </div>
    `,
    styles: `
    .toolbar-wrapper {
        display: flex;
        flex-direction: row;
        align-items: right;
    }
    .account-icon {
        width: 32px;
        height: 32px;
        border-radius: 16px;
        margin-right: 8px;
    }
    .selected-account {
        border: 2px solid var(--primary-color);
    }
    `,
    imports: [],
    standalone: true,
})
export class ToolbarHeaderComponent extends ChangesSubscribe {
    @Input() accounts!: Account[];
    @Input() selectedAccount!: Account;
    @Output() accountSelected = new EventEmitter<Account>();

    protected override update(): void {
        // No-op
    }
}