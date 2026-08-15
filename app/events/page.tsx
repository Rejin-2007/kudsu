import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import Link from "next/link";

export const revalidate = 60;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
});

function formatDate(dateString: string | null) {
    if (!dateString) return "";
    return dateFormatter.format(new Date(dateString));
}

function formatDateRange(
    startDate: string | null,
    endDate: string | null
) {
    const start = formatDate(startDate);
    const end = formatDate(endDate);

    if (!start) return "";
    if (!end) return start;

    return `${start} — ${end}`;
}

export default async function EventsPage() {
    const client = createClient();

    const events = await client.getAllByType("event");

    /*
     * First:
     * Sort chronologically from oldest → newest.
     *
     * This determines the permanent INDEX number.
     *
     * Example:
     * Oldest  = #01
     * Second  = #02
     * Latest  = #03
     */
    const chronologicalEvents = [...events].sort((a, b) => {
        const dateA = a.data.date
            ? new Date(a.data.date).getTime()
            : Number.MAX_SAFE_INTEGER;

        const dateB = b.data.date
            ? new Date(b.data.date).getTime()
            : Number.MAX_SAFE_INTEGER;

        return dateA - dateB;
    });

    /*
     * Create the index based on chronological order.
     */
    const numberedEvents = chronologicalEvents.map((event, index) => ({
        event,
        index: index + 1,
    }));

    /*
     * Then reverse ONLY the display order.
     *
     * Latest event appears first,
     * while its original chronological index is preserved.
     */
    const displayEvents = [...numberedEvents].reverse();

    return (
        <section className="relative min-h-screen w-full overflow-x-hidden bg-[#050507] py-20 text-gray-200 antialiased lg:py-32">

            {/* Ambient Background */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-full max-w-7xl -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-500/[0.04] via-transparent to-transparent blur-[120px]" />

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_top,white,transparent_60%)] bg-[size:40px_40px]" />

            {/* Main Container */}
            <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32">

                {/* Header */}
                <div className="relative z-10 mx-auto mb-20 max-w-3xl space-y-4 text-center">

                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.03] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-400 shadow-[inset_0_1px_0px_rgba(255,255,255,0.05)] backdrop-blur-md">
                        ✨ Our Timeline
                    </div>

                    <h1 className="mt-4 bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-4xl font-black uppercase leading-none tracking-tight text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:text-6xl">
                        EVENTS
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-base font-light leading-relaxed text-neutral-400 sm:text-lg">
                        Stay updated with all the academic and festive events conducted by the Union at campus
                    </p>

                </div>

                {/* Events Grid */}
                <div className="grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">

                    {displayEvents.map(({ event, index }) => {

                        const descriptionText = prismic.asText(
                            event.data.description
                        );

                        const dateRange = formatDateRange(
                            event.data.date,
                            event.data.end_date
                        );

                        const displayIndex = String(index).padStart(2, "0");

                        return (
                            <article
                                key={event.id}
                                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.05] bg-gradient-to-b from-white/[0.04] to-white/[0.005] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-2 hover:border-amber-400/30 hover:shadow-[0_40px_80px_-10px_rgba(245,158,11,0.06)]"
                            >

                                {/* Top Bevel */}
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                                {/* Image */}
                                <div className="relative aspect-[4/5] overflow-hidden border-b border-white/[0.04] bg-neutral-900">

                                    {/* Reflection */}
                                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent" />

                                    <PrismicNextImage
                                        field={event.data.cover_image}
                                        fallbackAlt=""
                                        loading="eager"
                                        className="h-full w-full object-cover brightness-[0.85] filter transition-transform duration-1000 ease-out group-hover:scale-[1.03] group-hover:brightness-100"
                                    />

                                    {/* Index */}
                                    <div className="absolute left-4 top-4 z-20">
                                        <span className="rounded-md border border-white/10 bg-black/70 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 shadow-lg backdrop-blur-md">
                                            INDEX #{displayIndex}
                                        </span>
                                    </div>

                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col justify-between space-y-6 p-6 sm:p-8">

                                    <div className="space-y-3">

                                        {/* Start Date — End Date */}
                                        {dateRange && (
                                            <time className="block text-xs font-mono font-bold uppercase tracking-widest text-amber-500/80">
                                                {dateRange}
                                            </time>
                                        )}

                                        {/* Event Name */}
                                        <PrismicRichText
                                            field={event.data.name}
                                            components={{
                                                heading3: ({
                                                    children,
                                                }: {
                                                    children: React.ReactNode;
                                                }) => (
                                                    <h3 className="line-clamp-2 text-xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-amber-300">
                                                        {children}
                                                    </h3>
                                                ),
                                            }}
                                        />

                                        {/* Description */}
                                        <p className="line-clamp-3 text-sm font-light leading-relaxed text-neutral-400">
                                            {descriptionText}
                                        </p>

                                    </div>

                                    {/* CTA */}
                                    <div className="border-t border-white/[0.04] pt-4">

                                        <Link
                                            href={`/events/${event.uid}`}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white transition-colors duration-300 group-hover:text-amber-400"
                                        >
                                            <span>Explore Showcase</span>

                                            <span className="inline-block transform text-amber-400 transition-transform duration-300 group-hover:translate-x-1">
                                                →
                                            </span>
                                        </Link>

                                    </div>

                                </div>

                            </article>
                        );
                    })}

                </div>

            </div>
        </section>
    );
}
