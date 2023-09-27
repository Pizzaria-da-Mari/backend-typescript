import { Model, Schema, model } from 'mongoose';

export type User = {
    id: string;
    name: string;
    cpf: string;
    email: string;
    telephone: string;
    password: string;
    birthdate: Date;
    gender: string;
    userType: string;
};

const userScheme = new Schema<User>(
    {
        name: { type: String, required: true },
        cpf: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        telephone: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        birthdate: { type: Date, required: true },
        gender: { type: String, required: true },
        userType: { type: String, required: true }
    },
    { timestamps: true }
);

export const UserModel: Model<User> = model<User>('User', userScheme);
