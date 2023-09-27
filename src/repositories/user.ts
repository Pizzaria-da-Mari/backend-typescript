import { User, UserModel } from '../models/user';
import { hashPassword } from '../util/middlewares/password';

export default class UserRepository {
    async create(user: User): Promise<boolean> {
        const hashedPassword = await hashPassword(user.password);

        const newUser = await UserModel.create({
            ...user,
            password: hashedPassword
        });

        return !!newUser;
    }

    async update(id: string, user: User): Promise<boolean> {
        return !!(await UserModel.findOneAndUpdate({ _id: id }, user, { new: true }));
    }

    async delete(id: string): Promise<boolean> {
        return !!(await UserModel.findOneAndDelete({ _id: id }));
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
