import { Component, OnDestroy, inject } from '@angular/core';
import { UserService} from '../services/user.services';
import {
  Observable,
  of,
  from,
  interval,
  Subject,
  timer
} from 'rxjs';

import {
  map,
  takeUntil,
  switchMap,
  mergeMap,
  concatMap,
  delay
} from 'rxjs/operators';



@Component({
  selector: 'app-rxjs-folder',
  standalone: true,
  templateUrl: './rxjs-folder.html',
  styleUrl: './rxjs-folder.css',
})
export class RxjsFolder implements OnDestroy {

  // 🔹 REQUIRED for takeUntil
  private destroy$ = new Subject<void>();

  // 🔹 API service (ADDED)
  private userService = inject(UserService);

  // ---------- BASIC DATA ----------
  cityList: string[] = ['pune', 'mumbai', 'nagpur'];
  cityList$ = of(this.cityList);
  stateList$ = from(['pune', 'mumbai', 'nagpur']);

  // ---------- TIME SOURCES ----------
  myInterval$ = interval(2000);
  timer$ = timer(5000);

  // ---------- SOURCES FOR MAP OPERATORS ----------
  ids$ = from([1, 2, 3]);
  steps$ = from(['step1', 'step2', 'step3']);
  search$ = interval(5000);

  // ---------- API IDS (ADDED) ----------
  userIds$ = from([1, 2, 3]);

  constructor() {

    // ================= INTERVAL =================
    this.myInterval$
      .pipe(
        map(v => v + 1),
        takeUntil(this.destroy$)
      )
      .subscribe(v => {
        console.log('timer value', v);
      });

    // ================= TIMER =================
    // this.timer$.subscribe(v => {
    //   console.log('timer executed after 5 sec');
    // });

    // ================= CITY LIST =================
    // this.cityList$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(cities => {
    //     console.log(cities);
    //   });

    // ================= STATE LIST =================
    // this.stateList$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(states => {
    //     console.log(states);
    //   });

    // ================= CUSTOM OBSERVABLE =================
    // const myObs$ = new Observable<string>(observer => {
    //   observer.next('hello rxjs observable');
    //   observer.complete();
    // });

    // myObs$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(message => {
    //     console.log(message);
    //   });

    // =====================================================
    // 🔥 switchMap — CANCEL previous, keep latest
    // Use case: search, route change
    // =====================================================

    this.search$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(value => {
          console.log('switchMap source:', value);
          return of(`API result for ${value}`).pipe(delay(3000));
        })
      )
      .subscribe(result => {
        console.log('switchMap output:', result);
      });

    // =====================================================
    // 🔥 mergeMap — PARALLEL execution
    // Use case: multiple independent API calls
    // =====================================================

    // this.ids$
    //   .pipe(
    //     takeUntil(this.destroy$),
    //     mergeMap(id => {
    //       console.log('mergeMap source:', id);
    //       return of(`API result for ${id}`).pipe(delay(2000));
    //     })
    //   )
    //   .subscribe(result => {
    //     console.log('mergeMap output:', result);
    //   });

    // =====================================================
    // 🔥 concatMap — SEQUENTIAL execution
    // first one from outer comes and the inner will execute for that,
    // then second comes from the outer.
    // Use case: ordered / dependent operations
    // =====================================================

    // this.steps$
    //   .pipe(
    //     takeUntil(this.destroy$),
    //     concatMap(step => {
    //       console.log('concatMap source:', step);
    //       return of(`Processed ${step}`).pipe(delay(4000));
    //     })
    //   )
    //   .subscribe(result => {
    //     console.log('concatMap output:', result);
    //   });

    // =====================================================
    // 🔥 REAL API CALL USING RXJS (ADDED)
    // Sequential API execution using concatMap
    // =====================================================

    this.userIds$
      .pipe(
        takeUntil(this.destroy$),
        concatMap(id => {
          console.log('API call for user id:', id);
          return this.userService.getUserById(id);
        })
      )
      .subscribe(user => {
        console.log('API response:', user);
      });

  }

  // 🔹 REQUIRED to stop interval & clean subscriptions
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
