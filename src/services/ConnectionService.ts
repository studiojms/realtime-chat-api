import { getCustomRepository, Repository } from 'typeorm';

import Connection from '../entities/Connection';
import ConnectionRepository from '../repositories/ConnectionRepository';

interface IConnectionCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionService {
  private connectionRepository: Repository<Connection>;

  constructor() {
    this.connectionRepository = getCustomRepository(ConnectionRepository);
  }

  async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
    const connection = this.connectionRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await this.connectionRepository.save(connection);

    return connection;
  }

  async findByUserId(userId: string) {
    return await this.connectionRepository.findOne({ user_id: userId });
  }

  async findAllWithoutAdmin() {
    return await this.connectionRepository.find({ where: { admin_id: null }, relations: ['user'] });
  }
}

export default ConnectionService;
