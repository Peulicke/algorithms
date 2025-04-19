export const getKeys = <Key extends string, T>(obj: Record<Key, T>) => (Object.keys(obj) as Key[]).sort();

export const getEntries = <Key extends string, T>(obj: Record<Key, T>) =>
    (Object.entries(obj) as [Key, T][]).sort(([a], [b]) => a.localeCompare(b));

export const getValues = <Key extends string, T>(obj: Record<Key, T>) => getEntries(obj).map(([_, value]) => value);

export const fromEntries = <Key extends string, T>(entries: [Key, T][]) =>
    Object.fromEntries(entries) as Record<Key, T>;

export const mapObj = <Key extends string, T, U>(obj: Record<Key, T>, func: (entry: [Key, T], i: number) => [Key, U]) =>
    fromEntries(getEntries(obj).map(([key, value], i) => func([key, value], i)));

export const mapObjValues = <Key extends string, T, U>(
    obj: Record<Key, T>,
    func: (value: T, key: Key, i: number) => U
) => mapObj(obj, ([key, value], i) => [key, func(value, key, i)]);
