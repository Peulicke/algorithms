import { swap } from "./basic.js";

export const randomInt = (random: () => number) => (min: number, max: number) =>
    Math.floor(random() * (max - min + 1)) + min;

export const pickRandom =
    (random: () => number) =>
    <T>(objects: T[]) =>
        objects[randomInt(random)(0, objects.length - 1)];

export const shuffle = <T>(objects: T[], random: () => number) => {
    for (let i = 0; i + 1 < objects.length; ++i) {
        swap(objects, i, randomInt(random)(i + 1, objects.length - 1));
    }
};
