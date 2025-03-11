import { Test, TestingModule } from '@nestjs/testing';
import { JoinCodesService } from './join-codes.service';

describe('JoinCodesService', () => {
  let service: JoinCodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoinCodesService],
    }).compile();

    service = module.get<JoinCodesService>(JoinCodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
