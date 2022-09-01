import { ConfigModule, ConfigService } from '@nestjs/config'
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm'
import process from 'process'

export default class TypeOrmConfig {
  static getormConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('TYPEORM_HOST'),
      port: configService.get('TYPEORM_PORT'),
      username: configService.get('TYPEORM_USERNAME'),
      password: configService.get('TYPEORM_PASSWORD'),
      database: configService.get('TYPEORM_DATABASE'),
      entities: [__dirname + '/../**/*.entity{.ts, js}'],
    }
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/../**/*.entity{.ts, js}'],
      migrations: [__dirname + '/../migrations/*{.ts, .js}'],
    }
  },
}

// import { TypeOrmModuleOptions } from '@nestjs/typeorm'

// require('dotenv').config()

// class ConfigService {
//   constructor(private env: { [k: string]: string | undefined }) { }

//   private getValue(key: string, throwOnMissing = true): string {
//     const value = this.env[key]
//     if (!value && throwOnMissing) {
//       throw new Error(`config error - missing env.${key}`)
//     }

//     return value
//   }

//   public ensureValues(keys: string[]) {
//     keys.forEach((k) => this.getValue(k, true))
//     return this
//   }

//   public getPort() {
//     return this.getValue('PORT', true)
//   }

//   public isProduction() {
//     const mode = this.getValue('MODE', false)
//     return mode != 'DEV'
//   }

//   public getTypeOrmConfig(): TypeOrmModuleOptions {
//     return {
//       type: 'postgres',

//       host: this.getValue('POSTGRES_HOST'),
//       port: parseInt(this.getValue('POSTGRES_PORT')),
//       username: this.getValue('POSTGRES_USER'),
//       password: this.getValue('POSTGRES_PASSWORD'),
//       database: this.getValue('POSTGRES_DATABASE'),

//       entities: ['**/*.entity{.ts,.js}'],

//       migrationsTableName: 'migration',

//       migrations: ['src/migration/*.ts'],

//       cli: {
//         migrationsDir: 'src/migration',
//       },

//       ssl: this.isProduction(),
//     }
//   }
// }

// const configService = new ConfigService(process.env).ensureValues([
//   'POSTGRES_HOST',
//   'POSTGRES_PORT',
//   'POSTGRES_USER',
//   'POSTGRES_PASSWORD',
//   'POSTGRES_DATABASE',
// ])

// export { configService }