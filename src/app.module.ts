import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './auth/app.roles';

@Module({
  imports: [
    UserModule,
    AuthModule,
    DatabaseModule,
    // AccessControlModule.forRoles(roles),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
