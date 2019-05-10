const benchmark = require('./data/benchmark')

Object.entries(benchmark).forEach(e => console.log(e[0], Object.entries(e[1]).length))
