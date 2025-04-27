import { Server as SocketIOServer, Socket } from 'socket.io';
import { comprobarJWT } from '../helpers/jwt';

class Sockets {
  private io: SocketIOServer;

  constructor(io: SocketIOServer) {
    this.io = io;
    this.socketsEvents();
  }

  private socketsEvents(): void {
    try {
      this.io.on('connection', async (socket: Socket) => {
        const token = socket.handshake.query['x-token'];

        if (typeof token !== 'string') {
          console.log('Token inválido o no proporcionado');
          return socket.disconnect();
        }

        const [valido, uid, role] = comprobarJWT(token);

        if (!valido) {
          console.log('Socket no identificado');
          return socket.disconnect();
        }

        switch (role) {
          case 'ciuda':
          case 'seren':
            socket.join(uid || "");
            break;
          default:
            break;
        }

        socket.on('denuncia', async (payload: any) => {
          try {
            const { Id } = { ...payload };
            // Aquí va tu lógica para manejar la denuncia
          } catch (error) {
            this.io.to(uid || "").emit('denuncia', {
              estado: false,
              msg: 'No se pudo enviar',
            });
          }
        });

        socket.on('disconnect', async () => {
          switch (role) {
            case 'ciuda':
              // Lógica para desconexión de ciudadano
              break;
            case 'seren':
              // Aquí parece que debería ser leave, no join
              socket.leave(uid || "");
              break;
            default:
              break;
          }
        });
      });
    } catch (error) {
      console.log('Error en socketsEvents:', error);
    }
  }
}

export default Sockets;
