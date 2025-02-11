import { registerEnumType } from '@nestjs/graphql';

export enum MatchStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

registerEnumType(MatchStatus, { name: 'MatchStatus' });
