import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module.js';
import { AppService } from './app.service.js';
import { AppController } from './app.controller.js';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from '../config/db.config.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './messages/messages.module.js';
import { JournalsModule } from './journals/journals.module.js';
import { ReportsModule } from './reports/reports.module.js';
import { MatchesModule } from './matches/matches.module.js';
import { ResourcesModule } from './resources/resources.module.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { CommunitiesModule } from './communities/communities.module.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('SUPABASE_DATABASE_URL'),
        password: configService.get<string>('SUPABASE_DATABASE_PASSWORD'),
        username: configService.get<string>('SUPABASE_DATABASE_USERNAME'),
        entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true, // Warning: Set to false in production
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    UsersModule,
    AuthModule,
    MessagesModule,
    JournalsModule,
    ReportsModule,
    MatchesModule,
    ResourcesModule,
    CommunitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
