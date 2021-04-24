import { getCustomRepository } from 'typeorm';
import SettingRepository from '../repositories/SettingRepository';

interface ISettingCreate {
  chat: boolean;
  username: string;
}

class SettingService {
  async create({ chat, username }: ISettingCreate) {
    const settingsRepository = getCustomRepository(SettingRepository);

    const userAlreadyExists = await settingsRepository.findOne({ username });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const settings = settingsRepository.create({
      chat,
      username,
    });

    await settingsRepository.save(settings);

    return settings;
  }
}

export default SettingService;
