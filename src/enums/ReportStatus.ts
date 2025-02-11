import { registerEnumType } from '@nestjs/graphql';

export enum ReportStatus {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
}

registerEnumType(ReportStatus, { name: 'ReportStatus' });
