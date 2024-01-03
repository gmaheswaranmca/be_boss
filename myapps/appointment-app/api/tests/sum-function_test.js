const sumFunction = (a,b) => {return  a + b;}

const testCase1_fn = () => {
    const a = 5
    const b = 6
    const actualResult = sumFunction(a, b)
    const exprectedResult = 11
    
    expect(actualResult).toBe(exprectedResult)
};


const testCase2_fn = () => {
    const a = 5
    const b = 6
    const actualResult = sumFunction(a, b)
    const exprectedResult = 12

    expect(actualResult).toBe(exprectedResult)
};


const testCase3_fn = () => {
    const a = 5
    const b = 7
    const actualResult = sumFunction(a, b)
    const exprectedResult = 12

    expect(actualResult).toBe(exprectedResult)
};

test('test sumFunction(5,6)=11, expected to pass', testCase1_fn)
//test('test sumFunction(5,6)=12, expected to fail', testCase2_fn)
test('test sumFunction(5,7)=12, expected to pass', testCase3_fn)