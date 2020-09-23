import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'asdf',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    AccessControlModule.forRoles(roles),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, AccessControlModule],
})
export class AuthModule {}
