import { io } from '../connection';
import ConnectionService from '../services/ConnectionService';
import MessageService from '../services/MessageService';
import UserService from '../services/UserService';

interface IReqParams {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  const connectionService = new ConnectionService();
  const userService = new UserService();
  const messageService = new MessageService();

  socket.on('client_first_access', async (params: IReqParams) => {
    const socket_id = socket.id;
    let user_id = null;

    const { text, email } = params;

    let existingUser = await userService.findByEmail(email);

    if (!existingUser) {
      const user = await userService.create(email);
      user_id = user.id;

      await connectionService.create({
        socket_id,
        user_id,
      });
    } else {
      user_id = existingUser.id;
      const connection = await connectionService.findByUserId(existingUser.id);

      if (connection) {
        connection.socket_id = socket_id;
        await connectionService.create(connection);
      }
    }

    await messageService.create({
      text,
      user_id,
    });
  });
});
