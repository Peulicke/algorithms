import { shuffle } from "./random";

it("shuffles", () => {
    const array = [1, 2, 3, 4];
    shuffle(array, () => 0);
    expect(array.length).toBe(4);
});
