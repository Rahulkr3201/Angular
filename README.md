

RxJS in one glance:-RxJS lets you handle async data as a stream and process it using a pipeline.

Observable → represents a stream of data over time

pipe() → where logic resides and used to transform data.

Operators (map, filter, switchMap, etc.) → apply logic to the data

subscribe() / async pipe → consume the final result

-------------------------->

of() emits what you give it.
from() breaks it into pieces and emits them.
take() limit emmision
takeUnntil() control lifecycle
interval() time based stream gives unstopable continuous vale
timer()it generates single value after sometime

-------------------------->

destroy$ → stop signal

takeUntil() → listens for stop signal

next() → tells streams to stop

complete() → frees memory

If you manually subscribe → you must clean up with destroy$.
----------------------------------->

RxJS in one short idea

Instead of waiting for all data to arrive and then processing it (arrays), RxJS processes data as it arrives (streams).

You build a pipeline (pipe + operators) once, and every new piece of data flowing through the Observable is transformed immediately.
--------------------------------------->
witchMap → Cancel old, keep latest

mergeMap → Run all in parallel

concatMap → Run one by one, in order
---------------------------------------->
✅ concatMap
The first outer value waits until its entire inner observable completes,
then and only then the next outer value is processed.
Inner observables run one after another
Order is guaranteed
Nothing runs in parallel
✔ Sequential
✔ Safe for dependent tasks
✅ mergeMap
All outer values are accepted immediately, and
all inner observables run in parallel.
No waiting
No cancellation
Order not guaranteed
✔ Fast
✔ Best for independent tasks
✅ switchMap
Only the most recent outer value is kept.
When a new value comes in, the previous inner observable is terminated.
Old work is cancelled
Only latest result is emitted
✔ Best for search, routing, live filters

--------------------------------------->
subject : it is observable + observer.
A Subject was introduced because a normal Observable could not be pushed to from the outside and could not share one data source with multiple listeners.
Feature	                Observable (earlier)	    Subject (now)
Push data using .next() from outside	❌ Not possible	✅ Possible  
Shared data source	❌ No (each subscriber has its own execution)	✅ Yes (single shared source)
Multiple listeners receive the same value	❌ No	✅ Yes
Producer executes once for all subscribers	❌ No (runs per subscriber)	✅ Yes (runs once)
------------------------------>
const subject$ = new Subject<number>();
console.log('A');
subject$.subscribe(v => console.log('B', v));
console.log('C');
subject$.next(1);
console.log('D');

subscribe() only sets up the listener
.next(1) executes the listener immediately
Subjects emit synchronously by default
imp:- subscribe dont execute it just set up the listner, next executes the listner