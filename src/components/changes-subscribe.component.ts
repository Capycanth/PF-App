import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { startWith, Subject } from "rxjs";

@Component({
    template: ``,
})
export abstract class ChangesSubscribe implements OnInit, OnChanges {
    protected onChanges = new Subject<SimpleChanges>();

    protected abstract update(): void;

    ngOnInit(): void {
        this.onChanges.pipe(startWith(null)).subscribe(() => {
            this.update();
        });
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.onChanges.next(changes);
    }

}