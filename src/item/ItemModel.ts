import { Model, Schema, model } from 'mongoose';

export type Item = {
    id: string;
    title: string;
    description: string;
    price: number;
    type: string;
};

const itemSchema = new Schema<Item>(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export const ItemModel: Model<Item> = model<Item>('Item', itemSchema);
