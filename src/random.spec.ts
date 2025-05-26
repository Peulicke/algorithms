import { pickRandom, randomInt, shuffle } from "./random.js";

it("gets a random int", () => {
    expect(randomInt(() => 0)(0, 10)).toBe(0);
    expect(randomInt(() => 0.99)(0, 10)).toBe(10);
});

it("picks a random element", () => {
    const array = [1, 2, 3, 4];
    expect(pickRandom(() => 0.1)(array)).toBe(1);
    expect(pickRandom(() => 0.4)(array)).toBe(2);
    expect(pickRandom(() => 0.6)(array)).toBe(3);
    expect(pickRandom(() => 0.99)(array)).toBe(4);
});

it("shuffles", () => {
    const array = [1, 2, 3, 4];
    shuffle(array, () => 0);
    expect(array.length).toBe(4);
});
