import { Request, Response } from 'express';
import SettingService from '../services/SettingService';

class SettingController {
  async create(request: Request, response: Response) {
    const { chat, username } = request.body;
    let settings;
    const settingService = new SettingService();

    try {
      settings = await settingService.create({ chat, username });
    } catch (err) {
      response.status(500).json({ message: err.message });
    }

    return response.json(settings);
  }

  async findByUsername(request: Request, response: Response) {
    const { username } = request.params;

    const settingService = new SettingService();

    const settings = await settingService.findByUsername(username);

    return response.json(settings);
  }

  async update(request: Request, response: Response) {
    const { username } = request.params;
    const { chat } = request.body;

    const settingService = new SettingService();

    await settingService.update(username, chat);
  }
}

export default SettingController;
