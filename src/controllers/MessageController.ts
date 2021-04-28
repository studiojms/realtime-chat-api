import { Request, Response } from 'express';
import MessageService from '../services/MessageService';

class MessageController {
  async create(request: Request, response: Response) {
    const messageService = new MessageService();

    const { admin_id, text, user_id } = request.body;

    const message = await messageService.create({
      admin_id,
      text,
      user_id,
    });

    return response.json(message);
  }

  async listByUser(request: Request, response: Response) {
    const messageService = new MessageService();

    const { id } = request.params;

    const list = await messageService.listByUser(id);

    return response.json(list);
  }
}

export default MessageController;
