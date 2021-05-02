const socket = io();
let userConnections = [];

socket.on('admin_list_all_users', (connections) => {
  userConnections = connections;
  document.getElementById('list_users').innerHTML = '';

  const template = document.getElementById('template').innerHTML;

  connections.forEach((conn) => {
    const rendered = Mustache.render(template, {
      email: conn.user.email,
      id: conn.socket_id,
    });

    document.getElementById('list_users').innerHTML += rendered;
  });
});

function call(id) {
  const connection = userConnections.find((conn) => conn.socket_id == id);
  const template = document.getElementById('admin_template').innerHTML;

  const rendered = Mustache.render(template, {
    email: connection.user.email,
    id: connection.user_id,
  });

  document.getElementById('supports').innerHTML += rendered;

  const params = {
    user_id: connection.user_id,
  };

  socket.emit('admin_user_in_support', params);

  socket.emit('admin_list_messages_by_user', params, (messages) => {
    const messagesDiv = document.getElementById(`allMessages${connection.user_id}`);

    messages.forEach((msg) => {
      const msgDiv = document.createElement('div');

      if (msg.admin_id == null) {
        msgDiv.className = 'admin_message_client';
        msgDiv.innerHTML = `<span>${connection.user.email}</span>`;
        msgDiv.innerHTML = `<span>${msg.text}</span>`;
        msgDiv.innerHTML += `<span class="admin_date">${dayjs(msg.created_at).format('DD/MM/YYYY HH:mm:ss')}</span>`;
      } else {
        msgDiv.className = 'admin_message_admin';
        msgDiv.innerHTML = `<span>Atendente: ${msg.text}</span>`;
        msgDiv.innerHTML += `<span class="admin_date">${dayjs(msg.created_at).format('DD/MM/YYYY HH:mm:ss')}</span>`;
      }

      messagesDiv.appendChild(msgDiv);
    });
  });
}

function sendMessage(id) {
  const msgText = document.getElementById(`send_message_${id}`);

  const params = {
    text: msgText.value,
    user_id: id,
  };

  socket.emit('admin_send_message', params);

  const divMsg = document.getElementById(`allMessages${id}`);
  const msgDiv = document.createElement('div');
  msgDiv.className = 'admin_message_admin';
  msgDiv.innerHTML = `<span>Atendente: ${params.text}</span>`;
  msgDiv.innerHTML += `<span class="admin_date">${dayjs().format('DD/MM/YYYY HH:mm:ss')}</span>`;

  divMsg.appendChild(msgDiv);
  msgText.value = '';
}

socket.on('admin_receive_message', (data) => {
  const connection = userConnections.find((conn) => conn.socket_id == data.socket_id);

  const messagesDiv = document.getElementById(`allMessages${connection.user_id}`);

  const msgDiv = document.createElement('div');
  msgDiv.className = 'admin_message_client';
  msgDiv.innerHTML = `<span>${connection.user.email}</span>`;
  msgDiv.innerHTML = `<span>${data.message.text}</span>`;
  msgDiv.innerHTML += `<span class="admin_date">${dayjs(data.message.created_at).format('DD/MM/YYYY HH:mm:ss')}</span>`;

  messagesDiv.appendChild(msgDiv);
});
