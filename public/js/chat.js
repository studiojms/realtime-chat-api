let adminSocketId = null;
let userEmail = null;
let socket = null;

document.querySelector('#start_chat').addEventListener('click', (event) => {
  const chatHelp = document.getElementById('chat_help');
  chatHelp.style.display = 'none';

  const chatInSupport = document.getElementById('chat_in_support');
  chatInSupport.style.display = 'block';

  socket = io();

  const email = document.getElementById('email').value;
  userEmail = email;
  const text = document.getElementById('txt_help').value;

  socket.on('connect', () => {
    const params = { email, text };
    socket.emit('client_first_access', params, (callback, err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(callback);
      }
    });
  });

  socket.on('client_list_all_messages', (messages) => {
    const templateClient = document.getElementById('message-user-template').innerHTML;
    const templateAdmin = document.getElementById('admin-template').innerHTML;

    messages.forEach((msg) => {
      if (msg.admin_id === null) {
        const rendered = Mustache.render(templateClient, {
          message: msg.text,
          email,
        });

        document.getElementById('messages').innerHTML += rendered;
      } else {
        const rendered = Mustache.render(templateAdmin, {
          message_admin: msg.text,
        });

        document.getElementById('messages').innerHTML += rendered;
      }
    });
  });

  socket.on('admin_send_to_client', (message) => {
    adminSocketId = message.socket_id;
    const templateAdmin = document.getElementById('admin-template').innerHTML;

    const rendered = Mustache.render(templateAdmin, {
      message_admin: message.text,
    });

    document.getElementById('messages').innerHTML += rendered;
  });
});

document.getElementById('send_message_button').addEventListener('click', (evt) => {
  const text = document.getElementById('message_user');

  const params = {
    text: text.value,
    adminSocketId,
  };

  socket.emit('client_send_to_admin', params);

  const templateClient = document.getElementById('message-user-template').innerHTML;
  const rendered = Mustache.render(templateClient, {
    message: text.value,
    email: userEmail,
  });

  document.getElementById('messages').innerHTML += rendered;
});
