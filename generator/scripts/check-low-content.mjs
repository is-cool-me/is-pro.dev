import { GUIDE_TOPICS, BLOG_TOPICS } from './content/topics.js';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const SITE_ROOT = '/home/ubuntu/is-pro.dev';

function getArticleWordCount(html) {
  const m = html.match(/<div class="article-content prose">(.*?)<\/article>/s);
  if (m) {
    const text = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return text.split(/\s+/).filter(Boolean).length;
  }
  return 0;
}

const THRESHOLD = 1000;
let count = 0;

for (const t of GUIDE_TOPICS) {
  const fp = join(SITE_ROOT, 'guides', t.slug, 'index.html');
  if (!existsSync(fp)) continue;
  const html = readFileSync(fp, 'utf-8');
  const wc = getArticleWordCount(html);
  if (wc < THRESHOLD) {
    console.log(`guide/${t.slug}: ${wc} words`);
    count++;
  }
}

for (const t of BLOG_TOPICS) {
  const fp = join(SITE_ROOT, 'blog', t.slug, 'index.html');
  if (!existsSync(fp)) continue;
  const html = readFileSync(fp, 'utf-8');
  const wc = getArticleWordCount(html);
  if (wc < THRESHOLD) {
    console.log(`blog/${t.slug}: ${wc} words`);
    count++;
  }
}

console.log(`\nTotal pages under 1000 words: ${count}`);