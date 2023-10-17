import { NextFunction, Request, Response } from 'express';
import { UserService } from './UserService';
import { validationResult } from 'express-validator';

export class UserController {
    private service: UserService;

    constructor() {
        this.service = new UserService();
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const message = errors.array().map((error) => error.msg);
                throw { status: 400, message };
            }

            const user = req.body;

            await this.service.create(user);

            res.status(201).json({ message: 'Usuário criado com sucesso', user });
        } catch (e) {
            next(e);
        }
    }

    //async update(req: Request, res: Response, next: NextFunction) {}

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const result = await this.service.delete(id);

            if (!result) {
                throw { message: 'Falha ao excluir o usuário' };
            }

            res.status(200).json({ message: 'Usuário excluído' });
        } catch (e) {
            next(e);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const user = await this.service.getById(id);

            if (!user) {
                throw { status: 404, message: 'Usuário não encontrado' };
            }

            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    }
}
