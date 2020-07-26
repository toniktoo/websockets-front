import socketIOClient from 'socket.io-client';

const init = () => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  var HOST = location.origin;
  const ENDPOINT = 'https://blooming-shore-82074.herokuapp.com/';

  console.log(HOST)
  const socket = socketIOClient(ENDPOINT);

  socket.on('connect', () => {
    console.log('connected');
  });

  // socket.onopen = () => {
  //   console.log('connect');
  // };

  const newDrawing = (data) => {
    const x = data.x;
    const y = data.y;
    context.fillRect(x, y, 10, 10);
  };

  socket.on('getPoint', (text) => {
    console.log(text.data);
    newDrawing(JSON.parse(text));
  });

  // socket.close = () => {
  //   console.log('close');
  // };

  canvas.onmousedown = function (event) {
    canvas.onmousemove = function (event) {
      const x = event.offsetX;
      const y = event.offsetY;
      context.fillRect(x, y, 10, 10);

      const data = {
        x: event.offsetX,
        y: event.offsetY,
      };

      socket.emit('point', JSON.stringify(data));
    };

    canvas.onmouseup = function () {
      canvas.onmousemove = null;
    };
  };
};

document.addEventListener('DOMContentLoaded', init);
