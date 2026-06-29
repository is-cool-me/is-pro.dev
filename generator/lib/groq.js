import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

const RAW_KEYS = (process.env.GROQ_API_KEY || '').split(',').map(s => s.trim()).filter(Boolean);
const RAW_PROXIES = (process.env.GROQ_PROXIES || '').split(',').map(s => s.trim()).filter(Boolean);
const PROXY_AUTH = process.env.GROQ_PROXY_AUTH || '';

const keys = RAW_KEYS.length > 0 ? RAW_KEYS : null;
const proxies = RAW_PROXIES.length > 0 ? RAW_PROXIES : null;

const GROQ_BASE_URL = 'https://api.groq.com/openai/v1';
const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
const VISION_MODEL = process.env.GROQ_VISION_MODEL || 'meta-llama/llama-4-scout-17b-16e-instruct';
const INFERENCE_TIMEOUT = 180000;
const TPM_LIMIT = parseInt(process.env.GROQ_TPM_LIMIT || '12000', 10);
const RPM_LIMIT = 25;
const MIN_REQUEST_INTERVAL = 2500;
const MAX_RETRIES = 5;

let keyCursor = 0;
let proxyCursor = 0;
const tokenWindow = [];
const requestWindow = [];
let lastRequestTime = 0;

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

async function waitForRateLimits() {
  const now = Date.now();

  while (tokenWindow.length > 0 && tokenWindow[0].ts < now - 60000) {
    tokenWindow.shift();
  }
  while (requestWindow.length > 0 && requestWindow[0] < now - 60000) {
    requestWindow.shift();
  }

  const tpmUsed = tokenWindow.reduce((sum, e) => sum + e.tokens, 0);
  const rpmCount = requestWindow.length;

  if (tpmUsed > TPM_LIMIT * 0.9) {
    const oldest = tokenWindow[0]?.ts ?? now;
    const wait = 60000 - (now - oldest) + 200;
    console.warn(`[groq] TPM near limit (${tpmUsed}/${TPM_LIMIT}) — waiting ${Math.ceil(wait / 1000)}s`);
    await sleep(wait);
    return waitForRateLimits();
  }

  if (rpmCount >= RPM_LIMIT * 0.9) {
    const oldest = requestWindow[0] ?? now;
    const wait = 60000 - (now - oldest) + 200;
    console.warn(`[groq] RPM near limit (${rpmCount}/${RPM_LIMIT}) — waiting ${Math.ceil(wait / 1000)}s`);
    await sleep(wait);
    return waitForRateLimits();
  }

  const elapsed = now - lastRequestTime;
  if (elapsed < MIN_REQUEST_INTERVAL) {
    const wait = MIN_REQUEST_INTERVAL - elapsed;
    await sleep(wait);
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

export function getRateLimitStatus() {
  const now = Date.now();
  while (tokenWindow.length > 0 && tokenWindow[0].ts < now - 60000) tokenWindow.shift();
  while (requestWindow.length > 0 && requestWindow[0] < now - 60000) requestWindow.shift();

  const tpmUsed = tokenWindow.reduce((sum, e) => sum + e.tokens, 0);
  const rpmCount = requestWindow.length;
  const tpmPct = Math.round((tpmUsed / TPM_LIMIT) * 100);
  const rpmPct = Math.round((rpmCount / RPM_LIMIT) * 100);

  return {
    tpm: { used: tpmUsed, limit: TPM_LIMIT, percent: tpmPct },
    rpm: { used: rpmCount, limit: RPM_LIMIT, percent: rpmPct },
    windowTokens: tokenWindow.length,
    windowRequests: requestWindow.length,
    nextRequestIn: Math.max(0, MIN_REQUEST_INTERVAL - (now - lastRequestTime))
  };
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

  return groqRequest(payload);
}

export async function generateWithGroqVision(prompt, imageBase64, systemPrompt = '', maxTokens = 1200) {
  const messages = [
    ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
    {
      role: 'user',
      content: [
        { type: 'text', text: prompt },
        { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
      ]
    }
  ];

  const payload = {
    model: VISION_MODEL,
    messages,
    temperature: 0.7,
    max_tokens: maxTokens,
    top_p: 0.9
  };

  return groqRequest(payload);
}

async function groqRequest(payload) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      const backoff = Math.min(5000 * Math.pow(1.5, attempt - 1), 60000);
      console.warn(`[groq] Retry ${attempt}/${MAX_RETRIES} in ${Math.ceil(backoff / 1000)}s`);
      await sleep(backoff);
    }

    await waitForRateLimits();

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

      const ratelimitLimit = res.headers.get('x-ratelimit-limit-tokens');
      const ratelimitRemaining = res.headers.get('x-ratelimit-remaining-tokens');
      const ratelimitReset = res.headers.get('x-ratelimit-reset-tokens');
      const ratelimitReqLimit = res.headers.get('x-ratelimit-limit-requests');
      const ratelimitReqRemaining = res.headers.get('x-ratelimit-remaining-requests');
      const ratelimitReqReset = res.headers.get('x-ratelimit-reset-requests');
      const retryAfter = res.headers.get('retry-after');

      if (res.status === 429) {
        console.warn(`[groq] Rate limited! tokens=${ratelimitRemaining}/${ratelimitLimit} reset=${ratelimitReset}ms, req=${ratelimitReqRemaining}/${ratelimitReqLimit} reset=${ratelimitReqReset}s, retry-after=${retryAfter}s`);
        await sleep(Math.min(parseInt(retryAfter || '10', 10) * 1000, 30000));
        continue;
      }

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Groq API error: ${res.status} - ${errText}`);
      }

      const data = await res.json();

      const tokensUsed = data.usage?.total_tokens || 0;
      if (tokensUsed > 0) {
        tokenWindow.push({ ts: Date.now(), tokens: tokensUsed });
      }
      requestWindow.push(Date.now());
      lastRequestTime = Date.now();

      const tpmPct = Math.round((parseInt(ratelimitRemaining || '0') / parseInt(ratelimitLimit || '1')) * 100);
      const rpmPct = Math.round((parseInt(ratelimitReqRemaining || '0') / parseInt(ratelimitReqLimit || '1')) * 100);
      if (tpmPct < 20 || rpmPct < 20) {
        console.warn(`[groq] Low limits: tokens ${ratelimitRemaining}/${ratelimitLimit} (${tpmPct}%), requests ${ratelimitReqRemaining}/${ratelimitReqLimit} (${rpmPct}%)`);
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
