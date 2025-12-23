export const mapTuple = <T extends unknown[], R>(
    tuple: T,
    func: (value: T[number], index: number) => R
): { [K in keyof T]: R } => {
    const result = tuple.map(func);
    return result as { [K in keyof T]: R };
};
