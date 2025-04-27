import { Request, Response, } from 'express';
import { IAlert } from '../../interface/IAlert';
import { prismaConfig } from '../../db/config';

export const alertUpdate = async (req: Request, res: Response) => {
    try {

        const { id, estado } = req.body as Pick<IAlert, "id" | "estado">
      
        const exists = await prismaConfig.alerts.findFirst({
            where: {
                idUser: id
            }
        })

        if (!exists) {
            res.status(400).json({
                message: "No existe la alerta",
            });
            return;
        }

        await prismaConfig.alerts.update({
            data: {
                estado: estado
            },
            where: {
                id: exists.id,
            }
        });

        res.json({
            message: "Actualizado"
        });

    } catch (error) {

        const errorMessage = error instanceof Error ? error.message : 'uncontrolledError'

        res.status(400).json({
            message: errorMessage
        })
    }
}
