import { UpdateUser } from './UserDTO';
import { User } from './UserModel';
import { UserRepository } from './UserRepository';

export class UserService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    async create(user: User): Promise<boolean> {
        const userExists = await this.repository.getBy(user.email, user.cpf, user.telephone);

        if (userExists.length !== 0) {
            throw { statusCode: 409, message: 'Usuário já cadastrado' };
        }

        const newUser = await this.repository.create(user);

        if (!newUser) {
            throw { message: 'Falha ao criar usuário' };
        }

        return newUser;
    }
/*
    async update(id: string, user: UpdateUser): Promise<boolean> {
        const userExists = await this.getById(id);

        if (!userExists) {
            throw { status: 404, message: 'Usuário não encontrado' };
        }

        const checkExists = async (property: keyof UpdateUser, errorMessage: string) => {
            if (!!user[property]) {
                const users = await this.repository.
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
        const userExists = await this.repository.getOne('id', id);

        if (!userExists) {
            throw { statusCode: 404, message: 'Usuário não encontrado' };
        }

        const deletedUser = await this.repository.delete(id);

        if (!deletedUser) {
            throw { message: 'Falha ao excluir usuário' };
        }

        return deletedUser;
    }

    async getById(id: string): Promise<User> {
        const user = await this.repository.getOne('id', id);

        if (!user) {
            throw { statusCode: 404, message: 'Usuário não encontrado' };
        }

        return user;
    }
}
