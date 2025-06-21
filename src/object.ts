type Key<T extends object> = keyof T;

type Value<T extends object> = T[Key<T>];

type Entry<T extends object> = [Key<T>, Value<T>];

export const getKeys = <T extends object>(obj: T): Key<T>[] => (Object.keys(obj) as Key<T>[]).sort();

export const getEntries = <T extends object>(obj: T): Entry<T>[] => {
    return (Object.entries(obj) as Entry<T>[]).sort(([a], [b]) => {
        if (typeof a !== typeof b) return (typeof a).localeCompare(typeof b);
        if (typeof a === "number" && typeof b === "number") return a - b;
        return String(a).localeCompare(String(b));
    });
};

export const getValues = <T extends object>(obj: T): Value<T>[] => getEntries(obj).map(([_, value]) => value);

export const fromEntries = <T extends object>(entries: Entry<T>[]) => Object.fromEntries(entries) as T;

export const mapObj = <T extends object, U extends object>(obj: T, func: (entry: Entry<T>, i: number) => Entry<U>): U =>
    fromEntries(getEntries(obj).map(([key, value], i) => func([key, value], i)));

export const mapObjValues = <T extends object, U>(obj: T, func: (value: Value<T>, key: Key<T>, i: number) => U) =>
    mapObj<T, { [K in Key<T>]: U }>(obj, ([key, value], i) => [key, func(value, key, i)]);
