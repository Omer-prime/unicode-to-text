export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      {/* Page header */}
      <div className="space-y-2">
        <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-[11px] font-medium text-sky-700 border border-sky-100">
          About
        </span>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          About (your name ) Tools
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          (your name ) Tools is a small collection of focused, easy-to-use online
          utilities. Our goal is to save you a few minutes every time you work
          with text, code or data.
        </p>
      </div>

      {/* Main content */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
        {/* Story */}
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-6 space-y-3">
          <h2 className="text-base font-semibold text-slate-800">
            Why we built this
          </h2>
          <p className="text-sm text-slate-600">
            The first tool in this project is the Unicode to Text Converter. It
            helps developers, students and content creators decode messy
            Unicode, HTML entities and URL-encoded strings into clean, readable
            text.
          </p>
          <p className="text-sm text-slate-600">
            We keep the experience intentionally simple: no login, no complex
            dashboards, just paste → convert → copy. Everything is fast and
            focused on one job at a time.
          </p>
          <p className="text-sm text-slate-600">
            Over time we plan to add more helpers such as Text to Unicode, URL
            encoder / decoder, slug generator and other small tools that fit
            nicely together under the Advistors Tools brand.
          </p>
        </div>

        {/* At a glance / side card */}
        <aside className="rounded-3xl border border-slate-200 bg-white px-6 py-6 space-y-4">
          <h2 className="text-base font-semibold text-slate-800">
            At a glance
          </h2>
          <dl className="space-y-2 text-sm text-slate-600">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Brand</dt>
              <dd className="font-medium text-slate-800 text-right">
                (your name )Tools
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">First tool</dt>
              <dd className="font-medium text-slate-800 text-right">
                Unicode → Text Converter
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Built with</dt>
              <dd className="font-medium text-slate-800 text-right">
                Next.js · TypeScript · Tailwind
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Focus</dt>
              <dd className="font-medium text-slate-800 text-right">
                Fast, clean, ad-supported utilities
              </dd>
            </div>
          </dl>
          <p className="text-xs text-slate-500">
            If you have ideas for new tools you would like to see here, feel
            free to reach out on the contact page.
          </p>
        </aside>
      </div>
    </div>
  );
}
