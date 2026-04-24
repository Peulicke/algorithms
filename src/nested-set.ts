import { createNestedMap } from "./nested-map.js";

export type NestedSet<Key> = {
    has: (key: Key[]) => boolean;
    add: (key: Key[]) => void;
    delete: (key: Key[]) => void;
};

export const createNestedSet = <Key>(): NestedSet<Key> => {
    const map = createNestedMap<Key, boolean>();
    return {
        has: (key: Key[]) => map.get(key) === true,
        add: (key: Key[]) => {
            map.set(key, true);
        },
        delete: (key: Key[]) => {
            map.delete(key);
        }
    };
};
