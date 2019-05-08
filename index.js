const fs = require('fs')

const benchmarker = async (f, name, arr) => {
    const start = new Date().getTime();
    f();
    const end = new Date().getTime();

    const benchmark = JSON.parse(await fs.readFileSync('./data/benchmark.json'))

    if (!benchmark[name]) {
        benchmark[name] = {}
        if (!benchmark[name][arr.length])
            benchmark[name][arr.length] = []
    }
    benchmark[name][arr.length].push({
        end, start,
        arrayLength: arr.length,
        millestone: end - start,
        rating: arr.length / (end - start),
    })

    fs.writeFileSync('./data/benchmark.json', JSON.stringify(benchmark))

    // console.log(name, `took ${end - start}ms`)
}

const markers = async arr => {
    // for
    await benchmarker(() => {
        const newArr = []
        for (let i = 0; i < arr.length; i++) {
            newArr.push(arr[i] * 2)
        }
    }, 'for', arr)

    // for in
    await benchmarker(() => {
        const newArr = []
        for (n in arr) {
            newArr.push(arr[n] * 2)
        }
    }, 'for in', arr)

    // forEach
    await benchmarker(() => {
        const newArr = []
        arr.forEach(n => newArr.push(n * 2))
    }, 'forEach', arr)

    // map
    await benchmarker(() => {
        const newArr = arr.map(n => n * 2)
    }, 'map', arr)

    // itarables realm
    const generator = function* () {
        for (let i in arr) {
            yield arr[i];
        }
    }

    const it = generator()

    // for of
    await benchmarker(() => {
        const newArr = []
        for (const number of it) {
            newArr.push(number * 2)
        }
    }, 'for of', arr)

    // for of with iterable declaration
    await benchmarker(() => {
        const it2 = generator()
        const newArr = []
        for (const number of it2) {
            newArr.push(number * 2)
        }
    }, 'for of with iterable declaration', arr)

    // for of with generator and iterable declaration
    await benchmarker(() => {
        const it3 = (function* () {
            for (let i in arr) {
                yield arr[i];
            }
        })()
        const newArr = []
        for (const number of it3) {
            newArr.push(number * 2)
        }
    }, 'for of with generator and iterable declaration', arr)
}

(async () => {
    const toughness = [];
    for (let i = 1; i < 51; i++) {
        toughness.push(i)
        var arr = toughness;

        arr = [...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr,]
        arr = [...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr,]
        arr = [...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr,]
        arr = [...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr,]

        for (let j = 0; j < 5; j++) {
            console.log(i, j)
            await markers(arr)
        }
    }
})()
