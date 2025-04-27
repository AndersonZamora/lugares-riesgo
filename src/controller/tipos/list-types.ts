import { Request, Response, } from 'express';
import { prismaConfig } from '../../db/config';

export const listTypes = async (req: Request, res: Response) => {
    try {

        const list = prismaConfig.tipos.findMany({
            select: {
                id: true,
                tipo: true,
                numero: true
            }
        });

        res.json({
            list,
            message: 'ok'
        });

    } catch (error) {

        const errorMessage = error instanceof Error ? error.message : "Error no controlado"

        res.status(400).json({
            list: [],
            message: errorMessage,
        })
    }
}
