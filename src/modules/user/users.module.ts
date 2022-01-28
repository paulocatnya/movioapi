import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/user.controller';
import { UsersRepository } from './repositories';
import { UsersService } from './services/user.service';

const usersRepoDynamicModule = TypeOrmModule.forFeature([UsersRepository]);

@Module({
  imports: [usersRepoDynamicModule],
  exports: [UsersService, usersRepoDynamicModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
