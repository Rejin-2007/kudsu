import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as prismic from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

import { createClient } from "@/prismicio";

export const revalidate = 60;
export const dynamicParams = true;

type EventPageProps = {
  params: { uid: string };
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatDate(date: string | null) {
  if (!date) return null;
  return dateFormatter.format(new Date(date));
}

async function getEvent(uid: string) {
  const client = createClient();
  try {
    return await client.getByUID("event", uid);
  } catch (error) {
    if (error instanceof prismic.NotFoundError) notFound();
    throw error;
  }
}

export async function generateStaticParams() {
  const client = createClient();
  const events = await client.getAllByType("event");
  return events.map((event) => ({ uid: event.uid }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  try {
    const event = await client.getByUID("event", uid);
    const title = prismic.asText(event.data.name) || "Event";
    const description = prismic.asText(event.data.description);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: prismic.isFilled.image(event.data.cover_image) ? [event.data.cover_image.url] : [],
      },
    };
  } catch (error) {
    if (error instanceof prismic.NotFoundError) return { title: "Event not found" };
    throw error;
  }
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { uid } = await params;
  const event = await getEvent(uid);
  const eventDate = formatDate(event.data.date);
  const galleryImages = event.data.images.filter((item) => prismic.isFilled.image(item.image));

  return (
    <main className="relative min-h-screen w-full bg-[#050507] text-gray-200 antialiased selection:bg-amber-400 selection:text-black overflow-x-hidden">

      {/* Structural Luxury Accents & Ambient Backlighting */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-amber-500/[0.03] via-purple-500/[0.01] to-transparent pointer-events-none" />
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-amber-500/[0.04] blur-[160px] pointer-events-none rounded-full" />

      {/* Subtle UI Grid Mesh Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_top,white,transparent_75%)] pointer-events-none" />

      {/* Global Fluid Wrapper spanning full viewport layout */}
      <div className="w-full px-4 py-8 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 max-w-[1920px] mx-auto">

        {/* Navigation Layer */}
        <nav className="flex items-center justify-between w-full border-b border-white/[0.04] pb-6 mb-12">
          <Link
            href="/events"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-400 backdrop-blur-md transition-all will-change-transform hover:bg-white/[0.06] hover:text-amber-400 hover:border-amber-500/20 shadow-[inset_0_1px_0px_rgba(255,255,255,0.05)]"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span>Back to archive</span>
          </Link>
          <div className="hidden sm:block text-[10px] uppercase font-bold tracking-[0.3em] text-white/30">
            Internal Document // Private Tier
          </div>
        </nav>

        {/* Master Asymmetric Structural Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">

          {/* Left Column: Core Header Details & Meta Layout (Pockets 5-Cols on Desktop) */}
          <header className="lg:col-span-5 lg:sticky lg:top-12 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-wider">
                {eventDate ? (
                  <time dateTime={event.data.date ?? undefined} className="bg-white/[0.03] text-amber-400/90 px-3 py-1.5 rounded-md border border-white/[0.06] shadow-inner font-medium">
                    {eventDate}
                  </time>
                ) : null}
                {event.data.event_number ? (
                  <span className="rounded-md bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1.5 font-bold text-black shadow-[0_4px_20px_rgba(245,158,11,0.15)] uppercase text-[11px] tracking-tight">
                    INDEX #{event.data.event_number}
                  </span>
                ) : null}
              </div>

              <PrismicRichText
                field={event.data.name}
                components={{
                  heading3: ({ children }: { children: React.ReactNode }) => (
                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl xl:text-6xl uppercase font-sans leading-[1.05] [text-shadow:0_4px_12px_rgba(0,0,0,0.8)] bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
                      {children}
                    </h1>
                  ),
                }}
              />
            </div>

            {/* Injected Premium Separator Card detail */}
            <div className="hidden lg:block border-t border-white/[0.06] pt-8 mt-4">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 space-y-2">
                <div>Format: Experiential Showcase</div>
                <div>Status: Concluded Exhibition</div>
              </div>
            </div>
          </header>

          {/* Right Column: Hero Showcase, Description & Modular Gallery Components (7-Cols) */}
          <div className="lg:col-span-7 space-y-12 xl:space-y-16">

            {/* Primary Glossy Hero Section */}
            {prismic.isFilled.image(event.data.cover_image) ? (
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.1)] group">
                {/* Simulated Glass Reflection Flare Layer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-100 pointer-events-none z-10" />
                <div className="absolute -inset-px bg-gradient-to-b from-white/10 to-transparent rounded-2xl opacity-100 pointer-events-none z-20" />

                <PrismicNextImage
                  field={event.data.cover_image}
                  fallbackAlt=""
                  loading="eager"
                  className="h-auto w-full object-cover aspect-[16/10] sm:aspect-[16/9] transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
                />
              </div>
            ) : null}

            {/* Editorial Presentation Content */}
            <div className="relative rounded-2xl border border-white/[0.04] bg-gradient-to-b from-white/[0.03] to-white/[0.005] p-6 sm:p-8 xl:p-10 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <div className="max-w-none text-base sm:text-lg leading-8 text-neutral-300 font-light space-y-6">
                <PrismicRichText
                  field={event.data.description}
                  components={{
                    paragraph: ({ children }) => <p className="mb-6 last:mb-0 text-neutral-300/90">{children}</p>,
                    strong: ({ children }) => (
                      <strong className="font-semibold text-white bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">
                        {children}
                      </strong>
                    ),
                  }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Media Records Section — Safely Nested Inside the Fluid Alignment Bounds */}
        {galleryImages.length ? (
          <section className="relative mt-24 pt-16 border-t border-white/[0.04]">
            {/* Ambient Backlight Zone */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[250px] bg-gradient-to-b from-amber-500/[0.02] to-transparent blur-[80px] pointer-events-none rounded-full" />

            {/* Grid Header Track */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 relative z-10">
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-mono font-bold tracking-[0.3em] text-amber-500/80">
                  Visual Archives
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
                  Media Records Gallery
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-md bg-white/[0.02] border border-white/[0.05] px-3 py-1.5 font-mono text-xs text-neutral-400 shadow-inner">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>{galleryImages.length} {galleryImages.length === 1 ? 'Certified Frame' : 'Certified Frames'}</span>
              </div>
            </div>

            {/* Responsive 4-Column Luxury Grid Matrix */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch relative z-10">
              {galleryImages.map((item, index) => (
                <div
                  key={`${item.image.url}-${index}`}
                  className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#0c0c0e] shadow-[0_16px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-500 ease-out group hover:-translate-y-1.5 hover:border-amber-400/30 hover:shadow-[0_24px_48px_rgba(245,158,11,0.08)] cursor-pointer"
                >
                  {/* Glossy Reflection Accents */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent opacity-100 pointer-events-none z-10" />

                  {/* Strictly Proportioned Image Container Box */}
                  <div className="overflow-hidden w-full h-full aspect-[4/3] sm:aspect-[1/1] md:aspect-[4/3] xl:aspect-[1/1] 2xl:aspect-[4/5]">
                    <PrismicNextImage
                      field={item.image}
                      fallbackAlt=""
                      className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04] filter brightness-[0.85] contrast-[1.05] group-hover:brightness-100 group-hover:contrast-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

      </div>
    </main>
  );
}