import { registerEnumType } from '@nestjs/graphql';

export enum ReportType {
  USER = 'USER',
  COMMUNITY = 'COMMUNITY',
}

registerEnumType(ReportType, { name: 'ReportType', description: 'The type of report (USER or COMMUNITY)', });