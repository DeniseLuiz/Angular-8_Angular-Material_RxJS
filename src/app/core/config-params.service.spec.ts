import { TestBed } from '@angular/core/testing';

import { ConfigParamsService } from './config-params.service';

describe('ConfigParamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigParamsService = TestBed.get(ConfigParamsService);
    expect(service).toBeTruthy();
  });
});
