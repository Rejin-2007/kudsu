export default function MagazinePage() {
  return (
    <section className="bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-white uppercase">
            Magazine
          </h2>

          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
            Explore our digital magazine featuring articles, campus stories,
            interviews, research, achievements, and more.
          </p>
        </div>

        {/* Full Width Preview */}
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">

          {/* Browser Bar */}
          <div className="flex items-center gap-2 border-b border-slate-800 px-6 py-4">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />

            <span className="ml-4 text-sm text-slate-400">
              https://magazine-pied.vercel.app
            </span>
          </div>

          {/* Scrollable iframe */}
          <div className="h-225 overflow-y-auto">
            <iframe
              src="https://magazine-pied.vercel.app/"
              title="Magazine Preview"
              className="w-full h-625 border-0"
              loading="lazy"
            />
          </div>

        </div>

      </div>
    </section>
  );
}