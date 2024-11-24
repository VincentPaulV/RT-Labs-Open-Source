import { Server } from "socket.io";

function initVideoStream(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('webrtc-offer', (offer) => {
      console.log('Received WebRTC offer');
      socket.broadcast.emit('webrtc-offer', offer);
    });

    socket.on('webrtc-answer', (answer) => {
      console.log('Received WebRTC answer');
      socket.broadcast.emit('webrtc-answer', answer);
    });

    socket.on('webrtc-candidate', (candidate) => {
      console.log('Received WebRTC candidate');
      socket.broadcast.emit('webrtc-candidate', candidate);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
}

export default initVideoStream;

