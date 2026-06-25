const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_BASE_URL = 'https://api.groq.com/openai/v1';
const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
const INFERENCE_TIMEOUT = 120000;

const TPM_LIMIT = parseInt(process.env.GROQ_TPM_LIMIT || '12000', 10);
const MAX_RETRIES = 3;

const tokenWindow = [];

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
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
  if (!GROQ_API_KEY) return false;
  try {
    const res = await fetch(`${GROQ_BASE_URL}/models`, {
      headers: { Authorization: `Bearer ${GROQ_API_KEY}` },
      signal: AbortSignal.timeout(5000)
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function generateWithGroq(prompt, systemPrompt = '', maxTokens = 1200) {
  if (!GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not set');
  }

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

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      const backoff = Math.min(1000 * Math.pow(2, attempt - 1), 30000);
      console.warn(`[groq] Retry ${attempt}/${MAX_RETRIES} in ${backoff}ms`);
      await sleep(backoff);
    }

    await waitForTokenBudget(maxTokens);

    try {
      const res = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(INFERENCE_TIMEOUT)
      });

      if (res.status === 429) {
        const retryAfter = parseInt(res.headers.get('Retry-After') || '5', 10);
        const body = await res.text().catch(() => '');
        console.warn(`[groq] Rate limited — retrying after ${retryAfter}s`);
        await sleep(retryAfter * 1000);
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
}
