import { body } from 'express-validator';

export class UserValidations {
    //criar func validação de cpf

    createRules() {
        return [
            body('name')
                .trim()
                .notEmpty()
                .isLength({ min: 3 }),

            body('cpf')
                .trim()
                .notEmpty()
                .isNumeric()
                .isLength({ min: 11 }),

            body('email')
                .trim()
                .notEmpty()
                .isEmail(),

            body('telephone')
                .trim()
                .notEmpty(),

            body('password')
                .trim()
                .notEmpty()
                .isLength({ min: 4 }),

            body('birthdate')
                .trim()
                .notEmpty(),

            body('gender')
                .trim()
                .notEmpty(),

            body('userType')
                .trim()
                .notEmpty(),
        ];
    }

    updateRules() {
        return [
            body('name')
                .trim()
                .notEmpty()
                .isLength({ min: 3 })
                .optional(),

            body('email')
                .trim()
                .notEmpty()
                .isEmail()
                .optional(),

            body('telephone')
                .trim()
                .notEmpty()
                .optional(),

            body('password')
                .trim()
                .notEmpty()
                .isLength({ min: 4 })
                .optional(),

            body('birthdate')
                .trim()
                .notEmpty()
                .optional(),

            body('gender')
                .trim()
                .notEmpty()
                .optional(),

            body('userType')
                .trim()
                .notEmpty()
                .optional(),
        ];
    }
}
