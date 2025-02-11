import { Test, TestingModule } from '@nestjs/testing';
import { MatchesResolver } from './matches.resolver';
import { MatchesService } from './matches.service';

describe('MatchesResolver', () => {
  let resolver: MatchesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchesResolver, MatchesService],
    }).compile();

    resolver = module.get<MatchesResolver>(MatchesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
