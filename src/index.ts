import { User } from './models/user';
import Mongo from './util/config/db';
import Server from './util/config/server';


declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

const server = new Server();
const db = new Mongo();

server.start();
db.connect();
