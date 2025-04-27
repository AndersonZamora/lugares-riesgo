import { Request, Response, } from 'express';
import { prismaConfig } from '../../db/config';

export const listAlertSerene = async (req: Request, res: Response) => {
    try {

        const list = await prismaConfig.alerts.findMany({
            select: {
                id: true,
                fecha: true,
                latitud: true,
                longitud: true,
                estado: true,
                citizen: {
                    select: {
                        id: true,
                        dni: true,
                        nombres: true,
                        apellidos: true,
                        celular: true
                    }
                }
            },
            where: {
                estado: 'Enviado'
            },
            orderBy: {
                fecha: 'asc'
            }
        });

        res.json({
            list: list.map(({citizen, ...res}) => ({
                ...res,
                ...citizen
            })),
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
