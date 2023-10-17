import { User } from '../user/UserModel';
import { UserRepository } from '../user/UserRepository';
import { comparePassword } from '../util/middleware/password';
import { authToken, generateToken } from '../util/middleware/token';
import { Login } from './AuthDTO';

export class AuthService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    async login(login: Login): Promise<string> {
        const user = await this.repository.getOne('email', login.email);

        if (!user) {
            throw { statusCode: 404, message: 'Usuário não encontrado' };
        }

        const passwordCompare = await comparePassword(login.password, user.password);

        if (!passwordCompare) {
            throw { statusCode: 400, message: 'Senha inválida' };
        }

        return generateToken(user.id);
    }

    async getUserByToken(token: string): Promise<User> {
        const decoded = authToken(token);

        const user = this.repository.getOne('id', decoded.id);

        if (!!user) {
            throw { statusCode: 403 };
        }

        return user;
    }
}
