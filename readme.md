# Loop Benchmarks
This is a project to check which iteration loop is the fastest.

## Logging
The output the the main script will be like this:
```js
1 331776 0
1 331776 1
1 331776 2
1 331776 3
1 331776 4
1 331775 0
1 331775 1
1 331775 2
1 331775 3
1 331775 4
```

### TL;DR
The process will be made by the **increase** of the first column, the **decrease** of the second and the **increase** of the third.

The first column is the is the length of the array used to create the larger arrays for iteration, which will be from `1` to `50`.

The second column is the length of the array that is being iterated. The script will go for the largest first, reduce its length to `0` and start the process again with the next largest.

The third column is the number of the times the curent array was iterated, from `0` to `4`.