import { Test, TestingModule } from '@nestjs/testing';
import { CodingTestsService } from './coding-tests.service';

describe('CodingTestsService', () => {
  let service: CodingTestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodingTestsService],
    }).compile();

    service = module.get<CodingTestsService>(CodingTestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
