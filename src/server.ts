import { http } from './connection';
import './websocket/clientws';
import './websocket/adminws';

const PORT = 3000;

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
