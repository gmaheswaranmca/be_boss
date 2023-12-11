//2
let numbers = [10,20,30,10,10,30]
let freq =[[10,3],[20,1],[30,2]]

for(let e of numbers){
    console.log(e)
}

for(let eAr of freq){
    console.log(eAr)
}

for(let [theNum, itsFreq] of freq){
    console.log(`${theNum} occurs ${itsFreq} times`)
}

let students = [
    {code:101,scores:80},
    {code:102,scores:70},
    {code:103,scores:73}
]

let tot = 0
for(let {scores} of students){
    tot += scores
}
console.log(tot)