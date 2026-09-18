// Fetches the source .ics schedule and keeps only events whose SUMMARY
// matches one of the entries in KEEP_SUMMARIES, then writes the result
// to docs/filtered.ics so GitHub Pages can serve it as a static file.

import fs from "node:fs";

const SOURCE_URL =
    process.env.SOURCE_URL ||
    "https://edt-consult.univ-eiffel.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=5943&projectId=2&calType=ical&nbWeeks=100&displayConfigId=8";

// Add more entries here (separated by "|") to keep more than one class.
// Must match the SUMMARY text exactly as it appears in the source ICS.
const KEEP_SUMMARIES = (
    process.env.KEEP_SUMMARIES || "Mathématiques 1 - SOUTIEN"
)
    .split("|")
    .map((s) => s.trim());

function unfold(text) {
    return text.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "");
}

async function main() {
    const res = await fetch(SOURCE_URL);
    if (!res.ok) throw new Error(`Fetch failed: HTTP ${res.status}`);
    const text = await res.text();

    const unfolded = unfold(text);
    const blocks = unfolded.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) || [];

    const kept = blocks.filter((block) => {
        const m = block.match(/^SUMMARY:(.*)$/m);
        const summary = m ? m[1].trim() : "";
        return KEEP_SUMMARIES.includes(summary);
    });

    if (kept.length === 0) {
        console.warn(
            "Warning: no events matched KEEP_SUMMARIES. Check the exact SUMMARY text in the source calendar.",
        );
    }

    const output = [
        "BEGIN:VCALENDAR",
        "PRODID:-//ICS Filter//EN",
        "VERSION:2.0",
        "CALSCALE:GREGORIAN",
        ...kept,
        "END:VCALENDAR",
    ].join("\n");

    fs.mkdirSync("docs", { recursive: true });
    fs.writeFileSync("docs/filtered.ics", output);
    console.log(`Wrote ${kept.length} events to docs/filtered.ics`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
