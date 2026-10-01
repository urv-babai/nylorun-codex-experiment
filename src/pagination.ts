export function pageWindow(
  page: number,
  limit: number,
): { start: number; end: number } {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 20;
  const start = safePage === 1 ? 0 : (safePage - 1) * safeLimit - 1;
  return { start, end: start + safeLimit };
}
