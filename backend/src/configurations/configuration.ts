import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { databaseConfig } from './database';

interface Configuration {
  database: TypeOrmModuleOptions;
}

export default (): Configuration => ({
  database: databaseConfig,
});
