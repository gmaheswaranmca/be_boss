function doSum(first, second){
    return first + second;
}

function doDiff({first, second}){
    return first - second;
}

function doSumOfTwoSets({group_one: {first, second}, group_two: {third, fourth}}){
    return first + second + third + fourth;
}

function _main(){
    const [first, second, third, fourth] = [5, 3, 7, 10];
    const sum = doSum(first, second);
    console.log( {first, second, sum } ); //8

    const diff = doDiff( { first, second }); //... = doDiff( { first: first, second:second });
    console.log( { input: { first, second }, diff } ); // 2

    const sumOfSets = doSumOfTwoSets( {
            group_one: { first, second }, 
            group_two: { third, fourth } });
    console.log( { 
        input: {
            group_one: { first, second }, 
            group_two: { third, fourth } }, 
        sumOfSets } ); //25
}

module.exports = _main;

/*

--- index.js ---
const func_v1 = require('./tried/01-func/func-v1');
func_v1();
*/