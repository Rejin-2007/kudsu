"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";

interface Community {
  id: string;
  uid: string | null;
  image: string | null;
  title: string;
  description: string;
  name: string;
  poc: string;
  link: string | null;
}

export default function CommunityGrid() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommunities() {
      try {
        const client = createClient();

        const documents = await client.getAllByType("community");

        const data: Community[] = documents.map((document) => ({
          id: document.id,

          uid: document.uid ?? null,

          /* ================================
             Image
          ================================= */

          image: prismic.isFilled.image(document.data.image)
            ? document.data.image.url ?? null
            : null,

          /* ================================
             Title
          ================================= */

          title:
            typeof document.data.title === "string"
              ? document.data.title
              : prismic.asText(document.data.title) ||
              "Untitled Community",

          /* ================================
             Description
          ================================= */

          description:
            prismic.asText(document.data.description) || "",

          /* ================================
             WhatsApp Group Name
          ================================= */

          name: prismic.asText(document.data.name) || "",

          /* ================================
             Point of Contact
          ================================= */

          poc:
            document.data.poc !== null &&
              document.data.poc !== undefined
              ? String(document.data.poc)
              : "",

          /* ================================
             WhatsApp / Community Link
          ================================= */

          link: prismic.isFilled.link(document.data.link)
            ? document.data.link.url ?? null
            : null,
        }));

        setCommunities(data);
      } catch (err) {
        console.error("Failed to fetch communities:", err);
        setError("Unable to load communities.");
      } finally {
        setLoading(false);
      }
    }

    fetchCommunities();
  }, []);

  /* ================================
     Loading
  ================================= */

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-96 animate-pulse rounded-2xl bg-neutral-200"
            />
          ))}
        </div>
      </section>
    );
  }

  /* ================================
     Error
  ================================= */

  if (error) {
    return (
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="text-lg font-semibold text-red-800">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  /* ================================
     Empty
  ================================= */

  if (communities.length === 0) {
    return (
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">
          <h2 className="text-xl font-semibold text-neutral-900">
            No communities found
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Publish a community from Prismic to display it here.
          </p>
        </div>
      </section>
    );
  }

  /* ================================
     Main UI
  ================================= */

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {communities.map((community) => (
          <article
            key={community.id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl"
          >
            {/* ================================
                Community / WhatsApp Group Image
            ================================= */}

            <div className="relative h-52 w-full overflow-hidden bg-neutral-100">
              {community.image ? (
                <Image
                  src={community.image}
                  alt={community.name || community.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-5xl font-bold text-white">
                  {community.title?.charAt(0)?.toUpperCase() || "C"}
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col p-6">
              {/* UID */}


              {/* Community Title */}

              <h2 className="text-xl font-bold tracking-tight text-neutral-900">
                {community.title}
              </h2>

              {/* WhatsApp Group Name */}



              {/* Description */}

              {community.description && (
                <p className="mt-4  text-sm leading-6 text-neutral-600">
                  {community.description}
                </p>
              )}

              {/* POC */}

              {community.poc && (
                <div className="mt-6 rounded-xl bg-neutral-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    Point of Contact
                  </p>

                  <p className="mt-1 text-sm font-medium text-neutral-800">
                    {community.poc} - {community.name}
                  </p>
                  <div>
                   
                  </div>
                </div>
              )}

              {/* Link */}

              <div className="mt-auto pt-6">
                {community.link ? (
                  <Link
                    href={community.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
                  >
                    Join Community

                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                ) : (
                  <span className="flex w-full items-center justify-center rounded-xl bg-neutral-100 px-4 py-3 text-sm font-semibold text-neutral-400">
                    Link unavailable
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}