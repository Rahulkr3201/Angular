

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
-How a Subject behaves in real life
Imagine this:
A person shouts announcements in a room.
If you are inside the room at that moment, you hear it.
If you enter later, you missed it forever.
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

--------------------------------->
Subject:-
You must subscribe first
Only values emitted after you subscribe are received
If you join late, you miss earlier data
Does not remember anything
BehaviorSubject:-
You still must subscribe
But on subscription, you immediately receive the latest value
Even if it was emitted before you joined
BehaviorSubject remembers the latest value, whereas Subject does not.

---------------------------------->
Service  → owns reusable data & logic
inject() → gives you access to that service
inject() doesn’t inject data — it injects the service that owns the data.
-ngOnInit is equal to useffect for exectution once after creation.
-ngOnchanges- equal to useeffect but upon prop change.
ngOnInit()        // start
ngOnChanges()    // input change
ngOnDestroy()    // cleanup
-these are called the angular lifecycle hooks
---------------------------------->
What happens when you call .next()
.next(value) pushes a new value into the BehaviorSubject
The subject stores this value as the latest state
ALL current subscribers are immediately notified
Each .subscribe() callback runs right away with that value

------------------------------------->
observabke are read only in the angualr . we can only subscribe . we cant use .next() to push to it.
whereas the subject and behaviour subject are read and write can use .next() adn .subscribe()
-------------------------------------->
without ngrx what we were doing:-
API response
     ↓
BehaviorSubject.next()
     ↓
Observable stream emits
     ↓
Subscribed components react
     ↓
UI updates

------------------------------------>
After the API call is made, the value comes back and is pushed into the BehaviorSubject.
Then, everywhere the service is injected and subscribed, the code reacts and updates.
------------------------------------>
redux:Slice → Store → Provider → useDispatch/useSelector
ngrx:Actions/Reducer/Effects → StoreModule → Inject Store → dispatch/select
------------------------------------->
If data is only needed in the template → use async pipe.(it automaically subscribe, unsubscribe and all);
If you need the value inside TS logic → use subscribe.