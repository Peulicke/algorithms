import { createNestedMap } from "./nested-map.js";

it("sets, gets and deletes values", () => {
    const map = createNestedMap<number | string, number>();
    map.set([1, 2, "3"], 4);
    expect(map.get([1, 2, "3"])).toBe(4);
    expect(map.get([1, 2, 3])).toBeUndefined();
    map.delete([1, 2, "3"]);
    expect(map.get([1, 2, "3"])).toBeUndefined();
});
