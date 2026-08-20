export type Role = 'Doctor' | 'Nurse' | 'Admin';

export type MessageRole = 'user' | 'assistant';

export interface SourceRef {
  document: string;
  page: number;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  source?: SourceRef;
  createdAt: number;
  pending?: boolean;
  error?: boolean;
}

export interface UploadedDoc {
  id: string;
  name: string;
  size: number;
  uploadedAt: number;
  status: 'uploading' | 'ready' | 'error';
  progress?: number;
}

export interface AskResponse {
  answer: string;
  source: string;
  page: number;
}

export interface UploadResponse {
  document: string;
  size: number;
  page_count?: number;
}

export interface HealthResponse {
  status: 'ok' | string;
  version?: string;
}
