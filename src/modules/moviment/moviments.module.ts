import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../user/users.module';
import { MovimentsController } from './controllers/';
import { MovimentsRepository } from './repositories';
import { MovimentsService } from './services';

const movimentsRepoDynamicModule = TypeOrmModule.forFeature([
  MovimentsRepository,
]);

@Module({
  imports: [movimentsRepoDynamicModule, UsersModule],
  exports: [movimentsRepoDynamicModule],
  providers: [MovimentsService],
  controllers: [MovimentsController],
})
export class MovimentsModule {}
