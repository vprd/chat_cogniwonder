import io from 'socket.io-client';

import getendpoint from '../api-endpoint';

export default function Debugger() {
  console.log('enabling server debug mode');
  const endpoint = `${getendpoint()}`;
  const socket = io(endpoint + 'debug');
  const update = (message) => {
    if (message.length === 1) {
      message = message[0];
      console.log(message);
    } else {
      console.log(...message);
    }
  };
  window.localStorage.setItem('debug', 'true');
  socket.on('debug', update);
}
