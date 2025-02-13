import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateResourceInput } from './dto/create-resource.input.js';
import { UpdateResourceInput } from './dto/update-resource.input.js';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity.js';
import { Repository } from 'typeorm';
import { UploadFileResponse } from './dto/upload-file-reponse.dto.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ResourcesService {
  private supabase: SupabaseClient;

  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
    private configService: ConfigService,
  ) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and Key are required');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  create(createResourceInput: CreateResourceInput) {
    return this.resourceRepository.create(createResourceInput);
  }

  findAll() {
    return this.resourceRepository.find();
  }

  findOne(id: number) {
    return this.resourceRepository.findOne({ where: { id } });
  }

  async update(id: number, updateResourceInput: UpdateResourceInput) {
    if (!id) {
      throw new NotFoundException('Please provide and id');
    }

    const resource = await this.resourceRepository.findOneBy({ id });

    if (!resource) {
      throw new NotFoundException(`No resource found for id ${id}.`);
    }

    return this.resourceRepository.update(id, updateResourceInput);
  }

  async remove(id: number) {
    if (!id) {
      throw new Error('Please provide and id.');
    }

    const resource = await this.resourceRepository.findOneBy({ id });

    if (!resource) {
      throw new NotFoundException(`No resource found for id ${id}.`);
    }

    return this.resourceRepository.remove(resource);
  }

  async uploadFile(
    bucket: string,
    path: string,
    fileBuffer: Buffer,
    fileType: string,
  ): Promise<UploadFileResponse> {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, fileBuffer, {
        contentType: fileType,
      });

    if (error) {
      throw new InternalServerErrorException(
        `File upload failed: ${error.message}`,
      );
    }

    return {
      message: 'File uploaded successfully',
      result: data?.path,
    };
  }
}
