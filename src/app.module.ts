import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductsModule } from './products/products.module'
import { typeOrmConfigAsync } from './config/typeorm.config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

// {
//   type: 'postgres',
//   host: 'db-store',
//   port: 5432,
//   username: 'postgres',
//   password: 'root',
//   database: 'store',
//   entities: [__dirname + '/**/*.entity{.js, .ts}'],
//   // migrations: [__dirname + '/src/database/migrations/*.ts'],
//   // migrations: ['src/database/migration/*{.ts,.js}'],
//   // synchronize: true,
// }
