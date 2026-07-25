import { Controller, Get, Post, Body, Param, Delete, NotFoundException } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('api/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() body: { urls: string[] }) {
    return this.jobsService.createJob(body.urls);
  }

  @Get()
  findAll() {
    return this.jobsService.getJobs();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const job = this.jobsService.getJob(id);
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const success = this.jobsService.cancelJob(id);
    if (!success) {
      throw new NotFoundException(`Job with ID ${id} not found or cannot be cancelled`);
    }
    return { message: 'Job cancelled' };
  }
}
