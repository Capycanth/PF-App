import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Account } from "../../../srcDB/model/dataModels";
import { ChangesSubscribe } from "../shared/changes-subscribe.component";

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
        justify-content: flex-end;
    }
    .account-icon {
        width: 32px;
        height: 32px;
        border-radius: 16px;
        margin-right: 8px;
        background-color: var(--highlight-color);
        button {
            width: 100%;
            height: 100%;
        }
    }
    .selected-account {
        border: 1px solid var(--accent-color);
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