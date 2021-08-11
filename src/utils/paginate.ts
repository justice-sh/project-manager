export const paginate = (
  items: any[],
  pageNumber: number,
  pageSize: number
) => {
  const start = (pageNumber - 1) * pageSize;
  const end = pageSize * pageNumber;
  return items.slice(start, end);
};
