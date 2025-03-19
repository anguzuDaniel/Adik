import { CreateCommunityInput } from './create-community.input.js';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateCommunityInput extends PartialType(CreateCommunityInput) {}
