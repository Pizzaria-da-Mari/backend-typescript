import { Item, ItemModel } from '../models/item';

export default class ItemRepository {
    async create(item: Item): Promise<boolean> {
        return !!(await ItemModel.create(item));
    }

    async update(id: string, item: Item): Promise<boolean> {
        return !!(await ItemModel.findOneAndUpdate({ _id: id }, item, { new: true }));
    }

    async delete(id: string): Promise<boolean> {
        return !!(await ItemModel.findOneAndDelete({ _id: id }));
    }

    async get(): Promise<Item[]> {
        return await ItemModel.find();
    }
}
