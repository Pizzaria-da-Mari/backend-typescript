import { Item } from '../models/item';
import ItemRepository from '../repositories/item';

export class ItemService {
    private repository: ItemRepository;
    private memoryCache: Item[] | null = null;

    constructor() {
        this.repository = new ItemRepository();
    }

    private async cache(): Promise<Item[] | null> {
        if (this.memoryCache == null) {
            const items = await this.repository.get();

            if (!items) {
                throw { message: 'Falha no cache' };
            }

            this.memoryCache = items;
        }
        return this.memoryCache;
    }

    async create(item: Item): Promise<boolean> {
        const items = await this.cache();
        const itemExists = items?.find((data) => data.title === item.title);

        if (itemExists) {
            throw { status: 409, message: 'Item já existe' };
        }

        this.memoryCache = null;

        return await this.repository.create(item);
    }

    //consertar esse any
    async update(id: string, item: any): Promise<boolean> {
        const itemExists = await this.getById(id);

        if (!itemExists) {
            throw { status: 404, message: 'Item não encontrado' };
        }

        const checkExists = async (property: keyof Item, errorMessage: string) => {
            if (!!item[property]) {
                const items = await this.cache();
                const exists = items?.find((data) => data[property] === item[property] && data.id !== id);

                if (exists) {
                    throw { status: 409, message: errorMessage };
                }
            }
        };

        await checkExists('title', 'Título já existe');

        this.memoryCache = null;

        return await this.repository.update(id, item);
    }

    async delete(id: string): Promise<boolean> {
        const itemExists = await this.getById(id);

        if (!itemExists) {
            throw { status: 404, message: 'Item não encontrado' };
        }

        this.memoryCache = null;

        return await this.repository.delete(id);
    }

    async getAll(): Promise<Item[]> {
        const items = await this.cache();

        if (!items) {
            throw { message: 'Falha ao carregar itens' };
        }

        return items;
    }

    async getById(id: string): Promise<Item> {
        const items = await this.cache();
        const itemById = items?.find((data) => data.id === id);

        if (!itemById) {
            throw { status: 404, message: 'Item não encontrado' };
        }

        return itemById;
    }

    async getByTitle(title: string): Promise<Item> {
        const items = await this.cache();
        const itemByTitle = items?.find((data) => data.title === title);

        if (!itemByTitle) {
            throw { status: 404, message: 'Item não encontrado' };
        }

        return itemByTitle;
    }

    async getByType(type: string): Promise<Item[]> {
        const items = await this.cache();

        if (!items) {
            throw { message: 'Itens não encontrados' };
        }

        const itemsByType = items?.filter((data) => data.type === type);

        if (itemsByType.length < 1) {
            throw { status: 404, message: 'Categoria não encontrada ou sem itens' };
        }

        return itemsByType;
    }
}
