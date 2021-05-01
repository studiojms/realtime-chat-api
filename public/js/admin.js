const socket = io();

socket.on('admin_list_all_users', (connections) => {
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
