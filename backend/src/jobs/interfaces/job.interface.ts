export enum JobStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum UrlStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  SUCCESS = 'success',
  ERROR = 'error',
  CANCELLED = 'cancelled',
}

export interface UrlResult {
  url: string;
  status: UrlStatus;
  httpStatus?: number;
  error?: string;
  startTime?: Date;
  endTime?: Date;
  duration?: number;
}

export interface Job {
  id: string;
  status: JobStatus;
  urls: UrlResult[];
  createdAt: Date;
  stats: {
    total: number;
    processed: number;
    success: number;
    error: number;
  };
}
