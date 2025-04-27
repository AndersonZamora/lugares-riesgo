import { Request, Response, } from 'express';
import { prismaConfig } from '../../db/config';
import { ICitezen } from '../../interface/ICitizen';

export const updateCitezen = async (req: Request, res: Response) => {
    try {

        const { id, onlin } = req.body as Pick<ICitezen, "id" | "onlin">
      
        const exists = await prismaConfig.citizen.findUnique({
            where: {
                id: id
            }
        })

        if (!exists) {
            res.status(400).json({
                message: "No existe la alerta",
            });
        }

        await prismaConfig.citizen.update({
            data: {
               onlin : onlin
            },
            where: {
                id: id,
            }
        });

        res.json({
            message: "Actualizado"
        });

    } catch (error) {

        const errorMessage = error instanceof Error ? error.message : 'uncontrolledError'

        res.status(400).json({
            message: errorMessage,
            combo: [],
        })
    }
}
