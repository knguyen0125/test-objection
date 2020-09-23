import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import UserModel from 'src/database/models/users.model';
import { UniqueViolationError } from 'objection';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserModel) private readonly userModel: typeof UserModel,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    try {
      const data = await this.userModel.query().insert(createUserDto);
      return data;
    } catch (err) {
      console.log(err);
      if (err instanceof UniqueViolationError) {
        throw new BadRequestException('User already exists');
      }

      throw err;
    }
  }

  async findAll(): Promise<UserModel[]> {
    return await this.userModel
      .query()
      .withGraphFetched('roles')
      .modifyGraph('roles', builder => {
        builder.select('name');
      });
  }

  async findById(id: number): Promise<UserModel> {
    return this.userModel
      .query()
      .findById(id)
      .withGraphFetched('roles');
  }

  async findByEmail(email: string): Promise<UserModel> {
    return this.userModel
      .query()
      .findOne('email', '=', email)
      .withGraphFetched('roles');
  }

  async remove(id: number): Promise<number> {
    return await this.userModel.query().deleteById(id);
  }
}
