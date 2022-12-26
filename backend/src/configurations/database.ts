import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  logging: 'all',
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: [path.join(__dirname, '..', '**/entity/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '..', '**/migration/*{.ts,.js}')],
  migrationsTableName: 'migrations',
};

const createDatasource = async () => {
  return new DataSource({ ...databaseConfig } as DataSourceOptions);
};

export default createDatasource();
