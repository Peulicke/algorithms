import { createNestedSet } from "./nested-set.js";

it("adds values", () => {
    const set = createNestedSet<number | string>();
    set.add([1, 2, "3"]);
    expect(set.has([1, 2, "3"])).toBe(true);
    expect(set.has([1, 2, 3])).toBe(false);
});
