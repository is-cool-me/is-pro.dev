import { readFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = process.env.SITE_ROOT || join(__dirname, "..", "..");
const SCREENSHOT_DIR = join(OUT_DIR, "showcase", "screenshots");

async function main() {
  const showcasePath = process.env.SHOWCASE_PATH || join(__dirname, "..", "..", "..", "dash", "data", "showcase.json");
  const dbPath = process.env.DB_PATH || "";

  const seen = new Set();
  const domains = [];

  if (existsSync(showcasePath)) {
    const enriched = JSON.parse(readFileSync(showcasePath, "utf-8"))
      .filter((d) => d.subdomain && d.zone)
      .filter((d) => d.safety_status !== "malicious");
    for (const d of enriched) {
      seen.add(`${d.subdomain}:${d.zone}`);
      domains.push(d);
    }
    console.log(`[screenshot] ${enriched.length} enriched entries`);
  }

  // Also screenshot projects from the DB that have showcase pages
  if (dbPath && existsSync(dbPath)) {
    const { default: Database } = await import("better-sqlite3");
    const db = new Database(dbPath);
    const rows = db.prepare("SELECT subdomain, zone FROM domains WHERE subdomain IS NOT NULL AND zone IS NOT NULL").all();
    db.close();
    let added = 0;
    for (const row of rows) {
      const key = `${row.subdomain}:${row.zone}`;
      if (!seen.has(key)) {
        seen.add(key);
        domains.push({ subdomain: row.subdomain, zone: row.zone, safety_status: "unknown" });
        added++;
      }
    }
    if (added > 0) console.log(`[screenshot] +${added} from database`);
  }

  if (domains.length === 0) {
    console.log("[screenshot] No domains to screenshot");
    process.exit(0);
  }

  mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const { chromium } = await import("playwright");
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let taken = 0;
  let errors = 0;

  for (const d of domains) {
    const host = `${d.subdomain}.${d.zone}`;
    const url = `https://${host}`;
    const filename = `${d.subdomain}.${d.zone}.jpg`;
    const filePath = join(SCREENSHOT_DIR, filename);

    if (existsSync(filePath)) {
      continue;
    }

    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
    });
    const page = await context.newPage();

    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });
      await page.screenshot({ path: filePath, type: "jpeg", quality: 70 });
      taken++;
    } catch {
      errors++;
    } finally {
      await page.close();
      await context.close();
    }
  }

  await browser.close();
  console.log(`[screenshot] ${taken} new, ${errors} errors`);
}

main().catch((err) => {
  console.error("[screenshot] Fatal:", err);
  process.exit(1);
});
