import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Footer Content */}
        <div className="flex flex-col items-center justify-center gap-4 text-center">

          <h3 className="text-2xl font-bold text-white tracking-wide">
            Thank You for Visiting
          </h3>

          <p className="max-w-2xl text-sm leading-7 text-slate-400">
            Stay connected with the University Digital Platform for the latest
            updates, events, magazines, announcements, and student activities.
          </p>

        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-linear-to-r from-transparent via-slate-700 to-transparent" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Digital Student Union. All rights reserved.
          </p>

          <p className="text-sm text-slate-400">
            Designed &amp; Developed by{" "}
            <Link
              href="https://browzess.com"
              target="_blank"
              className="font-semibold text-yellow-400 transition-colors duration-300 hover:text-yellow-300"
            >
              Browzess
            </Link>
          </p>

        </div>
      </div>
    </footer>
  );
}