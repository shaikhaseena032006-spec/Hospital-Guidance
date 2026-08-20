import type { AskResponse, HealthResponse, UploadResponse } from '@/types';
import { getDummyAnswer } from './dummyData';

/**
 * API service for the Hospital Procedure Assistant backend (FastAPI).
 *
 * The backend contract:
 *   POST http://localhost:8000/ask     -> { question } => { answer, source, page }
 *   POST http://localhost:8000/upload  -> multipart file  => { document, size, page_count }
 *   GET  http://localhost:8000/health  -> { status, version }
 *
 * Set VITE_API_URL to override the base URL. When unset, calls fall back to
 * dummy responses so the frontend works standalone during development.
 */

const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';
const USE_DUMMY = !API_URL;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function askQuestion(question: string): Promise<AskResponse> {
  if (USE_DUMMY) {
    await delay(900 + Math.random() * 700);
    const { answer, source, page } = getDummyAnswer(question);
    return { answer, source, page };
  }

  const res = await fetch(`${API_URL}/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    throw new Error(`Ask failed (${res.status})`);
  }
  return (await res.json()) as AskResponse;
}

export async function uploadDocument(file: File, onProgress?: (pct: number) => void): Promise<UploadResponse> {
  if (USE_DUMMY) {
    // simulate progress
    for (let pct = 0; pct <= 100; pct += 20) {
      onProgress?.(pct);
      await delay(120);
    }
    return { document: file.name, size: file.size, page_count: Math.max(1, Math.round(file.size / 50_000)) };
  }

  const xhr = new XMLHttpRequest();
  const promise = new Promise<UploadResponse>((resolve, reject) => {
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText) as UploadResponse);
      } else {
        reject(new Error(`Upload failed (${xhr.status})`));
      }
    };
    xhr.onerror = () => reject(new Error('Upload failed (network)'));
  });

  const form = new FormData();
  form.append('file', file);
  xhr.open('POST', `${API_URL}/upload`);
  xhr.send(form);
  return promise;
}

export async function checkHealth(): Promise<HealthResponse> {
  if (USE_DUMMY) {
    await delay(200);
    return { status: 'ok', version: 'mock-1.0.0' };
  }

  const res = await fetch(`${API_URL}/health`);
  if (!res.ok) throw new Error(`Health check failed (${res.status})`);
  return (await res.json()) as HealthResponse;
}
