import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

const RAW_KEYS = (process.env.GROQ_API_KEY || '').split(',').map(s => s.trim()).filter(Boolean);
const RAW_PROXIES = (process.env.GROQ_PROXIES || '').split(',').map(s => s.trim()).filter(Boolean);
const PROXY_AUTH = process.env.GROQ_PROXY_AUTH || '';

const keys = RAW_KEYS.length > 0 ? RAW_KEYS : null;
const proxies = RAW_PROXIES.length > 0 ? RAW_PROXIES : null;

const GROQ_BASE_URL = 'https://api.groq.com/openai/v1';
const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
const INFERENCE_TIMEOUT = 120000;
const TPM_LIMIT = parseInt(process.env.GROQ_TPM_LIMIT || '12000', 10);
const MAX_RETRIES = 3;

let keyCursor = 0;
let proxyCursor = 0;
const tokenWindow = [];

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function getAgent(spec) {
  if (!spec) return undefined;
  const url = spec.includes('@')
    ? `http://${spec}`
    : `http://${PROXY_AUTH}@${spec}`;
  return new HttpsProxyAgent(url);
}

async function waitForTokenBudget(estimatedTokens) {
  const now = Date.now();
  while (tokenWindow.length > 0 && tokenWindow[0].ts < now - 60000) {
    tokenWindow.shift();
  }
  const used = tokenWindow.reduce((sum, e) => sum + e.tokens, 0);
  if (used + estimatedTokens > TPM_LIMIT) {
    const oldest = tokenWindow[0]?.ts ?? now;
    const wait = 60000 - (now - oldest) + 100;
    console.warn(`[groq] TPM limit (${used}/${TPM_LIMIT}) — waiting ${Math.ceil(wait / 1000)}s`);
    await sleep(wait);
    return waitForTokenBudget(estimatedTokens);
  }
}

export async function isGroqAvailable() {
  const key = keys ? keys[0] : process.env.GROQ_API_KEY;
  if (!key) return false;
  try {
    const agent = proxies ? getAgent(proxies[0]) : undefined;
    const opts = {
      headers: { Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(5000)
    };
    if (agent) opts.agent = agent;
    const res = await fetch(`${GROQ_BASE_URL}/models`, opts);
    return res.ok;
  } catch {
    return false;
  }
}

export async function generateWithGroq(prompt, systemPrompt = '', maxTokens = 1200) {
  const messages = [
    ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
    { role: 'user', content: prompt }
  ];

  const payload = {
    model: MODEL,
    messages,
    temperature: 0.7,
    max_tokens: maxTokens,
    top_p: 0.9
  };

  let rateLimitedCount = 0;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      const backoff = Math.min(1000 * Math.pow(2, attempt - 1), 30000);
      console.warn(`[groq] Retry ${attempt}/${MAX_RETRIES} in ${backoff}ms`);
      await sleep(backoff);
    }

    await waitForTokenBudget(maxTokens);

    const currentKey = keys ? keys[keyCursor % keys.length] : process.env.GROQ_API_KEY;
    const currentProxy = proxies ? proxies[proxyCursor % proxies.length] : null;
    if (keys) keyCursor++;
    if (proxies) proxyCursor++;

    if (!currentKey) throw new Error('GROQ_API_KEY is not set');

    try {
      const agent = currentProxy ? getAgent(currentProxy) : undefined;
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentKey}`
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(INFERENCE_TIMEOUT)
      };
      if (agent) opts.agent = agent;

      const res = await fetch(`${GROQ_BASE_URL}/chat/completions`, opts);

      if (res.status === 429) {
        if (++rateLimitedCount > MAX_RETRIES) {
          throw new Error('Rate limited — all retries exhausted');
        }
        const retryAfter = parseInt(res.headers.get('Retry-After') || '5', 10);
        const body = await res.text().catch(() => '');
        console.warn(`[groq] Rate limited (key ${(keyCursor - 1) % (keys?.length || 1)}, proxy ${(proxyCursor - 1) % (proxies?.length || 1)}) — rotating`);
        await sleep(Math.min(retryAfter, 10) * 1000);
        continue;
      }

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Groq API error: ${res.status} - ${errText}`);
      }

      const data = await res.json();

      if (data.usage?.total_tokens) {
        tokenWindow.push({ ts: Date.now(), tokens: data.usage.total_tokens });
      }

      return data.choices?.[0]?.message?.content || '';
    } catch (err) {
      if (attempt === MAX_RETRIES) {
        console.error('[groq] Generation error:', err.message);
        throw err;
      }
      console.warn(`[groq] Attempt ${attempt + 1} failed:`, err.message);
    }
  }
  throw new Error('All generation retries exhausted');
}
