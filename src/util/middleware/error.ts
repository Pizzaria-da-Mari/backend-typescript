import { NextFunction, Request, Response } from 'express';

export interface IError {
    status?: number;
    message?: string;
}

const errorCode: any = {
    401: 'unauthorized',
    403: 'forbidden',
    404: 'not found',
    409: 'conflict'
};

export default function errorResponse(err: IError, req: Request, res: Response, next: NextFunction) {
    const statusCode = err.status ?? 500;
    const message = err.message ?? errorCode[statusCode];

    res.status(statusCode).json({ message: message });
}
