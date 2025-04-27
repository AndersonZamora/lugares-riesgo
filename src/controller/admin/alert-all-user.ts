import { Request, Response, } from 'express';
import { prismaConfig } from '../../db/config';
import { IAlert } from '../../interface/IAlert';

export const alertAllUser = async (req: Request, res: Response) => {
    try {

        const { id } = req.query as Pick<IAlert, "id">

        const list = await prismaConfig.alerts.findMany({
            select: {
                id: true,
                fecha: true,
                latitud: true,
                longitud: true,
                estado: true
            },
            where: {
                idUser: id
            },
            orderBy: {
                fecha: 'desc'
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
