import { Request, Response, } from 'express';
import bcryptj from 'bcryptjs';
import { prismaConfig } from '../db/config';


export const seed = async (req: Request, res: Response) => {
    try {

        const email = "admin01@gmail.com"
        const password = "admin123"

        await prismaConfig.central.deleteMany();

        await prismaConfig.central.create({
            data: {
                nombres: "Richard",
                apellidos: "Admin",
                celular: "950353622",
                correo: email,
                contrasenia: bcryptj.hashSync(password.trim()),
                rol: 'admin',
                onlin: false
            },
        });

        res.json({
            ok: true
        });

    } catch (error) {

        const errorMessage = error instanceof Error ? error.message : 'Error no controlado'

        res.status(400).json({
            message: errorMessage
        })
    }
}
