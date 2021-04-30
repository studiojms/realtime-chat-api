import { http } from "./connection";
import './websocket/clientws';

const PORT = 3000;

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
