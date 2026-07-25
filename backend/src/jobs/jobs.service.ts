import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Job, JobStatus, UrlResult, UrlStatus } from './interfaces/job.interface';

@Injectable()
export class JobsService {
  private jobs = new Map<string, Job>();

  createJob(urls: string[]): Job {
    const jobId = uuidv4();
    const job: Job = {
      id: jobId,
      status: JobStatus.PENDING,
      createdAt: new Date(),
      urls: urls.map((url) => ({
        url,
        status: UrlStatus.PENDING,
      })),
      stats: {
        total: urls.length,
        processed: 0,
        success: 0,
        error: 0,
      },
    };
    this.jobs.set(jobId, job);
    this.processJob(jobId);
    return job;
  }

  getJobs(): Job[] {
    return Array.from(this.jobs.values());
  }

  getJob(id: string): Job | undefined {
    return this.jobs.get(id);
  }

  cancelJob(id: string): boolean {
    const job = this.jobs.get(id);
    if (!job || job.status === JobStatus.COMPLETED || job.status === JobStatus.CANCELLED) {
      return false;
    }
    job.status = JobStatus.CANCELLED;
    job.urls.forEach((u) => {
      if (u.status === UrlStatus.PENDING) u.status = UrlStatus.CANCELLED;
    });
    return true;
  }

  private async processJob(jobId: string) {
    const job = this.jobs.get(jobId);
    if (!job) return;

    job.status = JobStatus.IN_PROGRESS;
    const pendingUrls = job.urls.filter((u) => u.status === UrlStatus.PENDING);
    
    // Concurrency limit of 5
    const limit = 5;
    for (let i = 0; i < pendingUrls.length; i += limit) {
      if ((job.status as any) === JobStatus.CANCELLED) break;
      
      const chunk = pendingUrls.slice(i, i + limit);
      await Promise.all(chunk.map((urlResult) => this.checkUrl(jobId, urlResult)));
    }

    if ((job.status as any) !== JobStatus.CANCELLED) {
      job.status = JobStatus.COMPLETED;
    }
  }

  private async checkUrl(jobId: string, urlResult: UrlResult) {
    const job = this.jobs.get(jobId);
    if (!job || (job.status as any) === JobStatus.CANCELLED) return;

    urlResult.status = UrlStatus.IN_PROGRESS;
    urlResult.startTime = new Date();

    // Artificial delay 0-10s
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 10000));

    try {
      if ((job.status as any) === JobStatus.CANCELLED) {
        urlResult.status = UrlStatus.CANCELLED;
        return;
      }
      
      const response = await axios.head(urlResult.url);
      urlResult.httpStatus = response.status;
      urlResult.status = UrlStatus.SUCCESS;
      job.stats.success++;
    } catch (error: any) {
      urlResult.status = UrlStatus.ERROR;
      urlResult.error = error.message;
      job.stats.error++;
    }

    urlResult.endTime = new Date();
    urlResult.duration = urlResult.endTime.getTime() - urlResult.startTime.getTime();
    job.stats.processed++;
  }
}
