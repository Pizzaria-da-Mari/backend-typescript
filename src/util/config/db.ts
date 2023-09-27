import mongoose from 'mongoose';
import config from './config';

export default class Mongo {
    async connect() {
        await mongoose
            .connect(config.mongo)
            .then(() => {
                console.log('db connected');
            })
            .catch((e) => {
                console.log('deu ruim', e);
            });
    }

    isConnected(): boolean {
        return mongoose.connection.readyState === 1;
    }
}
