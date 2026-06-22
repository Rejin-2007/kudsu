import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import Link from "next/link";

export default async function MembersPage() {
    const client = createClient();

    // Fetching all entries of custom type "Members"
    const members = await client.getAllByType("members", {
        // Using an array of objects allows for multi-level chaining/sorting
        orderings: [
            {
                field: "document.data.position_number",
                direction: "asc",
            },
            // TIE-BREAKER: If position_number matches, sort by oldest creation date first
            {
                field: "document.first_publication_date",
                direction: "asc",
            }
        ],
    });

    return (
        <section className="bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Optional Header Section */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl uppercase">
                        Our Team
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-400 sm:mt-4">
                        Meet the dedicated members of our organization.
                    </p>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {members.map((member) => (
                        <div
                            key={member.id}
                            className="group flex flex-col overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/5"
                        >
                            {/* Image Wrapper with Aspect Ratio */}
                            <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-800">
                                {member.data.image && (
                                    <PrismicNextImage
                                        field={member.data.image}
                                        fallbackAlt=""
                                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}
                            </div>

                            {/* Content Details */}
                            <div className="flex flex-1 flex-col p-6">
                                <div className="flex-1">
                                    {/* Member Name */}
                                    <PrismicRichText
                                        field={member.data.name}
                                        components={{
                                            heading4: ({ children }) => (
                                                <h4 className="text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-amber-300 line-clamp-1 uppercase">
                                                    {children}
                                                </h4>
                                            )
                                        }}
                                    />

                                    {/* Member Position */}
                                    <PrismicRichText
                                        field={member.data.position}
                                        components={{
                                            paragraph: ({ children }) => (
                                                <p className="mt-1 text-sm font-medium tracking-wide text-amber-400/90 uppercase">
                                                    {children}
                                                </p>
                                            )
                                        }}
                                    />
                                </div>

                                {/* Divider line inside the card */}
                                <div className="my-4 border-t border-slate-800 group-hover:border-slate-700 transition-colors" />

                                {/* Contact Details */}
                                <PrismicRichText
                                    field={member.data.contact_details}
                                    components={{
                                        paragraph: ({ children }) => (
                                            <p className="text-xs text-slate-400 line-clamp-2 hover:text-slate-300 transition-colors">
                                                {children}
                                            </p>
                                        )
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}