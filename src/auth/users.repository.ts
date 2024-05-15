import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from 'src/tasks/dto/auth-credentials.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentials: AuthCredentialsDto) {
    const { username, password } = authCredentials;
    const user = this.create({ username, password });
    await this.save(user);
  }
}
