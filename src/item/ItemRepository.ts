import { UpdateItem } from './ItemDTO';
import { Item, ItemModel } from './ItemModel';

export class ItemRepository {
    async create(item: Item): Promise<boolean> {
        return !!ItemModel.create(item);
    }

    async update(id: string, item: UpdateItem): Promise<boolean> {
        return !!ItemModel.updateOne({ id: id }, item, { new: true });
    }

    async delete(id: string): Promise<boolean> {
        return !!ItemModel.deleteOne({ id: id });
    }

    async get(): Promise<Item[]> {
        return ItemModel.find();
    }
}
