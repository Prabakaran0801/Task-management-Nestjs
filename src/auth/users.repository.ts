import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentials: AuthCredentialsDto) {
    const { username, password } = authCredentials;

    const salt = await bcrypt.genSalt();
    const hasedPasword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hasedPasword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User name is alredy exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
