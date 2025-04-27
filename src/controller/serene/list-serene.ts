import { Request, Response, } from 'express';
import { prismaConfig } from '../../db/config';

export const listSerene = async (req: Request, res: Response) => {
    try {

        const list = prismaConfig.serene.findMany({
            select: {
                id: true,
                nombres: true,
                apellidos: true,
                celular: true,
                correo: true
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
