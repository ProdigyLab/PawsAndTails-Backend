import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.env.DATABASE_HOST,
      port: Number(this.env.DATABASE_PORT),
      username: this.env.DATABASE_USERNAME,
      password: this.env.DATABASE_PASSWORD,
      database: this.env.DATABASE_NAME,
      logging: false,

      entities: [__dirname + '/../**/*.entity{.ts,.js}'],

      migrationsTableName: 'migration',
      migrations: [join(__dirname, '..', 'migrations', '*.ts')],

      synchronize: true,
    };
  }
}

const configService = new ConfigService(process.env);

export default configService;
