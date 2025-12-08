import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Month } from "../../../shared/enumeration/month.enum";

export type DateSelectEvent = {
    month: Month;
    year: number;
}

@Component({
    selector: 'date-selector',
    templateUrl: './date-selector.component.html',
    styleUrl: './date-selector.component.scss',
    imports: [FormsModule],
    standalone: true,
})
export class DateSelectorComponent {
    @Output() dateSelected = new EventEmitter<DateSelectEvent>();
    @Input() month!: Month;
    @Input() year!: number;

    protected months: Month[] = Object.values(Month) as Month[];

    protected onMonthSelected(newMonth: Month): void {
        this.month = newMonth;
        this.dateSelected.emit({ month: this.month, year: this.year });
    }

    protected onNextYear(): void {
        this.year++;
        this.dateSelected.emit({ month: this.month, year: this.year });
    }

    protected onPreviousYear(): void {
        this.year--;
        this.dateSelected.emit({ month: this.month, year: this.year });
    }
}