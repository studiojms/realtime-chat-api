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
}

export default SettingController;
