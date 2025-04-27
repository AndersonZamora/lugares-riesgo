import { Request, Response, } from 'express';
import { IAlert } from '../../interface/IAlert';
import { prismaConfig } from '../../db/config';

export const deleteSerene = async (req: Request, res: Response) => {
    try {

        const { id } = req.params as Pick<IAlert, "id">
      
        const exists = await prismaConfig.serene.findUnique({
            where: {
                id: id
            }
        })

        if (!exists) {
            res.status(400).json({
                message: "No existe",
            });
        }

        await prismaConfig.serene.delete({
            where: {
                id: id,
            }
        });

        res.json({
            message: "Eliminado"
        });

    } catch (error) {

        const errorMessage = error instanceof Error ? error.message : 'Error no controlado'

        res.status(400).json({
            message: errorMessage
        })
    }
}
