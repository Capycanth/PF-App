import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { debounceTime, startWith, Subject, Subscription } from "rxjs";

@Component({
    template: ``,
})
export abstract class ChangesSubscribe implements OnInit, OnChanges, OnDestroy {
    protected onChanges = new Subject<SimpleChanges>();
    private sub?: Subscription;

    /**
     * How long to debounce calls to update() (ms)
     */
    protected debounceTimeMs = 250;

    protected abstract update(): void;

    ngOnInit(): void {
        this.sub = this.onChanges
            .pipe(
                startWith(null),
                debounceTime(this.debounceTimeMs)   // <-- prevents multiple calls
            )
            .subscribe(() => this.update());
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.onChanges.next(changes);
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}
