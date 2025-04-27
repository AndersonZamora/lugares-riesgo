import { Request, Response, } from 'express';
import bcryptj from 'bcryptjs';
import { prismaConfig } from '../../db/config';
import { ISerene } from '../../interface/ISerene';

export const createSerene = async (req: Request, res: Response) => {
    try {

        const {
            contrasenia,
            correo,
            nombres,
            apellidos,
            celular,
            rol

        } = req.body as Omit<ISerene, "id">

        const exists = await prismaConfig.serene.findFirst({
            where: {
                correo: correo
            }
        })

        if (!exists) {
            res.status(400).json({
                message: `${correo} ya registrado`,
            });
        }

        await prismaConfig.serene.create({
            data: {
                nombres:nombres.toLocaleLowerCase().trim(),
                apellidos:apellidos.toLocaleLowerCase().trim(),
                celular:celular.trim(),
                correo: correo.toLocaleLowerCase().trim(),
                contrasenia: bcryptj.hashSync(contrasenia.trim()),
                rol: 'seren',
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
