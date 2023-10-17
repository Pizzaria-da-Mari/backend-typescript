import { body } from 'express-validator';

export class AuthValidation {
    LoginRules() {
        return [
            body('email')
                .trim()
                .notEmpty()
                .isEmail()
                .optional(), 
            
            body('password')
                .trim()
                .notEmpty()
                .isLength({ min: 4 })
                .optional()
        ];
    }
}
