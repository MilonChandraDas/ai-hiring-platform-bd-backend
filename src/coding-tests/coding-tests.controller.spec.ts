import { Test, TestingModule } from '@nestjs/testing';
import { CodingTestsController } from './coding-tests.controller';

describe('CodingTestsController', () => {
  let controller: CodingTestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodingTestsController],
    }).compile();

    controller = module.get<CodingTestsController>(CodingTestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
