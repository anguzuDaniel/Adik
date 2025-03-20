import { InputType, Field } from '@nestjs/graphql';
import { ReportType } from '../../enums/ReportType.js';

@InputType()
export class CreateReportInput {
  @Field(() => ReportType)
  type: ReportType;

  @Field({ nullable: true })
  reportedUserId?: string;

  @Field({ nullable: true })
  reportedCommunityId?: string;

  @Field()
  reason: string;
}
