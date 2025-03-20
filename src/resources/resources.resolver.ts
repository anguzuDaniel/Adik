import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ResourcesService } from './resources.service.js';
import { CreateResourceInput } from './dto/create-resource.input.js';
import { UpdateResourceInput } from './dto/update-resource.input.js';
import { UploadFileResponse } from './dto/upload-file-reponse.dto.js';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import { Resource } from '../entities/resource.entity.js';
import { FileUpload } from 'graphql-upload/processRequest.mjs';

@Resolver(() => Resource)
export class ResourcesResolver {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Mutation(() => Resource)
  createResource(
    @Args('createResourceInput') createResourceInput: CreateResourceInput,
  ) {
    return this.resourcesService.create(createResourceInput);
  }

  @Query(() => [Resource], { name: 'resources' })
  findAll() {
    return this.resourcesService.findAll();
  }

  @Query(() => Resource, { name: 'resource' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.resourcesService.findOne(id);
  }

  @Mutation(() => Resource)
  updateResource(
    @Args('updateResourceInput') updateResourceInput: UpdateResourceInput,
  ) {
    return this.resourcesService.update(
      updateResourceInput.id,
      updateResourceInput,
    );
  }

  @Mutation(() => Resource)
  removeResource(@Args('id', { type: () => Int }) id: number) {
    return this.resourcesService.remove(id);
  }

  @Mutation(() => UploadFileResponse)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
    @Args('bucket', { type: () => String, nullable: true })
    bucket: string = 'default-bucket',
  ): Promise<UploadFileResponse> {
    const { createReadStream, filename, mimetype } = file;

    const stream = createReadStream();
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const fileBuffer = Buffer.concat(chunks);

    const filePath = `uploads/${Date.now()}_${filename}`;

    const uploadResult = await this.resourcesService.uploadFile(
      bucket,
      filePath,
      fileBuffer,
      mimetype,
    );

    return {
      message: 'File upload successfully',
      result: JSON.stringify(uploadResult),
    };
  }
}
