
import Server from './models/server';

try {
    require('dotenv').config();
    const server = new Server();
    server.execute();
} catch (error) {
    console.log('No se pudo levantar el servidor')
}
