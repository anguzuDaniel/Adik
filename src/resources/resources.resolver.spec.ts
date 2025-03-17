import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesResolver } from './resources.resolver.js';
import { ResourcesService } from './resources.service.js';

describe('ResourcesResolver', () => {
  let resolver: ResourcesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourcesResolver, ResourcesService],
    }).compile();

    resolver = module.get<ResourcesResolver>(ResourcesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
