type NestedMapData<Key, Value> = Value | Map<Key, NestedMapData<Key, Value>>;

const getValue = <Key, Value>(map: NestedMapData<Key, Value> | undefined, key: Key[]): Value | undefined => {
    if (key.length === 0) {
        if (map instanceof Map) throw new Error("value is a Map");
        return map;
    }
    if (map === undefined) return undefined;
    if (!(map instanceof Map)) throw new Error("map is not a Map");
    const [first, ...remaining] = key;
    if (first === undefined) throw new Error("key is undefined");
    return getValue(map.get(first), remaining);
};

const setValue = <Key, Value>(map: NestedMapData<Key, Value>, key: Key[], value: Value): void => {
    if (!(map instanceof Map)) throw new Error("map is not a Map");
    const [first, ...remaining] = key;
    if (first === undefined) throw new Error("key is undefined");
    if (remaining.length === 0) {
        map.set(first, value);
        return;
    }
    const nested = map.get(first);
    if (nested === undefined) map.set(first, new Map());
    setValue(map.get(first)!, remaining, value);
};

const deleteValue = <Key, Value>(map: NestedMapData<Key, Value>, key: Key[]): void => {
    if (!(map instanceof Map)) throw new Error("map is not a Map");
    const [first, ...remaining] = key;
    if (first === undefined) throw new Error("key is undefined");
    if (remaining.length === 0) {
        map.delete(first);
        return;
    }
    const nested = map.get(first);
    if (nested === undefined) map.set(first, new Map());
    deleteValue(map.get(first)!, remaining);
};

export type NestedMap<Key, Value> = {
    get: (key: Key[]) => Value | undefined;
    set: (key: Key[], value: Value) => void;
    delete: (key: Key[]) => void;
};

export const createNestedMap = <Key, Value>(): NestedMap<Key, Value> => {
    const map: NestedMapData<Key, Value> = new Map();
    return {
        get: (key: Key[]) => getValue(map, key),
        set: (key: Key[], value: Value) => {
            setValue(map, key, value);
        },
        delete: (key: Key[]) => {
            deleteValue(map, key);
        }
    };
};
