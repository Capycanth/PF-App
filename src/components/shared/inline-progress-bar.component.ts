import { CurrencyPipe, TitleCasePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatProgressBar } from "@angular/material/progress-bar";
import { ChangesSubscribe } from "./changes-subscribe.component";

@Component({
    selector: 'inline-progress-bar',
    template: `
        <div class="inline-progress-bar-container">
            <mat-progress-bar class="inline-progress-bar" [value]="clippedValue" />
            <div class="item-container">
                <span>{{ name | titlecase }}</span>
                <span>{{ value | currency }} / {{ max | currency }}</span>
            </div>
        </div>`,
    styles: `
        .inline-progress-bar-container {
            position: relative;
            margin-top: 8px;
            margin-bottom: 8px;
        }
        .inline-progress-bar {
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
        }`,
    imports: [CurrencyPipe, MatProgressBar, TitleCasePipe],
})
export class InlineProgressBarComponent extends ChangesSubscribe {
    @Input() min: number = 0;
    @Input() max: number = 100;
    @Input() value!: number;
    @Input() name!: string;

    protected clippedValue: number = 0;

    protected override update(): void {
        this.clippedValue = Math.min((this.value - this.min) / (this.max - this.min) * 100, 100);
    }
}
