import { io } from 'socket.io-client';
import { SOCKET_URL } from '../commons/constants';

export default class SocketService {
  constructor() {
    this.clipboard = null;

    this.token = '';
  }

  listenStoreUpdate = store => {
    store.subscribe(() => {
      const { token } = store.getState().user;
      this.token = token;
    });
  };

  initialClipboardListener = () => {
    if (!this.clipboard) {
      this.clipboard = io(SOCKET_URL, {
        auth: {
          token: this.token,
        },
        forceNew: true,
      });
    }
  };

  removeClipboardListener = () => {
    if (this.clipboard) {
      this.clipboard.close();
    }
    this.clipboard = null;
  };
}
