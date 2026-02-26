export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-[11px] font-medium text-sky-700 border border-sky-100">
          Privacy
        </span>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          We respect your privacy. This page explains what information we
          collect when you use (your name )s Tools and how we use it.
        </p>
      </div>

      {/* Content card */}
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-6 space-y-4 text-sm text-slate-600">
        <section className="space-y-1.5">
          <h2 className="text-base font-semibold text-slate-800">Data you enter</h2>
          <p>
            The text you paste into the Unicode to Text Converter is processed
            only to show the result back to you. We do not use this text to
            identify you or to build a profile. We do not share this content
            with third parties.
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-base font-semibold text-slate-800">
            Logs and analytics
          </h2>
          <p>
            Like most websites, we may use basic analytics tools (for example
            Google Analytics) to understand how many people use the site and
            which pages they visit. These tools collect technical information
            such as browser type, device type and approximate location. They do
            not collect the actual text you paste into the converter.
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-base font-semibold text-slate-800">
            Cookies and advertising
          </h2>
          <p>
            If we show advertising (for example Google AdSense), cookies may be
            used by the ad networks to serve and measure ads. You can manage
            cookies through your browser settings. The way Google uses data from
            its partners is described in Google&apos;s own privacy policy.
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-base font-semibold text-slate-800">
            Data retention
          </h2>
          <p>
            We do not intentionally store the text you convert using the tool.
            Server logs and analytics data are kept only for as long as needed
            for security, troubleshooting and usage reporting.
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-base font-semibold text-slate-800">
            Changes to this policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we
            will change the date at the top of this page and, where appropriate,
            provide additional notice.
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-base font-semibold text-slate-800">Contact</h2>
          <p>
            If you have any questions about this policy, please contact us at
            @gmail.com(replace with your real email address).
          </p>
        </section>
      </div>
    </div>
  );
}
