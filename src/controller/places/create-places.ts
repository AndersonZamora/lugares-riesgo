import { Request, Response, } from 'express';
import { prismaConfig } from '../../db/config';
import { IPlace } from '../../interface/IPlace';

export const createPlaces = async (req: Request, res: Response) => {
    try {

        const {
            detalle,
            direccion,
            barrio,
            nivel,
            longitud,
            latitud
        } = req.body as Omit<IPlace, "id">

        const exists = await prismaConfig.places.findFirst({
            where: {
                direccion: direccion.toLocaleUpperCase().trim()
            }
        })

        if (exists) {
            res.status(400).json({
                message: `${direccion} ya registrado`,
            });
        }

        await prismaConfig.places.create({
            data: {
                detalle: detalle,
                direccion: direccion.toLocaleUpperCase().trim(),
                barrio: barrio.toLocaleUpperCase().trim(),
                nivel,
                longitud,
                latitud
            },
        });

        res.json({
            message: "Registrado"
        });

    } catch (error) {

        const errorMessage = error instanceof Error ? error.message : 'Error no controlado'

        res.status(400).json({
            message: errorMessage,
        })
    }
}
