import io from 'socket.io-client';

import getendpoint from '../api-endpoint';

export default function Debugger() {
  const endpoint = `${getendpoint()}`;
  const socket = io(endpoint + 'debug');
  const update = (message) => {
    if (message.length === 1) message = message[0];
    console.log('server: ', message);
  };
  socket.on('debug', update);
}
