// src/app/api/convert/route.ts
import { NextRequest, NextResponse } from "next/server";
import { decodeUnicode } from "@/lib/unicodeConverter";

type EncodeFormat = "js" | "html" | "uplus";

function encodeText(
  input: string,
  format: EncodeFormat
): { decoded: string; steps: string[] } {
  const chars = Array.from(input);
  const pieces: string[] = [];

  for (const ch of chars) {
    const cp = ch.codePointAt(0);
    if (cp === undefined) continue;

    if (format === "js") {
      // JavaScript Unicode escapes
      if (cp <= 0xffff) {
        pieces.push(`\\u${cp.toString(16).padStart(4, "0")}`);
      } else {
        // Use \u{1F600} style for higher code points
        pieces.push(`\\u{${cp.toString(16)}}`);
      }
    } else if (format === "html") {
      // HTML hex entities: &#xXXXX;
      pieces.push(`&#x${cp.toString(16).toUpperCase()};`);
    } else {
      // U+XXXX notation
      pieces.push(`U+${cp.toString(16).toUpperCase()}`);
    }
  }

  let encoded: string;
  if (format === "js") {
    encoded = pieces.join(""); // no spaces for JS escapes
  } else {
    encoded = pieces.join(" "); // space-separated for readability
  }

  let label: string;
  if (format === "js") {
    label = "JavaScript \\uXXXX / \\u{XXXX} escapes";
  } else if (format === "html") {
    label = "HTML hexadecimal entities (&#xXXXX;)";
  } else {
    label = "U+XXXX code point notation";
  }

  return {
    decoded: encoded,
    steps: [`Encoded text into ${label}.`],
  };
}

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: 'Body must contain an "input" string.' },
      { status: 400 }
    );
  }

  const { input, mode, format } = body as {
    input?: unknown;
    mode?: "decode" | "encode";
    format?: EncodeFormat;
  };

  if (typeof input !== "string") {
    return NextResponse.json(
      { error: 'Body must contain an "input" string.' },
      { status: 400 }
    );
  }

  // Default mode is "decode" to stay backward compatible
  const effectiveMode: "decode" | "encode" = mode === "encode" ? "encode" : "decode";

  if (effectiveMode === "encode") {
    const encodeFormat: EncodeFormat =
      format === "html" || format === "uplus" ? format : "js";
    const result = encodeText(input, encodeFormat);
    return NextResponse.json(result);
  }

  // Unicode → Text (existing behavior)
  const result = decodeUnicode(input);
  return NextResponse.json(result);
}
