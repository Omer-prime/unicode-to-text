"use client";

import { FormEvent, useState } from "react";

type Mode = "decode" | "encode";
type EncodeFormat = "js" | "html" | "uplus";

type ApiResult = {
  decoded: string;
  steps: string[];
  error?: string;
};

export default function HomePage() {
  const [mode, setMode] = useState<Mode>("decode");
  const [encodeFormat, setEncodeFormat] = useState<EncodeFormat>("js");

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCopied(false);

    try {
      const res = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input,
          mode,
          format: mode === "encode" ? encodeFormat : undefined,
        }),
      });

      const data: ApiResult | { error: string } = await res.json();

      if (!res.ok) {
        throw new Error((data as any).error ?? "Conversion failed.");
      }

      setOutput((data as ApiResult).decoded);
      setSteps((data as ApiResult).steps ?? []);
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong.");
      setOutput("");
      setSteps([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  function resetState() {
    setOutput("");
    setSteps([]);
    setError(null);
    setCopied(false);
  }

  function setSample(value: string) {
    setInput(value);
    resetState();
  }

  function handleModeChange(nextMode: Mode) {
    if (nextMode === mode) return;
    setMode(nextMode);
    resetState();
    // You can also clear input when switching mode if you prefer:
    // setInput("");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl space-y-6">
        {/* Top bar */}
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-medium text-sky-700">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              {mode === "decode"
                ? "Unicode → Text Converter"
                : "Text → Unicode Converter"}
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Convert between Unicode and normal text in one place.
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Switch between Unicode → Text for decoding and Text → Unicode for
              encoding. Simple, fast and free for developers, students and
              content creators.
            </p>
          </div>

          <div className="text-right space-y-1 text-[11px] sm:text-xs text-slate-500">
            <p className="font-medium text-slate-800">Advistors Tools</p>
            <p>Built with Next.js &amp; Tailwind</p>
          </div>
        </header>

        {/* Main card */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-lg px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          {/* Mode switch + format info */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            {/* Mode toggle */}
            <div className="inline-flex rounded-full bg-slate-100 p-1 text-[11px]">
              <button
                type="button"
                onClick={() => handleModeChange("decode")}
                className={`px-3 py-1.5 rounded-full font-medium transition ${
                  mode === "decode"
                    ? "bg-white text-sky-700 shadow-sm border border-sky-100"
                    : "text-slate-600 hover:text-sky-700"
                }`}
              >
                Unicode → Text
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("encode")}
                className={`px-3 py-1.5 rounded-full font-medium transition ${
                  mode === "encode"
                    ? "bg-white text-sky-700 shadow-sm border border-sky-100"
                    : "text-slate-600 hover:text-sky-700"
                }`}
              >
                Text → Unicode
              </button>
            </div>

            {/* Encode format hint */}
            {mode === "encode" && (
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                <span className="font-medium">Output format:</span>
                <button
                  type="button"
                  onClick={() => {
                    setEncodeFormat("js");
                    resetState();
                  }}
                  className={`rounded-full px-2.5 py-1 border text-[11px] transition ${
                    encodeFormat === "js"
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-slate-200 bg-white hover:border-sky-400"
                  }`}
                >
                  JS \uXXXX
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEncodeFormat("html");
                    resetState();
                  }}
                  className={`rounded-full px-2.5 py-1 border text-[11px] transition ${
                    encodeFormat === "html"
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-slate-200 bg-white hover:border-sky-400"
                  }`}
                >
                  HTML &#xXXXX;
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEncodeFormat("uplus");
                    resetState();
                  }}
                  className={`rounded-full px-2.5 py-1 border text-[11px] transition ${
                    encodeFormat === "uplus"
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-slate-200 bg-white hover:border-sky-400"
                  }`}
                >
                  U+XXXX
                </button>
              </div>
            )}
          </div>

          {/* Sample chips */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs mb-5">
            <span className="text-slate-500 mr-1">Quick samples:</span>

            {mode === "decode" ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setSample("\\u0627\\u0644\\u0633\\u0644\\u0627\\u0645")
                  }
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 hover:border-sky-400 hover:bg-sky-50 text-slate-800 transition"
                >
                  JS: \u0627\u0644\u0633\u0644\u0627\u0645
                </button>
                <button
                  type="button"
                  onClick={() => setSample("&#x1F600; &#128512;")}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 hover:border-sky-400 hover:bg-sky-50 text-slate-800 transition"
                >
                  HTML: &#x1F600;
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSample("U+0627 U+0644 U+0633 U+0644 U+0627 U+0645")
                  }
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 hover:border-sky-400 hover:bg-sky-50 text-slate-800 transition"
                >
                  Code points: U+0627…
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSample(
                      "%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85"
                    )
                  }
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 hover:border-sky-400 hover:bg-sky-50 text-slate-800 transition"
                >
                  URL encoded
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setSample("السلام عليكم")}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 hover:border-sky-400 hover:bg-sky-50 text-slate-800 transition"
                >
                  السلام عليكم
                </button>
                <button
                  type="button"
                  onClick={() => setSample("Hello 😊")}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 hover:border-sky-400 hover:bg-sky-50 text-slate-800 transition"
                >
                  Hello 😊
                </button>
                <button
                  type="button"
                  onClick={() => setSample("Advistors Tools")}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 hover:border-sky-400 hover:bg-sky-50 text-slate-800 transition"
                >
                  Advistors Tools
                </button>
              </>
            )}
          </div>

          {/* Form + result */}
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]"
          >
            {/* Input side */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-800">
                    {mode === "decode" ? "Unicode input" : "Plain text input"}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {mode === "decode"
                      ? "Paste any escaped string. We try multiple decoding methods in one go."
                      : "Type or paste normal text. We will convert it into Unicode escapes in the format you select."}
                  </p>
                </div>
                {input && (
                  <button
                    type="button"
                    onClick={() => {
                      setInput("");
                      resetState();
                    }}
                    className="text-[11px] text-slate-500 hover:text-slate-800"
                  >
                    Clear
                  </button>
                )}
              </div>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[190px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/70 resize-y placeholder:text-slate-400"
                placeholder={
                  mode === "decode"
                    ? `Examples:
\\u0627\\u0644\\u0633\\u0644\\u0627\\u0645
&#x1F600; or &#128512;
U+0627 U+0644 U+0633...
%D8%A7%D9%84... (URL encoded)
`
                    : `Example text:
السلام عليكم
Hello 😊
Any normal text you want to encode…
`
                }
              />

              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-400/40 hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                {loading
                  ? "Converting…"
                  : mode === "decode"
                  ? "Convert Unicode to text"
                  : "Convert text to Unicode"}
              </button>

              <p className="text-[11px] text-slate-500">
                All processing happens in real time. We don’t store your data.
              </p>
            </div>

            {/* Output side */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-800">
                  {mode === "decode" ? "Decoded text" : "Encoded Unicode output"}
                </p>
                {output && (
                  <span className="text-[11px] text-slate-500">
                    Length: {output.length} characters
                  </span>
                )}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 space-y-2">
                <textarea
                  readOnly
                  value={output}
                  className="min-h-[150px] w-full rounded-xl bg-transparent text-sm outline-none resize-y font-mono"
                  placeholder={
                    mode === "decode"
                      ? "Your clean, readable text will appear here."
                      : "Your encoded Unicode string will appear here."
                  }
                />
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={!output}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium hover:border-sky-400 hover:bg-sky-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    {copied ? "Copied ✓" : "Copy output"}
                  </button>
                  {steps.length > 0 && (
                    <span className="text-[11px] text-slate-500">
                      {steps.length} step{steps.length > 1 ? "s" : ""} applied
                    </span>
                  )}
                </div>
              </div>

              {/* Error / Steps */}
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-700">
                  {error}
                </div>
              )}

              {steps.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                  <p className="text-[11px] font-semibold text-slate-800 mb-1.5">
                    What we did:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600">
                    {steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Supported formats / info */}
        <section className="grid gap-4 sm:grid-cols-2 text-[11px] sm:text-xs text-slate-600">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <h2 className="text-xs font-semibold text-slate-800 mb-1.5">
              Unicode → Text (decode)
            </h2>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                JavaScript Unicode escapes:{" "}
                <code className="font-mono text-sky-700">
                  {"\\u0627\\u0644\\u0633\\u0644\\u0627\\u0645"}
                </code>{" "}
                or{" "}
                <code className="font-mono text-sky-700">
                  {"\\u{1F600}"}
                </code>
              </li>
              <li>
                HTML numeric entities:{" "}
                <code className="font-mono text-sky-700">&#x1F600;</code>,{" "}
                <code className="font-mono text-sky-700">&#128512;</code>
              </li>
              <li>
                Code points:{" "}
                <code className="font-mono text-sky-700">
                  U+0627 U+0644 U+0633…
                </code>
              </li>
              <li>
                URL encoded:{" "}
                <code className="font-mono text-sky-700">
                  %D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85
                </code>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <h2 className="text-xs font-semibold text-slate-800 mb-1.5">
              Text → Unicode (encode)
            </h2>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                <span className="font-medium">JS \uXXXX:</span> great for
                JavaScript/TypeScript or JSON strings.
              </li>
              <li>
                <span className="font-medium">HTML &#xXXXX;:</span> useful for
                HTML templates and emails.
              </li>
              <li>
                <span className="font-medium">U+XXXX:</span> ideal for
                documentation and specs.
              </li>
              <li>
                Switch modes any time at the top of the card to decode or
                encode as needed.
              </li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 pt-1">
          <span>Unicode &amp; Text Converter</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>
    </div>
  );
}
