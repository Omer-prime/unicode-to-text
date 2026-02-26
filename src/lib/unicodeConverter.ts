// src/lib/unicodeConverter.ts
export type DecodeResult = {
  decoded: string;
  steps: string[];
};

export function decodeUnicode(input: string): DecodeResult {
  let output = input;
  const steps: string[] = [];

  // 1) JavaScript Unicode escapes: \uXXXX and \u{XXXXXX}
  let hadJsMatch = false;
  const jsUnicodeRegex = /\\u\{([0-9a-fA-F]+)\}|\\u([0-9a-fA-F]{4})/g;

  output = output.replace(jsUnicodeRegex, (match, codePoint1, codePoint2) => {
    hadJsMatch = true;
    const codePointStr: string = codePoint1 || codePoint2;
    const codePoint = parseInt(codePointStr, 16);

    if (Number.isNaN(codePoint)) return match;

    try {
      return String.fromCodePoint(codePoint);
    } catch {
      return match;
    }
  });

  if (hadJsMatch) {
    steps.push("Decoded JavaScript \\uXXXX / \\u{XXXX} escapes.");
  }

  // 2) HTML numeric entities: &#xXXXX; and &#1234;
  let hadHtmlMatch = false;
  const htmlRegex = /&#x([0-9a-fA-F]+);|&#([0-9]+);/g;

  output = output.replace(htmlRegex, (match, hex, dec) => {
    hadHtmlMatch = true;
    const codePoint = hex ? parseInt(hex, 16) : parseInt(dec, 10);

    if (Number.isNaN(codePoint)) return match;

    try {
      return String.fromCodePoint(codePoint);
    } catch {
      return match;
    }
  });

  if (hadHtmlMatch) {
    steps.push("Decoded HTML numeric character references.");
  }

  // 3) U+XXXX style code points: U+0627 U+0644
  let hadUPlusMatch = false;
  const uPlusRegex = /U\+([0-9a-fA-F]{4,6})/g;

  output = output.replace(uPlusRegex, (match, hex) => {
    hadUPlusMatch = true;
    const codePoint = parseInt(hex, 16);

    if (Number.isNaN(codePoint)) return match;

    try {
      return String.fromCodePoint(codePoint);
    } catch {
      return match;
    }
  });

  if (hadUPlusMatch) {
    steps.push("Decoded U+XXXX style code points.");
  }

  // 4) URL percent-encoding: %D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85
  try {
    const decodedUrl = decodeURIComponent(output);
    if (decodedUrl !== output) {
      output = decodedUrl;
      steps.push("Decoded URL percent-encoding.");
    }
  } catch {
    // ignore invalid URI sequences
  }

  return { decoded: output, steps };
}
