import { TestBed } from '@angular/core/testing';

import { ProjectMetaService } from './project-meta.service';

describe('ProjectMetaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectMetaService = TestBed.get(ProjectMetaService);
    expect(service).toBeTruthy();
  });
});
