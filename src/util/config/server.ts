import express from 'express';
import config from './config';
import ItemRoute from '../../routes/item';
import UserRoute from '../../routes/user';
import errorResponse from '../middlewares/error';

export default class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    public config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        //rotas
        this.app.use('/api/item', new ItemRoute().router);
        this.app.use('/api/user', new UserRoute().router);
        
        this.app.use(errorResponse);
    }

    public start(): void {
        this.app.listen(config.port, () => {
            console.log(`server running on port ${config.port}`);
        });
    }
}
