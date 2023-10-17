import 'dotenv/config';

class Config {
    private SERVER_PORT = Number(process.env.SERVER_PORT) || 6666;
    private MONGO_URI = process.env.MONGO_URI || '';
    private JWT_SECRET = process.env.JWT_SECRET || '';

    get port(): number {
        return this.SERVER_PORT;
    }

    get mongo(): string {
        return this.MONGO_URI;
    }

    get jwt(): string {
        return this.JWT_SECRET;
    }
}

export default new Config();
