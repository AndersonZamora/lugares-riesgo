import { Request, Response, } from 'express';
import bcryptj from 'bcryptjs';
import { prismaConfig } from '../../db/config';
import { generarJWT } from '../../helpers/jwt';

export const loginHero = async (req: Request, res: Response) => {
    try {

        const {
            email,
            password
        } = req.body as { email: string, password: string }


        const exists = await prismaConfig.central.findUnique({
            where: {
                correo: email.toLocaleLowerCase().trim()
            }
        })
 
        if (!exists) {
            res.status(400).json({
                message: 'Correo o Contraseña invalido',
            });
            return;
        }

        const { contrasenia, id, nombres, apellidos, rol } = exists;

        const valid = bcryptj.compareSync(password, contrasenia);

        if (!valid) {
            res.status(400).json({
                message: 'Correo o Contraseña invalido',
            });
            return;
        }

        const token = await generarJWT(id, `${nombres} ${apellidos}`, rol);

        res.json({
            ok: true,
            uid: id,
            name: `${nombres} ${apellidos}`,
            token,
            rol
        });

    } catch (error) {

        const errorMessage = error instanceof Error ? error.message : 'Error no controlado'

        res.status(400).json({
            message: errorMessage
        })
    }
}
