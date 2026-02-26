export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-[11px] font-medium text-sky-700 border border-sky-100">
          Contact
        </span>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Get in touch
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Found a bug, have a feature request, or want to collaborate? Use the
          details below and we&apos;ll get back to you as soon as we can.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)]">
        {/* Contact details */}
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-6 space-y-3">
          <h2 className="text-base font-semibold text-slate-800">
            Contact details
          </h2>
          <p className="text-sm text-slate-600">
            You can reach the (your name) team using the information below. Please
            update these placeholders with your real details before going live.
          </p>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>
              <span className="font-medium">Email:</span>{" "}
              support@advistors.co.uk
            </li>
            <li>
              <span className="font-medium">Website:</span> advistors.co.uk
            </li>
          </ul>
          <p className="text-xs text-slate-500">
            For general questions about how the tools work, you can also check
            the About page. For legal or privacy questions, please read our
            Privacy Policy and Terms of Use.
          </p>
        </div>

        {/* Side notes / FAQ */}
        <aside className="rounded-3xl border border-slate-200 bg-white px-6 py-6 space-y-3">
          <h2 className="text-base font-semibold text-slate-800">
            Before you contact us
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-600">
            <li>
              If something does not convert correctly, include a small example
              of the text you are using.
            </li>
            <li>
              If you have an idea for a new tool, tell us briefly what problem
              it should solve.
            </li>
            <li>
              We currently respond in English. Please allow a little time for a
              reply, especially on weekends.
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
