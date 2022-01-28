import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimentsController } from './controllers/';
import { MovimentsRepository } from './repositories';
import { MovimentsService } from './services';

const movimentsRepoDynamicModule = TypeOrmModule.forFeature([
  MovimentsRepository,
]);

@Module({
  imports: [movimentsRepoDynamicModule],
  exports: [movimentsRepoDynamicModule],
  providers: [MovimentsService],
  controllers: [MovimentsController],
})
export class MovimentsModule {}
