export type PageSearchParams = Record<
  string,
  string | string[] | undefined
>;

export type PaginationState = {
  currentPage: number;
  pageCount: number;
  startIndex: number;
  endIndex: number;
};

/** Clamp URL page values so malformed or stale links always resolve safely. */
export function getPaginationState(
  pageParam: string | string[] | undefined,
  itemCount: number,
  pageSize = 9,
): PaginationState {
  const pageCount = Math.max(1, Math.ceil(itemCount / pageSize));
  const rawPage = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const requestedPage = rawPage && /^[1-9]\d*$/.test(rawPage)
    ? Number(rawPage)
    : 1;
  const currentPage = Math.min(requestedPage, pageCount);
  const startIndex = (currentPage - 1) * pageSize;

  return {
    currentPage,
    pageCount,
    startIndex,
    endIndex: startIndex + pageSize,
  };
}

/** Detect stale or malformed page values so the visible page and URL agree. */
export function shouldRedirectToCanonicalPage(
  pageParam: string | string[] | undefined,
  currentPage: number,
): boolean {
  if (pageParam === undefined) return false;
  if (Array.isArray(pageParam)) {
    return pageParam.length !== 1 || shouldRedirectToCanonicalPage(pageParam[0], currentPage);
  }

  const requestedPage = Number(pageParam);
  return (
    !/^[1-9]\d*$/.test(pageParam) ||
    requestedPage !== currentPage ||
    requestedPage === 1
  );
}

/** Keep unrelated query parameters intact as filters are added to these pages. */
export function createPaginationHref(
  pathname: string,
  page: number,
  searchParams: PageSearchParams,
  headingId: string,
): string {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (key === "page" || value === undefined) continue;
    for (const item of Array.isArray(value) ? value : [value]) {
      query.append(key, item);
    }
  }

  if (page > 1) query.set("page", String(page));

  const queryString = query.toString();
  return `${pathname}${queryString ? `?${queryString}` : ""}#${headingId}`;
}

export function getVisiblePages(currentPage: number, pageCount: number) {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const pages = new Set([1, pageCount]);
  for (
    let page = Math.max(2, currentPage - 1);
    page <= Math.min(pageCount - 1, currentPage + 1);
    page += 1
  ) {
    pages.add(page);
  }

  return [...pages].sort((a, b) => a - b);
}
