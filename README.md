A small web tool that converts between Unicode and normal text.

You can:

- **Decode** messy strings like `\u0627\u0644\u0633...`, `&#x1F600;`, `U+0627`, or URL-encoded text into clean, readable text.
- **Encode** normal text (e.g. `السلام عليكم`, `Hello 😊`) into:
  - JavaScript `\uXXXX` / `\u{1F600}` escapes
  - HTML `&#xXXXX;` entities
  - `U+XXXX` code point format

Built with **Next.js** and **Tailwind CSS**, with a simple API route and no database.

---

## Features

- **Two modes in one tool**
  - Unicode → Text (decode)
  - Text → Unicode (encode)

- **Supported input formats (decode mode)**
  - JavaScript Unicode escapes: `\u0627\u0644\u0633\u0644\u0627\u0645`, `\u{1F600}`
  - HTML numeric entities: `&#x1F600;`, `&#128512;`
  - Code points: `U+0627 U+0644 U+0633…`
  - URL encoded strings: `%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85...`

- **Supported output formats (encode mode)**
  - JS Unicode: `\u0627\u0644\u0633\u0644\u0627\u0645`, `\u{1F600}`
  - HTML hex entities: `&#x0627;`, `&#x1F600;`
  - U+ notation: `U+0627 U+0644 U+0633…`

- **Nice UI**
  - Mode toggle (Unicode → Text / Text → Unicode)
  - Format buttons for encode mode (JS / HTML / U+)
  - Copy output button
  - Small “what we did” steps log from the API

---

## Tech Stack

- [Next.js (App Router)](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

No database is used. All conversion is done in memory.

---

## Getting Started

### 1. Install dependencies

bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
2. Run the development server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

Then open:

http://localhost:3000

in your browser.

Project Structure (main parts)
src/
  app/
    page.tsx              # Main UI for the Unicode ⇄ Text tool (client component)
    layout.tsx            # Global layout, navbar, footer, metadata
    api/
      convert/
        route.ts          # API route for encode/decode logic (POST /api/convert)
  lib/
    unicodeConverter.ts   # decodeUnicode helper used in the API (Unicode → Text)

    The UI in page.tsx calls /api/convert with:

input: string to convert

mode: "decode" | "encode"

format: "js" | "html" | "uplus" (only for encode mode)

API
POST /api/convert

Request body:

{
  "input": "string",
  "mode": "decode | encode",
  "format": "js | html | uplus"
}

mode

"decode" → Unicode → Text (uses decodeUnicode)

"encode" → Text → Unicode (server builds encoded string)

If mode is not sent, it defaults to "decode".

format (only used when mode = "encode")

"js" → returns JS \uXXXX / \u{XXXX} escapes

"html" → returns HTML &#xXXXX; entities

"uplus" → returns U+XXXX code points

Response body:

{
  "decoded": "result string",
  "steps": ["What the converter did in plain language"]
}

If something goes wrong:

{
  "error": "Error message here"
}

with an appropriate HTTP status code.

Deployment

You can deploy this app to any platform that supports Next.js, for example:

Vercel

Your own Node.js server / VPS

No database or external services are required for the converter to work.

Notes

This tool is focused on text conversion only.

No user data is stored; input is processed in memory and returned in the response.

The UI is designed so it can be extended later (more tools, blog, CMS-powered content, etc.).
