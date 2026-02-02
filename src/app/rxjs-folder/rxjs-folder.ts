import { Component, OnDestroy } from '@angular/core';
import { Observable, of, from, interval, map, takeUntil, Subject,timer } from 'rxjs';

@Component({
  selector: 'app-rxjs-folder',
  standalone: true,
  templateUrl: './rxjs-folder.html',
  styleUrl: './rxjs-folder.css',
})
export class RxjsFolder implements OnDestroy {

  // 🔹 REQUIRED for takeUntil
  private destroy$ = new Subject<void>();

  cityList: string[] = ['pune', 'mumbai', 'nagpur'];
  cityList$ = of(this.cityList);

  stateList$ = from(['pune', 'mumbai', 'nagpur']);

  myInterval$ = interval(2000);
  timer$=timer(5000);

  constructor() {

    // interval observable
    // this.myInterval$
    //   .pipe(
    //     map(v => v + 1),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe(v => {
    //     console.log('timer value', v);
    //   });

    this.timer$.subscribe(v=>{
      console.log("timer executeda after 5 sec");//timer executes only once but the interval keeps executing every 2 seconds.
    })

    // city list observable
    this.cityList$
      .pipe(takeUntil(this.destroy$))
      .subscribe(cities => {
        console.log(cities);
      });

    // state list observable
    this.stateList$
      .pipe(takeUntil(this.destroy$))
      .subscribe(states => {
        console.log(states);
      });

    // custom observable
    const myObs$ = new Observable<string>(observer => {
      observer.next('hello rxjs observable');
      observer.complete();
    });

    myObs$
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => {
        console.log(message);
      });
  }

  // 🔹 REQUIRED to stop interval & clean subscriptions
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
