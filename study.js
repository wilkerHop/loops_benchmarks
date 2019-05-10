const marks = require('./data')

const current = 'for'

const tooFast = Object.entries(marks[current])
    .map(e => e[1].filter(f => !f.rating));

const data = Object.entries(marks[current]).map(e=>e[1])

// console.log(tooFast)
console.log(data[500])

const keys = Object.entries(marks).map(e => e[0])

keys.forEach(key => {

})