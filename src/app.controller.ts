import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserRoles } from 'nest-access-control';
import { Scopes } from './auth/decorators/scopes.decorator';
import { AllowPublic } from './auth/decorators/optional-authenticated.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AllowPublic()
  @Scopes('menu:read')
  @Get()
  getHello(@UserRoles() userRoles: any): string {
    return userRoles;
  }
}
