import { body } from "express-validator";

export class ItemValidations {
    createRules() {
        return [
            body('title')
                .trim()
                .notEmpty()
                .isLength({ min: 3 }),

            body('description')
                .trim()
                .notEmpty()
                .isLength({ min: 3 }),

            body('price')
                .notEmpty(),

            body('type')
                .trim()
                .notEmpty(),
        ];
    }

    updateRules() {
        return [
            body('title')
                .trim()
                .notEmpty()
                .isLength({ min: 3 })
                .optional(),

            body('description')
                .trim()
                .notEmpty()
                .isLength({ min: 3 })
                .optional(),

            body('price')
                .notEmpty()
                .optional(),

            body('type')
                .trim()
                .notEmpty()
                .optional(),
        ];
    }
}