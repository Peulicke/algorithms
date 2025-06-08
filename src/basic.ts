export const get = <T>(array: T[], index: number): T => {
    if (index in array) return array[index]!;
    throw new Error(`array does not contain index ${index}`);
};

export const forEachPair = <T>(array: T[], func: (a: T, b: T) => void): void => {
    for (let i = 0; i < array.length; ++i) {
        for (let j = i + 1; j < array.length; ++j) {
            func(get(array, i), get(array, j));
        }
    }
};

export const deleteWhere = <T>(array: T[], condition: (t: T) => boolean): T[] => {
    const deleted: T[] = [];
    for (let i = array.length - 1; i >= 0; --i) {
        const iValue = array[i]!;
        if (condition(iValue)) deleted.push(...array.splice(i, 1));
    }
    return deleted;
};

export const sum = (array: number[]): number => array.reduce((s, v) => s + v, 0);

export const mean = (array: number[]): number => sum(array) / array.length;

export const lerp = (a: number, b: number, w: number) => a * (1 - w) + b * w;

export const getMinObj = <T>(objects: T[], getValue: (t: T) => number): T | undefined => {
    let minValue = Infinity;
    let result: T | undefined = undefined;
    objects.forEach(object => {
        const value = getValue(object);
        if (value > minValue) return;
        minValue = value;
        result = object;
    });
    return result;
};

export const removeSimilar = <T>(values: T[], isSimilar: (a: T, b: T) => boolean): T[] => {
    const result: T[] = [];
    values.forEach(value => {
        if (result.some(v => isSimilar(v, value))) return;
        result.push(value);
    });
    return result;
};

export const swap = <T>(objects: T[], i: number, j: number) => {
    const [oi, oj] = [get(objects, i), get(objects, j)];
    [objects[i], objects[j]] = [oj, oi];
};

export const clamp = (value: number, from: number, to: number): number => Math.min(Math.max(value, from), to);
