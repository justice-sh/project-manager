export const sort = (items: any[], path: string, order: string) => {
  const paths = path.split(".");

  return [...items].sort((a, b) => {
    const n = paths.reduce((acc, path) => acc[path], a);
    const m = paths.reduce((acc, path) => acc[path], b);

    if (typeof n === "number") return sortNum(n, m, order);
    if (typeof n === "string") return sortString(n, m, order);

    return 1;
  });
};

const sortString = (a: string, b: string, order: string) => {
  if (order === "asc") return a.localeCompare(b);

  return b.localeCompare(a);
};

const sortNum = (a: number, b: number, order: string) => {
  if (order === "asc") return a - b;

  return b - a;
};
