import { NextFunction, Request, Response } from 'express';
import { ItemService } from './ItemService';
import { validationResult } from 'express-validator';

export class ItemController {
    private service: ItemService;

    constructor() {
        this.service = new ItemService();
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const message = errors.array().map((error) => error.msg);
                throw { status: 400, message };
            }

            const item = req.body;

            await this.service.create(item);

            res.status(201).json({ message: 'Item criado com sucesso', item });
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const message = errors.array().map((error) => error.msg);
                throw { status: 400, message };
            }

            const id = req.params.id;
            const item = req.body;

            const updatedItem = await this.service.update(id, item);

            if (!updatedItem) {
                throw { message: 'Falha ao modificar o item' };
            }

            res.status(200).json({ message: 'Item modificado com sucesso' });
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const result = await this.service.delete(id);

            if (!result) {
                throw { message: 'Falha ao excluir o item' };
            }

            res.status(200).json({ message: 'Item excluído' });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const items = await this.service.getAll();

            res.status(200).json(items);
        } catch (e) {
            next(e);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const item = await this.service.getById(id);

            if (!item) {
                throw { status: 404, message: 'Item não encontrado' };
            }

            res.status(200).json(item);
        } catch (e) {
            next(e);
        }
    }

    async getByTitle(req: Request, res: Response, next: NextFunction) {
        try {
            const title = req.params.title;

            const item = await this.service.getByTitle(title);

            if (!item) {
                throw { status: 404, message: 'Item não encontrado' };
            }

            res.status(200).json(item);
        } catch (e) {
            next(e);
        }
    }

    async getByType(req: Request, res: Response, next: NextFunction) {
        try {
            const type = req.params.type;

            const items = await this.service.getByType(type);

            if (!items || items.length < 1) {
                throw { status: 404, message: 'Itens não encontrados' };
            }

            res.status(200).json(items);
        } catch (e) {
            next(e);
        }
    }
}
