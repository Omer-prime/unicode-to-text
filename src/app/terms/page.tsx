export default function TermsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-[11px] font-medium text-sky-700 border border-sky-100">
          Terms
        </span>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Terms of Use
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          By using (your name ) Tools, including the Unicode to Text Converter,
          you agree to the simple terms below.
        </p>
      </div>

      {/* Content card */}
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-6 space-y-4 text-sm text-slate-600">
        <section className="space-y-1.5">
          <h2 className="text-base font-semibold text-slate-800">
            Use at your own risk
          </h2>
          <p>
            We try to keep the tools accurate and available, but we do not
            provide any guarantee. You are responsible for how you use the
            results in your own projects or business.
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-base font-semibold text-slate-800">
            Acceptable use
          </h2>
          <p>
            You agree not to use the tools to store or share illegal, harmful or
            abusive content, and not to interfere with the normal operation of
            the website or other users&apos; access to it.
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-base font-semibold text-slate-800">
            Intellectual property
          </h2>
          <p>
            The (your name ) Tools brand, design and source code are owned by the
            (your name ) team or our licensors. You may not copy or reuse the
            service design in a way that could confuse users about the owner of
            this site.
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-base font-semibold text-slate-800">
            Changes to the service
          </h2>
          <p>
            We may update, pause or remove tools at any time, with or without
            notice. The service is provided on an &quot;as is&quot; and
            &quot;as available&quot; basis.
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-base font-semibold text-slate-800">Contact</h2>
          <p>
            If you have questions about these terms, please contact us at
         @gmail.com (replace with your real email).
          </p>
        </section>
      </div>
    </div>
  );
}
