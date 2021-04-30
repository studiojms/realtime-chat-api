import { getCustomRepository, Repository } from 'typeorm';
import User from '../entities/User';

import UserRepository from '../repositories/UserRepository';

class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async create(email: string) {
    const existingUser = this.findByEmail(email);

    if (existingUser) {
      return existingUser;
    }

    const newUser = this.userRepository.create({ email });

    await this.userRepository.save(newUser);

    return newUser;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }
}

export default UserService;
