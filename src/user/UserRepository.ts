import { hashPassword } from '../util/middleware/password';
import { UpdateUser } from './UserDTO';
import { User, UserModel } from './UserModel';

export class UserRepository {
    async create(user: User): Promise<boolean> {
        return !!UserModel.create({
            ...user,
            password: await hashPassword(user.password)
        });
    }

    async update(id: string, user: UpdateUser): Promise<boolean> {
        return !!UserModel.updateOne({ id: id }, user, { new: true });
    }

    async delete(id: string): Promise<boolean> {
        return !!UserModel.deleteOne({ id: id });
    }

    async getAll(): Promise<User[]> {
        return await UserModel.find();
    }

    async getBy(email: string, cpf: string, telephone: string): Promise<User[]> {
        return await UserModel.find({ $or: [{ email: email }, { cpf: cpf }, { telephone: telephone }] });
    }

    async getOne(field: string, value: string): Promise<User | null> {
        return await UserModel.findOne({ [field]: value });
    }

}
