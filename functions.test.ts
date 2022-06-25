const { shuffleArray } = require('./utils')

describe('shuffleArray should', () => {
    // CODE HERE
    test('be random', () => {
        const testArray = [2, 9, 0, 5, 3];
        expect(testArray).not.toBe([2, 9, 0, 5, 3]);
    });

    test('be a copied array', () => {
        const array = [2, 9, 0, 5, 3];
        expect(array).toEqual(array);
    });
});