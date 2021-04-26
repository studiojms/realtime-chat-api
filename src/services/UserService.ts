import { getCustomRepository } from 'typeorm';

import UserRepository from '../repositories/UserRepository';

class UserService {
  async create(email: string) {
    const userRepository = getCustomRepository(UserRepository);
    const existingUser = await userRepository.findOne({ email });

    if (existingUser) {
      return existingUser;
    }

    const newUser = userRepository.create({ email });

    await userRepository.save(newUser);

    return newUser;
  }
}

export default UserService;
