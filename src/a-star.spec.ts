import { expect, it } from "vitest";
import { aStar } from "./a-star.js";

it("finds the shortest path", () => {
    expect(
        aStar<number, number>(
            {
                getNodeId: node => [node],
                getDist: (from, to) => Math.abs(from - to),
                getNeighbors: node => [node - 1, node + 1]
            },
            0,
            [10, 20, -5]
        )
    ).toStrictEqual([-1, -2, -3, -4, -5]);
});

it("finds the empty path", () => {
    expect(
        aStar<number, number>(
            {
                getNodeId: node => [node],
                getDist: (from, to) => Math.abs(from - to),
                getNeighbors: node => [node - 1, node + 1]
            },
            0,
            [0]
        )
    ).toStrictEqual([]);
});

it("finds no path", () => {
    expect(
        aStar<number, number>(
            {
                getNodeId: node => [node],
                getDist: (from, to) => Math.abs(from - to),
                getNeighbors: node => [node - 1, node + 1]
            },
            0,
            []
        )
    ).toStrictEqual(undefined);
});
