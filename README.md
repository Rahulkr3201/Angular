

RxJS in one glance

Observable → represents a stream of data over time

pipe() → used to transform the stream

Operators (map, filter, switchMap, etc.) → apply logic to the data

subscribe() / async pipe → consume the final result

-------------------------->

of() emits what you give it.
from() breaks it into pieces and emits them.

-------------------------->

destroy$ → stop signal

takeUntil() → listens for stop signal

next() → tells streams to stop

complete() → frees memory

If you manually subscribe → you must clean up with destroy$.
----------------------------------->

