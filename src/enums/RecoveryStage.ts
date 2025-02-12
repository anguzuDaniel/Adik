import { registerEnumType } from '@nestjs/graphql';

export enum RecoveryStage {
  PRE_CONTEMPLATION = 'Pre-contemplation',
  CONTEMPLATION = 'Contemplation',
  PREPARATION = 'Preparation',
  ACTION = 'Action',
  MAINTENANCE = 'Maintenance',
}

registerEnumType(RecoveryStage, { name: 'RecoveryStage' });
