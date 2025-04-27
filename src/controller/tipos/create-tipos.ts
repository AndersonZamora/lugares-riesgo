import { Request, Response, } from 'express';
import { prismaConfig } from '../../db/config';
import { ITipos } from '../../interface/ITipos';

export const createTipo = async (req: Request, res: Response) => {
    try {

        const {
            tipo,
            numero

        } = req.body as Omit<ITipos, "id">

        const exists = await prismaConfig.tipos.findFirst({
            where: {
                OR: [{
                    numero: numero.trim(),
                    tipo: tipo.toLocaleUpperCase().trim()
                }]
            }
        })

        if (!exists) {
            res.status(400).json({
                message: `${tipo} o ${numero} ya registrado`,
            });
        }

        await prismaConfig.tipos.create({
            data: {
                tipo: tipo.toLocaleUpperCase().trim(),
                numero: numero.trim()
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
