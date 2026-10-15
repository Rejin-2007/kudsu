import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import GsapRevealGroup, {
  GsapSectionIntro,
} from "@/app/components/GsapRevealGroup";
import Pagination from "@/app/components/Pagination";
import {
  createPaginationHref,
  getPaginationState,
  shouldRedirectToCanonicalPage,
  type PageSearchParams,
} from "@/app/lib/pagination";

export const revalidate = 60;

export default async function PetitionsPage({
  searchParams,
}: {
  searchParams: Promise<PageSearchParams>;
}) {
  const client = createClient();
  const [petitions, query] = await Promise.all([
    client.getAllByType("petition", {
      orderings: {
        field: "my.petition.number",
        direction: "desc",
      },
    }),
    searchParams,
  ]);
  const pagination = getPaginationState(query.page, petitions.length);
  if (shouldRedirectToCanonicalPage(query.page, pagination.currentPage)) {
    const canonicalHref = createPaginationHref(
      "/petition",
      pagination.currentPage,
      query,
      "petition-heading",
    ).split("#")[0];
    redirect(canonicalHref);
  }
  const pagePetitions = petitions.slice(
    pagination.startIndex,
    pagination.endIndex,
  );

  return (
    <section className="relative min-h-screen w-full overflow-x-hidden bg-[#050507] py-20 text-gray-200 antialiased lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-full max-w-7xl -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-500/[0.04] via-transparent to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,white,transparent_60%)]" />

      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32">
        <GsapSectionIntro
          id="petition-heading"
          className="relative z-10 mx-auto mb-20 max-w-3xl space-y-4 text-center"
        >
          <div data-gsap-intro className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.03] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-400 shadow-[inset_0_1px_0px_rgba(255,255,255,0.05)] backdrop-blur-md">
            ⚖️ Advocacy Registry
          </div>
          <h1 data-gsap-intro className="mt-4 bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-4xl font-black uppercase leading-none tracking-tight text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:text-6xl">
            Petitions
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base font-light leading-relaxed text-neutral-400 sm:text-lg">
            Review petitions and representations filed by the union to address various student issues and concerns
          </p>
        </GsapSectionIntro>

        {pagePetitions.length > 0 ? (
          <GsapRevealGroup className="grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {pagePetitions.map((petition, pageIndex) => {
              const detailSummary = prismic.asText(
                petition.data.petition_issue_details,
              );

              return (
                <article
                  key={petition.id}
                  data-gsap-reveal-item
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.05] bg-gradient-to-b from-white/[0.04] to-white/[0.005] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-2 hover:border-amber-400/30 hover:shadow-[0_40px_80px_-10px_rgba(245,158,11,0.06)]"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-100 transition-opacity duration-500" />

                  <div className="relative aspect-square overflow-hidden border-b border-white/[0.04] bg-neutral-900">
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent" />

                    <PrismicNextImage
                      field={petition.data.image}
                      fallbackAlt=""
                      loading={pageIndex === 0 ? "eager" : "lazy"}
                      fetchPriority={pageIndex === 0 ? "high" : "auto"}
                      sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) calc(50vw - 4rem), 30vw"
                      className="h-full w-full object-cover brightness-[0.85] filter transition-transform duration-1000 ease-out group-hover:scale-[1.03] group-hover:brightness-100"
                    />

                    <div className="absolute left-4 top-4 z-20">
                      <span className="rounded-md border border-white/10 bg-black/70 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 shadow-lg backdrop-blur-md">
                        INDEX #{petition.data.number || "00"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between space-y-6 p-6 sm:p-8">
                    <div className="space-y-3">
                      <PrismicRichText
                        field={petition.data.issue_name}
                        components={{
                          heading1: ({ children }: { children: React.ReactNode }) => (
                            <h3 className="line-clamp-2 text-xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-amber-300">
                              {children}
                            </h3>
                          ),
                          heading2: ({ children }: { children: React.ReactNode }) => (
                            <h3 className="line-clamp-2 text-xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-amber-300">
                              {children}
                            </h3>
                          ),
                        }}
                      />

                      <p className="line-clamp-3 text-sm font-light leading-relaxed text-neutral-400">
                        {detailSummary}
                      </p>
                    </div>

                    <div className="border-t border-white/[0.04] pt-4">
                      <Link
                        href={`/petition/${petition.uid}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white transition-colors duration-300 group-hover:text-amber-400"
                      >
                        <span>Review Details</span>
                        <span className="inline-block transform text-amber-400 transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </GsapRevealGroup>
        ) : (
          <p className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-12 text-center text-neutral-400">
            No petitions are available yet.
          </p>
        )}

        <Pagination
          pathname="/petition"
          currentPage={pagination.currentPage}
          pageCount={pagination.pageCount}
          searchParams={query}
          headingId="petition-heading"
        />
      </div>
    </section>
  );
}
