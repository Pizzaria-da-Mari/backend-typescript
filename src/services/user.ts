import { UpdateUser } from '../DTOs/user';
import { User } from '../models/user';
import UserRepository from '../repositories/user';
import { comparePassword } from '../util/middlewares/password';

export class UserService {
    private repository: UserRepository;
    private memoryCache: User[] | null = null;

    constructor() {
        this.repository = new UserRepository();
    }

    private async cache(): Promise<User[] | null> {
        if (this.memoryCache == null) {
            const users = await this.repository.getAll();

            if (!users) {
                throw { message: 'Falha no cache' };
            }

            this.memoryCache = users;
        }
        return this.memoryCache;
    }

    async create(user: User): Promise<boolean> {
        const userExists = await this.repository.getBy(user.email, user.cpf, user.telephone);

        if (userExists.length !== 0) {
            throw { status: 409, message: 'Usuário já existe' };
        }

        this.memoryCache = null;

        return await this.repository.create(user);
    }
/*
    async update(id: string, password: string, user: User): Promise<boolean> {
        const userExists = await this.getById(id);

        if (!userExists) {
            throw { status: 404, message: 'Usuário não encontrado' };
        }

        const checkExists = async (property: keyof UpdateUser, errorMessage: string) => {
            if (!!user[property]) {
                const users = await this.cache();
                const exists = users?.find((data) => data[property] === user[property] && data.id !== id);

                if (exists) {
                    throw { status: 409, message: errorMessage };
                }
            }
        };

        await checkExists('email', 'Email já existe');
        await checkExists('telephone', 'Telefone já existe');

        const checkedPassword = await comparePassword(password, userExists.password)
        if (!checkedPassword) {
            throw { status: 403, message: 'Senha incorreta' };
        }
        
        this.memoryCache = null;

        return await this.repository.update(id, user);
    }
*/
    async delete(id: string): Promise<boolean> {
        const userExists = await this.getById(id);

        if (!userExists) {
            throw { status: 404, message: 'Usuário não encontrado' };
        }

        this.memoryCache = null;

        return await this.repository.delete(id);
    }

    async getById(id: string): Promise<User> {
        const users = await this.cache();
        const userById = users?.find((data) => data.id === id);

        if (!userById) {
            throw { status: 404, message: 'Usuário não encontrado' };
        }

        return userById;
    }
}
