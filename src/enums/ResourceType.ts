import { registerEnumType } from '@nestjs/graphql';

export enum ResourceType {
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
  PODCAST = 'PODCAST',
}

registerEnumType(ResourceType, { name: 'ResourceType' });
