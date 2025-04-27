import { Request, Response, } from 'express';
import bcryptj from 'bcryptjs';
import { prismaConfig } from '../../db/config';
import { ICitezen } from '../../interface/ICitizen';

export const registrarHero = async (req: Request, res: Response) => {
    try {

        const {
            contrasenia,
            correo,
            nombres,
            apellidos,
            celular,
            dni,

        } = req.body as Omit<ICitezen, "id">

        const exists = await prismaConfig.central.findFirst({
            where: {
                OR: [
                    { correo: correo.toLocaleUpperCase().trim() },
                    { celular: celular.trim() }
                ]
            }
        })

        if (!exists) {
            res.status(400).json({
                message: `${correo} o ${celular} ya registrado`,
            });
        }

        await prismaConfig.central.create({
            data: {
                nombres: nombres.toLocaleLowerCase().trim(),
                apellidos: apellidos.toLocaleLowerCase().trim(),
                celular: celular.trim(),
                correo: correo.toLocaleLowerCase().trim(),
                contrasenia: bcryptj.hashSync(contrasenia.trim()),
                rol: 'admin',
                onlin: false
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
