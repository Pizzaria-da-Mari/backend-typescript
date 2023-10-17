import { UpdateItem } from './ItemDTO';
import { Item } from './ItemModel';
import { ItemRepository } from './ItemRepository';

export class ItemService {
    private repository: ItemRepository;
    private memoryCache: Item[] | null = null;

    constructor() {
        this.repository = new ItemRepository();
    }

    private async cache(): Promise<Item[]> {
        if (!this.memoryCache) {
            this.memoryCache = await this.repository.get();
            return this.memoryCache;
        }

        return this.memoryCache;
    }

    async create(item: Item): Promise<boolean> {
        const items = await this.cache();
        const itemExists = items.find((element) => element.title === item.title);

        if (itemExists) {
            throw { statusCode: 409, message: 'Item já existe' };
        }

        const newItem = await this.repository.create(item);

        if (!newItem) {
            throw { message: 'Falha ao criar o item' };
        }

        this.memoryCache = null;
        return newItem;
    }

    async update(id: string, item: UpdateItem): Promise<boolean> {
        const items = await this.cache();
        const itemExists = items.find((element) => element.id === id);

        if (!itemExists) {
            throw { statusCode: 404, message: 'Item não encontrado' };
        }

        if (item.title && itemExists.title !== item.title) {
            throw { statusCode: 409, message: 'Título já exite' };
        }

        const updatedItem = await this.repository.update(id, item);
        if (!updatedItem) {
            throw { message: 'Falha ao atualizar o item' };
        }

        this.memoryCache = null;
        return updatedItem;
    }

    async delete(id: string): Promise<boolean> {
        const items = await this.cache();
        const itemExists = items.find((element) => element.id === id);

        if (!itemExists) {
            throw { statusCode: 404, message: 'Item não encontrado' };
        }

        const deletedItem = this.repository.delete(id);

        if (!deletedItem) {
            throw { message: 'Falha ao deletar o item' };
        }

        this.memoryCache = null;
        return deletedItem;
    }

    async getAll(): Promise<Item[]> {
        const items = await this.cache();

        if (!items) {
            throw { message: 'Falha ao encontrar os itens' };
        }

        return items;
    }

    async getById(id: string): Promise<Item> {
        const items = await this.cache();
        const item = items.find((element) => element.id === id);

        if (!item) {
            throw { statusCode: 404, message: 'Item não encontrado' };
        }

        return item;
    }

    async getByTitle(title: string): Promise<Item> {
        const items = await this.cache();
        const item = items.find((element) => element.title === title);

        if (!item) {
            throw { statusCode: 404, message: 'Item não encontrado' };
        }

        return item;
    }

    async getByType(type: string): Promise<Item[]> {
        const items = await this.cache();
        const itemsByType = items.filter((element) => element.type === type);

        if (itemsByType.length < 1) {
            throw { statusCode: 404, message: 'Categogia não encontrada ou sem itens' };
        }

        return itemsByType;
    }
}
