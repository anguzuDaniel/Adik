import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';
import { registerAs } from '@nestjs/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default registerAs(
  'dbconfig.dev',
  (): PostgresConnectionOptions => ({
    url: process.env.POSTGRES_URL,
    type: 'postgres',

    entities: [__dirname + '/**/*.entity{.ts,.js}'],

    synchronize: true,
  }),
);
