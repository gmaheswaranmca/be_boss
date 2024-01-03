const diffFunction = (a,b) => {return  a - b;}


const testCase1_fn = () => {
    const a = 17
    const b = 6
    const actualResult = diffFunction(a, b)
    const exprectedResult = 11
    
    expect(actualResult).toBe(exprectedResult)
};

const testCase2_fn = () => {
    const a = 18
    const b = 6
    const actualResult = diffFunction(a, b)
    const exprectedResult = 12

    expect(actualResult).toBe(exprectedResult)
};

test('test diffFunction(17,6)=11, expected to pass', testCase1_fn)
test('test diffFunction(18,6)=12, expected to pass', testCase2_fn)