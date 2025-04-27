import { Request, Response, } from 'express';
import { prismaConfig } from '../../db/config';
import { IInformation } from '../../interface/IInformation';

export const createInfo = async (req: Request, res: Response) => {
    try {

        const {
            datos,
            link,
            fecha
        } = req.body as Omit<IInformation, "id">

        await prismaConfig.information.create({
            data: {
                datos,
                link,
                fecha
            },
        });

        res.json({
            message: "Registrado"
        });

    } catch (error) {

        const errorMessage = error instanceof Error ? error.message : 'Error no controlado'

        res.status(400).json({
            message: errorMessage,
            combo: [],
        })
    }
}
