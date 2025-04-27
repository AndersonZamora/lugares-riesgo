import { Request, Response, } from 'express';
import { IAlert } from '../../interface/IAlert';
import { prismaConfig } from '../../db/config';

export const alertRegister = async (req: Request, res: Response) => {
    try {

        const { fecha, longitud, latitud } = req.body as Omit<IAlert, "id">

        const { uid } = req;

        if (!uid) {
            res.status(400).json({
                message: "No existe el ciudadano",
            });
            return;
        }

        const exists = await prismaConfig.citizen.findUnique({
            where: {
                id: uid
            }
        })

        if (!exists) {
            res.status(400).json({
                message: "No existe el ciudadano",
            });
            return;
        }

        await prismaConfig.alerts.create({
            data: {
                idUser: exists.id,
                fecha,
                estado: 'Enviado',
                longitud: String(longitud),
                latitud: String(latitud),
            },
        });

        res.json({
            message: "Registrado"
        });

    } catch (error) {

        const errorMessage = error instanceof Error ? error.message : 'uncontrolledError'

        res.status(400).json({
            message: errorMessage,
            combo: [],
        })
    }
}
