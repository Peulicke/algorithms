import { swap } from "./basic";

export const randomInt = (random: () => number) => (min: number, max: number) =>
    Math.floor(random() * (max - min + 1)) + min;

export const shuffle = <T>(objects: T[], random: () => number) => {
    for (let i = 0; i + 1 < objects.length; ++i) {
        swap(objects, i, randomInt(random)(i + 1, objects.length - 1));
    }
};
