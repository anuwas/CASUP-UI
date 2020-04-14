import { TestBed } from '@angular/core/testing';

import { TaskSchedulerService } from './task-scheduler.service';

describe('TaskSchedulerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskSchedulerService = TestBed.get(TaskSchedulerService);
    expect(service).toBeTruthy();
  });
});
