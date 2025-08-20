import { getMinObj, removeSimilar, removeSimilarFromSortedArray, swap } from "./basic.js";

it("gets the smallest value", () => {
    expect(getMinObj([2, 1, 3], v => v)).toBe(1);
});

it("gets the object with smallest value", () => {
    const object = { value: 1 };
    expect(getMinObj([{ value: 2 }, object, { value: 3 }], o => o.value)).toBe(object);
});

it("swaps", () => {
    const array = [1, 2];
    swap(array, 0, 1);
    expect(array).toStrictEqual([2, 1]);
});

it("removes similar values", () => {
    expect(removeSimilar([1, 2, 3, 2, 1], (a, b) => a === b)).toStrictEqual([1, 2, 3]);
});

it("removes similar values from sorted array", () => {
    expect(removeSimilarFromSortedArray([1, 1, 2, 2, 3], (a, b) => a === b)).toStrictEqual([1, 2, 3]);
});
