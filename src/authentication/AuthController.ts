import { NextFunction, Request, Response, request } from 'express';
import { AuthService } from './AuthService';
import { validationResult } from 'express-validator';

export class AuthController {
    private service: AuthService;

    constructor() {
        this.service = new AuthService();
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const message = errors.array().map((error) => error.msg);
                throw { status: 400, message };
            }

            const login = req.body;

            const token = await this.service.login(login);

            if (!token) {
                throw { statusCode: 403, message: 'Falha no login' };
            }

            req.headers.authorization = token;

            next();
        } catch (error) {
            next(error);
        }
    }

    private convertUserType = (userType: string): number => {
        const userTypes: Record<string, number> = {
            user: 1,
            admin: 2
        };

        return userTypes[userType] || 0;
    };

    async checkUser(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization
            

            const userType = this.convertUserType(req.user.userType);

            if (userType < 1) {
                throw { statusCode: 403 };
            }

            next();
        } catch (error) {
            next(error);
        }
    }

    async checkSuperUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userType = this.convertUserType(req.user.userType);

            if (userType < 2) {
                throw { statusCode: 403 };
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}
