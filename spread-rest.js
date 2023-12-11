//3
let even = [10,20,30]
let odd = [11, 21, 31]
let all = []
for(let e of even){
    all.push(e)
}
for(let e of odd){
    all.push(e)
}

console.log(even,odd,all)

let nums = even
even [1] = 60
console.log(nums,even)

let another = [...even] //copies of the existing array
even[2] = 90
console.log(even,nums,another)

another = [...another, ...odd] // 'another' array is recreated and added all elements of 'odd' array as well

let bottle = {type:'water-bottle', capacity:2.0}
console.log(bottle)
bottle = {type:'water-bottle', capacity:2.5}
console.log(bottle)
bottle = {...bottle, capacity: 3.5}
console.log(bottle)