import { spawn, execSync } from 'child_process';
import { setTimeout as sleep } from 'timers/promises';

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const MODEL = process.env.OLLAMA_MODEL || 'llama3.2:latest';
const MODEL_STARTUP_TIMEOUT = 30000;
const MODEL_INFERENCE_TIMEOUT = 120000;

let _isRunning = false;
let _checkInterval = null;

export async function isOllamaRunning() {
  try {
    const res = await fetch(`${OLLAMA_HOST}/api/tags`, { signal: AbortSignal.timeout(3000) });
    return res.ok;
  } catch {
    return false;
  }
}

export async function startOllama() {
  if (_isRunning) return true;
  console.log('[ollama] Starting Ollama server...');

  const isAlreadyRunning = await isOllamaRunning();
  if (isAlreadyRunning) {
    _isRunning = true;
    console.log('[ollama] Already running.');
    return true;
  }

  try {
    execSync('ollama serve > /tmp/ollama.log 2>&1 &', { shell: '/bin/bash' });
    const startTime = Date.now();
    while (Date.now() - startTime < MODEL_STARTUP_TIMEOUT) {
      if (await isOllamaRunning()) {
        _isRunning = true;
        console.log('[ollama] Server started.');
        return true;
      }
      await sleep(2000);
    }
    throw new Error('Ollama server failed to start within timeout');
  } catch (err) {
    console.error('[ollama] Failed to start:', err.message);
    return false;
  }
}

export async function stopOllama() {
  if (!_isRunning) return;
  console.log('[ollama] Stopping...');
  try {
    execSync('pkill -f "ollama serve" 2>/dev/null || true', { shell: '/bin/bash' });
    _isRunning = false;
    console.log('[ollama] Stopped.');
  } catch {
    _isRunning = false;
  }
}

export async function generateWithOllama(prompt, systemPrompt = '') {
  const running = await startOllama();
  if (!running) {
    throw new Error('Ollama is not available');
  }

  const payload = {
    model: MODEL,
    messages: [
      ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
      { role: 'user', content: prompt }
    ],
    stream: false,
    options: {
      temperature: 0.7,
      top_p: 0.9,
      num_predict: 1200
    }
  };

  try {
    const res = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(MODEL_INFERENCE_TIMEOUT)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Ollama API error: ${res.status} - ${errText}`);
    }

    const data = await res.json();
    return data.message?.content || '';
  } catch (err) {
    console.error('[ollama] Generation error:', err.message);
    throw err;
  }
}

export async function ensureModel() {
  const running = await startOllama();
  if (!running) return false;

  try {
    execSync(`ollama show ${MODEL} > /dev/null 2>&1`, { shell: '/bin/bash' });
    return true;
  } catch {
    console.log(`[ollama] Pulling model ${MODEL}...`);
    try {
      execSync(`ollama pull ${MODEL}`, { shell: '/bin/bash' });
      console.log('[ollama] Model ready.');
      return true;
    } catch (pullErr) {
      console.error('[ollama] Failed to pull model:', pullErr.message);
      return false;
    }
  }
}

export function isModelRunning() {
  return _isRunning;
}