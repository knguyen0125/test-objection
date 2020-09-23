import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  PUBLIC = 'public',
  ADMIN = 'admin',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.PUBLIC)
  .resource(['menuItem'])
  .readAny();

roles
  .grant(AppRoles.PUBLIC)
  .resource('order')
  .createOwn()
  .readOwn()
  .updateOwn()
  .deleteOwn();

roles.grant(AppRoles.ADMIN).extend(AppRoles.PUBLIC);

roles
  .grant(AppRoles.ADMIN)
  .resource('video')
  .readAny();

roles
  .grant(AppRoles.ADMIN)
  .resource(['menuItem', 'menu'])
  .createAny()
  .readAny()
  .updateAny()
  .deleteAny();

roles
  .grant(AppRoles.ADMIN)
  .resource('order')
  .createAny()
  .readAny()
  .updateAny()
  .deleteAny();

roles.lock();
