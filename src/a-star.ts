import TinyQueue from "tinyqueue";
import { createNestedMap, type NestedMap } from "./nested-map.js";
import { createNestedSet } from "./nested-set.js";

type Graph<Node, NodeId> = {
    getNodeId: (node: Node) => NodeId[];
    getNeighbors: (node: Node) => Node[];
    getDist: (a: Node, b: Node) => number;
};

const areArraysEqual = (a: unknown[], b: unknown[]): boolean =>
    a.length === b.length && a.every((aValue, i) => aValue === b[i]);

const generatePath = <Node, NodeId>(graph: Graph<Node, NodeId>, map: NestedMap<NodeId, Node>, start: Node): Node[] => {
    const startNodeId = graph.getNodeId(start);
    const nextPos = map.get(startNodeId) ?? start;
    if (areArraysEqual(graph.getNodeId(nextPos), startNodeId)) return [];
    return [nextPos, ...generatePath(graph, map, nextPos)];
};

export const aStar = <Node, NodeId>(
    graph: Graph<Node, NodeId>,
    start: Node,
    targets: Node[],
    maxIterations = Infinity
): Node[] => {
    const checked = createNestedSet<NodeId>();
    const map = createNestedMap<NodeId, Node>();
    const queue = new TinyQueue(
        targets.map(node => ({ node, prevNode: node, dist: 0, totalDistEstimate: graph.getDist(node, start) })),
        (a, b) => a.totalDistEstimate - b.totalDistEstimate
    );
    const startNodeId = graph.getNodeId(start);
    for (let i = 0; i < maxIterations && queue.length > 0; ++i) {
        const next = queue.pop();
        if (next === undefined) break;
        const { node, prevNode, dist } = next;
        const nodeId = graph.getNodeId(node);
        if (checked.has(nodeId)) continue;
        checked.add(nodeId);
        map.set(nodeId, prevNode);
        if (areArraysEqual(nodeId, startNodeId)) break;
        graph.getNeighbors(node).forEach(neighbor => {
            const nextDist = dist + graph.getDist(node, neighbor);
            queue.push({
                prevNode: node,
                node: neighbor,
                dist: nextDist,
                totalDistEstimate: nextDist + graph.getDist(neighbor, start)
            });
        });
    }
    return generatePath(graph, map, start);
};
