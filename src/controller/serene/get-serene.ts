import { Request, Response, } from 'express';
import { prismaConfig } from '../../db/config';
import { IAlert } from '../../interface/IAlert';

export const getSerene = async (req: Request, res: Response) => {
    try {

        const { id } = req.query as Pick<IAlert, "id">

        const serene = prismaConfig.serene.findUnique({
            select: {
                id: true,
                nombres: true,
                apellidos: true,
                celular: true,
                correo: true
            },
            where: {
                id: id
            }
        });

        res.json({
            serene,
            message: 'ok'
        });

    } catch (error) {

        const errorMessage = error instanceof Error ? error.message : "Error no controlado"

        res.status(400).json({
            serene: null,
            message: errorMessage,
        })
    }
}
