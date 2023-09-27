import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user';

export class UserController {
    private service: UserService;

    constructor() {
        this.service = new UserService();
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            //falta a validação de payload
            const user = req.body;

            await this.service.create(user);

            res.status(201).json({ message: 'Usuário criado com sucesso', user });
        } catch (e) {
            next(e);
        }
    }
    /* 
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const password = req.body.password;
            const user = req.body.user;

            const updatedUser = await this.service.update(id, password, user);

            if (!updatedUser) {
                throw { message: 'Falha ao modificar o usuário' };
            }

            res.status(200).json({ message: 'Usuário modificado com sucesso' });
        } catch (e) {
            next(e);
        }
    }
*/
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
