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

export default async function EventsPage() {
    const client = createClient();

    const events = await client.getAllByType("event", {
        orderings: {
            field: "my.event.date",
            direction: "desc",
        },
    });

    return (
        <section className="relative min-h-screen w-full bg-[#050507] text-gray-200 antialiased overflow-x-hidden py-20 lg:py-32">

            {/* Structural Luxury Accents & Ambient Backlighting */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-amber-500/[0.04] via-transparent to-transparent blur-[120px] pointer-events-none rounded-full" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,white,transparent_60%)] pointer-events-none" />

            {/* Global Fluid Wrapper spanning full viewport layout */}
            <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 max-w-[1920px] mx-auto">

                {/* Header Section */}
                <div className="mb-20 text-center relative z-10 max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.03] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-400 backdrop-blur-md shadow-[inset_0_1px_0px_rgba(255,255,255,0.05)]">
                        ✨ Our Timeline
                    </div>
                    <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl uppercase leading-none bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                        Exhibitions & Events
                    </h1>
                    <p className="mx-auto mt-4 text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-xl">
                        Stay updated with the latest luxury experiences, gatherings, and key corporate milestones curated at our Centre.
                    </p>
                </div>

                {/* Master Responsive Grid Matrix */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10 items-stretch">
                    {events.map((event) => {
                        const descriptionText = prismic.asText(event.data.description);
                        const formattedDate = formatDate(event.data.date);

                        return (
                            <article
                                key={event.id}
                                className="group flex flex-col relative overflow-hidden rounded-3xl border border-white/[0.05] bg-gradient-to-b from-white/[0.04] to-white/[0.005] backdrop-blur-md shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-amber-400/30 hover:shadow-[0_40px_80px_-10px_rgba(245,158,11,0.06)]"
                            >
                                {/* Glossy Upper Edge Bevel Rule */}
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-100 transition-opacity duration-500" />

                                {/* Image Showcase Box */}
                                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border-b border-white/[0.04]">
                                    {/* Simulated Glass Reflection Flare Layer */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent opacity-100 pointer-events-none z-10" />

                                    <PrismicNextImage
                                    fallbackAlt=""
                                        loading="eager"
                                        field={event.data.cover_image}
                                        className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03] filter brightness-[0.85] group-hover:brightness-100"
                                    />

                                    {/* Floating Luxe Badge */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="rounded-md bg-black/70 border border-white/10 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 backdrop-blur-md shadow-lg">
                                            INDEX #{event.data.event_number || "00"}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Track Body */}
                                <div className="flex flex-1 flex-col p-6 sm:p-8 justify-between space-y-6">

                                    <div className="space-y-3">
                                        {formattedDate && (
                                            <time className="block text-xs font-mono font-bold uppercase tracking-widest text-amber-500/80">
                                                {formattedDate}
                                            </time>
                                        )}

                                        <PrismicRichText
                                            field={event.data.name}
                                            components={{
                                                heading3: ({ children }: { children: React.ReactNode }) => (
                                                    <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-amber-300 line-clamp-2 uppercase">
                                                        {children}
                                                    </h3>
                                                )
                                            }}
                                        />

                                        <p className="line-clamp-3 text-sm leading-relaxed text-neutral-400 font-light">
                                            {descriptionText}
                                        </p>
                                    </div>

                                    {/* Clean CTA Footer Layer */}
                                    <div className="pt-4 border-t border-white/[0.04]">
                                        <Link
                                            href={`/events/${event.uid}`}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white group-hover:text-amber-400 transition-colors duration-300"
                                        >
                                            <span>Explore Showcase</span>
                                            <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-1 text-amber-400">
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