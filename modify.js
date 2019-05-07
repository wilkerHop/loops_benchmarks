const benchmark = require('./data/benchmark')
const fs = require('fs')

Object.entries(benchmark).forEach(e => {
    benchmark[e[0]] = benchmark[e[0]].map(b => {
        return { ...b, rating: b.arrayLength / b.millestone }
    })
})


fs.writeFileSync('./data/benchmark.json', JSON.stringify(benchmark))