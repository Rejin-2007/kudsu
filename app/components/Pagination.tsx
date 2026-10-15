import Link from "next/link";
import {
  createPaginationHref,
  getVisiblePages,
  type PageSearchParams,
} from "@/app/lib/pagination";

type PaginationProps = {
  pathname: string;
  currentPage: number;
  pageCount: number;
  searchParams: PageSearchParams;
  headingId: string;
};

const controlClassName =
  "inline-flex min-h-10 items-center justify-center rounded-full border border-white/10 px-4 text-xs font-semibold uppercase tracking-wider transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400";

export default function Pagination({
  pathname,
  currentPage,
  pageCount,
  searchParams,
  headingId,
}: PaginationProps) {
  const visiblePages = getVisiblePages(currentPage, pageCount);
  const hrefFor = (page: number) =>
    createPaginationHref(pathname, page, searchParams, headingId);

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex flex-col items-center gap-4 text-neutral-300"
    >
      <p aria-live="polite" className="text-xs font-mono text-neutral-500">
        Page {currentPage} of {pageCount}
      </p>

      <ul className="flex max-w-full flex-wrap items-center justify-center gap-2">
        <li>
          {currentPage === 1 ? (
            <span
              aria-disabled="true"
              className={`${controlClassName} cursor-not-allowed text-neutral-600`}
            >
              Previous
            </span>
          ) : (
            <Link
              href={hrefFor(currentPage - 1)}
              rel="prev"
              className={`${controlClassName} hover:border-amber-400/40 hover:text-amber-300`}
            >
              Previous
            </Link>
          )}
        </li>

        {visiblePages.map((page, index) => {
          const previousPage = visiblePages[index - 1];
          const hasGap = previousPage !== undefined && page - previousPage > 1;

          return (
            <li key={page} className="contents">
              {hasGap && (
                <span aria-hidden="true" className="px-1 text-neutral-600">
                  …
                </span>
              )}
              <Link
                href={hrefFor(page)}
                aria-current={page === currentPage ? "page" : undefined}
                aria-label={`Page ${page}${page === currentPage ? ", current page" : ""}`}
                className={`${controlClassName} min-w-10 px-3 ${
                  page === currentPage
                    ? "border-amber-400/60 bg-amber-400/10 text-amber-300"
                    : "hover:border-amber-400/40 hover:text-amber-300"
                }`}
              >
                {page}
              </Link>
            </li>
          );
        })}

        <li>
          {currentPage === pageCount ? (
            <span
              aria-disabled="true"
              className={`${controlClassName} cursor-not-allowed text-neutral-600`}
            >
              Next
            </span>
          ) : (
            <Link
              href={hrefFor(currentPage + 1)}
              rel="next"
              className={`${controlClassName} hover:border-amber-400/40 hover:text-amber-300`}
            >
              Next
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
