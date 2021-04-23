import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SettingRepository from '../repositories/SettingRepository';

class SettingController {
  async create(request: Request, response: Response) {
    const settingsRepository = getCustomRepository(SettingRepository);
    const { chat, username } = request.body;

    const settings = settingsRepository.create({
      chat,
      username,
    });

    await settingsRepository.save(settings);

    return response.json(settings);
  }
}

export default SettingController;
