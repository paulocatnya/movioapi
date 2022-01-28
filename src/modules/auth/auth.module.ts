import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../user/users.module';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../user/services';
import { AuthController } from './controllers/auth.controller';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      //// @TODO:// INSERIR ENV VAR
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, UsersService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
